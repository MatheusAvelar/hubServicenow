/**
 * AgentRules — regras puras (sem Glide) do Agent. Testadas localmente em tests/agent-rules.test.js.
 */
var AgentRules = Class.create();

AgentRules.AGENT_VERSION = '1.1.5';

/** Backoff do outbox: 15 min, 30, 60, 120… até 12 h. */
AgentRules.BACKOFF_BASE_MIN = 15;
AgentRules.BACKOFF_MAX_MIN = 720;

/** Depois de tantas tentativas transitórias, a mensagem continua na fila (nunca é descartada). */
AgentRules.prototype = {
    initialize: function () {},

    /**
     * Classifica a resposta do Hub.
     * - ok: 2xx com corpo JSON
     * - transient: Hub hibernando/fora (HTML, sem resposta, 5xx, 429, timeout) → mantém no outbox
     * - permanent: 4xx com JSON de erro → não adianta reenviar (exceto 401, tratado como transitório com aviso)
     * @returns {{kind:'ok'|'transient'|'permanent', json:object|null, message:string}}
     */
    classify: function (status, contentType, bodyText) {
        var code = parseInt(status, 10) || 0;
        // O content-type não é confiável na página de hibernação: decide pelo corpo.
        var json = null;
        var text = String(bodyText || '');
        if (text) {
            try {
                json = JSON.parse(text);
            } catch (e) {
                json = null;
            }
        }
        // Hub antigo (setBody de objeto) responde {"result": {...}}: desembrulha.
        if (json && typeof json === 'object' && json.result && typeof json.result === 'object' && Object.keys(json).length === 1) {
            json = json.result;
        }
        var looksHtml = /^\s*</.test(text);
        if (code === 0) return { kind: 'transient', json: null, message: 'Hub sem resposta (hibernando ou fora do ar).' };
        if (json === null || typeof json !== 'object' || looksHtml) {
            return { kind: 'transient', json: null, message: 'Hub respondeu sem JSON (HTTP ' + code + '): provavelmente hibernando.' };
        }
        if (code >= 200 && code < 300) return { kind: 'ok', json: json, message: '' };
        var apiMessage = json && json.error && json.error.message ? json.error.message : '';
        if (code === 401) {
            return { kind: 'transient', json: json, message: 'Token recusado pelo Hub (401). Confira o participant_token. ' + apiMessage };
        }
        if (code === 429 || code >= 500) {
            return { kind: 'transient', json: json, message: 'Hub indisponível (HTTP ' + code + '). ' + apiMessage };
        }
        return { kind: 'permanent', json: json, message: 'Hub recusou (HTTP ' + code + '): ' + (apiMessage || 'erro') };
    },

    /** Minutos até o próximo envio, dado o número de tentativas já feitas (1, 2, 3…). */
    backoffMinutes: function (attempts) {
        var n = Math.max(1, parseInt(attempts, 10) || 1);
        var minutes = AgentRules.BACKOFF_BASE_MIN * Math.pow(2, n - 1);
        return Math.min(minutes, AgentRules.BACKOFF_MAX_MIN);
    },

    /**
     * Procura um texto num script e devolve a linha (1-based) da primeira ocorrência, ou 0.
     * Ignora diferenças de espaço dentro do texto procurado ("current.update ()" também conta).
     */
    findLine: function (script, text) {
        var needle = String(text || '').replace(/\s+/g, '');
        if (!needle) return 0;
        // Compara sem espaços: "current.update ( )" também conta, inclusive quebrado em linhas.
        var lines = String(script || '').split(/\r?\n/);
        var joined = '';
        var ends = [];
        for (var i = 0; i < lines.length; i++) {
            joined += lines[i].replace(/\s+/g, '');
            ends.push(joined.length);
        }
        var at = joined.indexOf(needle);
        if (at === -1) return 0;
        for (var j = 0; j < ends.length; j++) {
            if (at < ends[j]) return j + 1;
        }
        return lines.length;
    },

    /** Estado local da atividade a partir do estado no Hub e da matrícula. */
    localState: function (hubState, enrollmentState, current) {
        if (hubState === 'archived') return 'archived';
        if (current && current !== 'new' && current !== 'archived') {
            // Nunca volta um estado local que já avançou (a validação é local).
            if (enrollmentState === 'completed') return 'completed';
            return current;
        }
        if (enrollmentState === 'completed') return 'completed';
        if (enrollmentState === 'in_progress') return 'in_progress';
        if (enrollmentState === 'approved') return 'approved';
        return 'new';
    },

    /** Texto de status do header: "Hub sincronizado há 12 min · 2 envios na fila". */
    syncLabel: function (minutesSinceSync, pending) {
        var when;
        if (minutesSinceSync === null || minutesSinceSync === undefined || !isFinite(minutesSinceSync)) when = 'Hub ainda não sincronizado';
        else if (minutesSinceSync < 1) when = 'Hub sincronizado agora';
        else if (minutesSinceSync < 60) when = 'Hub sincronizado há ' + Math.floor(minutesSinceSync) + ' min';
        else if (minutesSinceSync < 1440) when = 'Hub sincronizado há ' + Math.floor(minutesSinceSync / 60) + ' h';
        else when = 'Hub sincronizado há ' + Math.floor(minutesSinceSync / 1440) + ' dia(s)';
        var n = parseInt(pending, 10) || 0;
        var queue = n === 0 ? 'nenhum envio na fila' : n === 1 ? '1 envio na fila' : n + ' envios na fila';
        return when + ' · ' + queue;
    },

    type: 'AgentRules',
};
