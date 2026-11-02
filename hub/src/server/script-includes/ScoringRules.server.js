/**
 * ScoringRules — regras puras (sem Glide) de pontuação e ranking.
 *
 * O Hub NUNCA confia em pontos enviados pelo Agent: só no passed de cada check.
 * Os pontos são recalculados aqui a partir da definição dos checks guardada no Hub.
 */
var ScoringRules = Class.create();

ScoringRules.prototype = {
    initialize: function () {},

    /**
     * Pontua uma tentativa.
     * @param {Array<{code:string, points:number, required:boolean}>} checks definição no Hub
     * @param {Array<{check_id:string, passed:boolean}>} submitted resultado enviado pelo Agent
     * @param {number} hintCost total já descontado por dicas na matrícula
     * @returns {{score:number, max:number, completed:boolean, checks:Array, unknown:string[]}}
     */
    scoreAttempt: function (checks, submitted, hintCost) {
        var byId = {};
        var unknown = [];
        var list = Array.isArray(submitted) ? submitted : [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (!item || typeof item.check_id !== 'string') continue;
            byId[item.check_id] = item.passed === true;
        }
        var known = {};
        var out = [];
        var score = 0;
        var max = 0;
        var requiredOk = true;
        for (var j = 0; j < checks.length; j++) {
            var def = checks[j];
            known[def.code] = true;
            var points = Math.max(0, parseInt(def.points, 10) || 0);
            var passed = byId[def.code] === true;
            max += points;
            if (passed) score += points;
            if (def.required !== false && !passed) requiredOk = false;
            out.push({ check_id: def.code, passed: passed, points: passed ? points : 0, max: points, sent: def.code in byId });
        }
        for (var id in byId) {
            if (!known[id]) unknown.push(id);
        }
        var cost = Math.max(0, parseInt(hintCost, 10) || 0);
        return {
            score: Math.max(0, score - cost),
            max: max,
            completed: checks.length > 0 && requiredOk,
            checks: out,
            unknown: unknown,
        };
    },

    /**
     * Valida o número da tentativa enviado pelo Agent.
     * @returns {string|null} mensagem de erro, ou null se estiver ok
     */
    checkAttempt: function (attempt, maxAttempts) {
        if (typeof attempt !== 'number' || Math.floor(attempt) !== attempt || attempt < 1) {
            return 'O número da tentativa deve ser um inteiro maior ou igual a 1.';
        }
        var max = parseInt(maxAttempts, 10) || 0;
        if (max > 0 && attempt > max) {
            return 'Limite de ' + max + ' tentativas atingido.';
        }
        return null;
    },

    /**
     * Monta o ranking. Desempate: mais concluídas, depois quem pontuou primeiro (last_scored_at mais antigo).
     * @param {Array<{participant:string, name:string, points:number, completed:number, last_scored_at?:string, last_seen?:string}>} rows
     * @returns {Array} as mesmas linhas, ordenadas, com `position` (empates na mesma posição)
     */
    rank: function (rows) {
        var sorted = rows.slice().sort(function (a, b) {
            if (b.points !== a.points) return b.points - a.points;
            if (b.completed !== a.completed) return b.completed - a.completed;
            var ta = a.last_scored_at || '9999';
            var tb = b.last_scored_at || '9999';
            if (ta !== tb) return ta < tb ? -1 : 1;
            return (a.name || '').localeCompare(b.name || '');
        });
        var position = 0;
        var prev = null;
        for (var i = 0; i < sorted.length; i++) {
            var r = sorted[i];
            if (!prev || prev.points !== r.points || prev.completed !== r.completed) position = i + 1;
            r.position = position;
            prev = r;
        }
        return sorted;
    },

    /** Iniciais para o avatar ("Ana Souza" → "AS"). */
    initials: function (name) {
        var parts = String(name || '').trim().split(/\s+/).filter(function (p) { return p; });
        if (parts.length === 0) return '?';
        var first = parts[0].charAt(0);
        var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
        return (first + last).toUpperCase();
    },

    /**
     * Texto relativo em português ("há 12 min", "há 3 dias").
     * @param {number} diffMs agora - momento, em milissegundos
     */
    relativeTime: function (diffMs) {
        if (typeof diffMs !== 'number' || !isFinite(diffMs)) return 'nunca';
        var min = Math.floor(Math.max(0, diffMs) / 60000);
        if (min < 1) return 'agora';
        if (min < 60) return 'há ' + min + ' min';
        var h = Math.floor(min / 60);
        if (h < 24) return 'há ' + h + ' h';
        var d = Math.floor(h / 24);
        return d === 1 ? 'há 1 dia' : 'há ' + d + ' dias';
    },

    type: 'ScoringRules',
};
