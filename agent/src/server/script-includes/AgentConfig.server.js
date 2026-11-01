/**
 * AgentConfig — configuração do Agent nesta PDI.
 *
 * Tudo que o dev informa (URL, usuário, senha, token) e o estado da sincronização ficam numa linha da tabela
 * x_1556735_dlagent_config, do próprio escopo. Não usa sys_properties para gravar: a tabela é global e não
 * deixa app escopado criar registros ("Create operation against 'sys_properties' ... has been refused").
 * As propriedades x_1556735_dlagent.hub_url / hub_user (do Update Set) servem só de valor padrão.
 * Senha e token são password2: nunca vão para log nem para o navegador.
 */
var AgentConfig = Class.create();

AgentConfig.TABLE = 'x_1556735_dlagent_config';
AgentConfig.PREFIX = 'x_1556735_dlagent.';
AgentConfig.SECRET_FIELDS = ['hub_password', 'participant_token'];
AgentConfig.FIELDS = ['hub_url', 'hub_user', 'hub_password', 'participant_token', 'last_sync', 'pull_since', 'score_cache'];

AgentConfig.prototype = {
    initialize: function () {},

    hubUrl: function () {
        var value = this._get('hub_url') || String(gs.getProperty(AgentConfig.PREFIX + 'hub_url', ''));
        return value.trim().replace(/\/+$/, '');
    },
    hubUser: function () {
        return (this._get('hub_user') || String(gs.getProperty(AgentConfig.PREFIX + 'hub_user', ''))).trim();
    },
    hubPassword: function () {
        return this._get('hub_password');
    },
    token: function () {
        return this._get('participant_token');
    },
    pullSince: function () {
        return this._get('pull_since');
    },
    lastSync: function () {
        return this._get('last_sync');
    },
    scoreCache: function () {
        try {
            return JSON.parse(this._get('score_cache') || 'null');
        } catch (e) {
            return null;
        }
    },

    /** true se hub_url, usuário, senha e token estão preenchidos. */
    isConfigured: function () {
        return !!(this.hubUrl() && this.hubUser() && this.hubPassword() && this.token());
    },

    /** Lista do que falta configurar (para mostrar no portal). */
    missing: function () {
        var out = [];
        if (!this.hubUrl()) out.push('hub_url');
        if (!this.hubUser()) out.push('hub_user');
        if (!this.hubPassword()) out.push('hub_password');
        if (!this.token()) out.push('participant_token');
        return out;
    },

    /** Grava um campo da configuração (cria a linha na primeira vez). password2 é cifrado pela plataforma. */
    set: function (name, value) {
        if (AgentConfig.FIELDS.indexOf(name) === -1) throw new Error('Campo de configuração desconhecido: ' + name);
        var gr = this._record(true);
        gr.setValue(name, value === null || value === undefined ? '' : String(value));
        gr.setWorkflow(false);
        gr.update();
        this._cache = null;
    },

    /**
     * Salva a configuração digitada no portal ("Configurar Agent"). Campos vazios mantêm o valor atual.
     * @returns {{ok:boolean, message:string}}
     */
    saveConfig: function (input) {
        input = input || {};
        var url = String(input.hub_url || '').trim().replace(/\/+$/, '');
        if (url && !/^https:\/\/[a-z0-9-]+\.service-now\.com$/i.test(url)) {
            return { ok: false, message: 'A URL do Hub deve ser https://<instância>.service-now.com.' };
        }
        var token = String(input.participant_token || '').trim();
        if (token && !/^[a-f0-9]{64}$/i.test(token)) {
            return { ok: false, message: 'O token deve ter 64 caracteres hexadecimais (copie exatamente o que o instrutor enviou).' };
        }
        var gr = this._record(true);
        if (url) gr.setValue('hub_url', url);
        if (String(input.hub_user || '').trim()) gr.setValue('hub_user', String(input.hub_user).trim());
        if (input.hub_password) gr.setValue('hub_password', String(input.hub_password));
        if (token) gr.setValue('participant_token', token.toLowerCase());
        gr.setWorkflow(false);
        gr.update();
        this._cache = null;
        var missing = this.missing();
        return missing.length
            ? { ok: true, message: 'Configuração salva. Ainda falta: ' + missing.join(', ') + '.' }
            : { ok: true, message: 'Configuração salva. Sincronizando com o Hub…' };
    },

    markSynced: function () {
        this.set('last_sync', new GlideDateTime().getValue());
    },

    // ------------------------------------------------------------------ apoio

    /** A linha de configuração (a mais antiga, se por acaso houver mais de uma). */
    _record: function (create) {
        var gr = new GlideRecord(AgentConfig.TABLE);
        gr.orderBy('sys_created_on');
        gr.setLimit(1);
        gr.query();
        if (gr.next()) return gr;
        if (!create) return null;
        gr.initialize();
        gr.setWorkflow(false);
        var id = gr.insert();
        gr = new GlideRecord(AgentConfig.TABLE);
        gr.get(id);
        this._cache = null;
        return gr;
    },

    _get: function (name) {
        if (!this._cache) {
            var gr = this._record(false);
            var cache = {};
            for (var i = 0; i < AgentConfig.FIELDS.length; i++) {
                var f = AgentConfig.FIELDS[i];
                if (!gr) cache[f] = '';
                else if (AgentConfig.SECRET_FIELDS.indexOf(f) !== -1) cache[f] = this._decrypt(gr, f);
                else cache[f] = String(gr.getValue(f) || '');
            }
            this._cache = cache;
        }
        return this._cache[name] || '';
    },

    _decrypt: function (gr, field) {
        try {
            return String(gr[field].getDecryptedValue() || '');
        } catch (e) {
            gs.error('[Dev Lab] Não foi possível decifrar ' + field + ': ' + e.message);
            return '';
        }
    },

    type: 'AgentConfig',
};
