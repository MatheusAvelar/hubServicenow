/**
 * AgentConfig — leitura/gravação das propriedades do Agent (x_1556735_dlagent.*).
 * Senha e token são password2: nunca vão para log nem para o navegador.
 */
var AgentConfig = Class.create();

AgentConfig.PREFIX = 'x_1556735_dlagent.';
AgentConfig.SECRET_PROPS = ['hub_password', 'participant_token'];

AgentConfig.prototype = {
    initialize: function () {},

    hubUrl: function () {
        return String(gs.getProperty(AgentConfig.PREFIX + 'hub_url', '')).trim().replace(/\/+$/, '');
    },
    hubUser: function () {
        return String(gs.getProperty(AgentConfig.PREFIX + 'hub_user', '')).trim();
    },
    hubPassword: function () {
        return this._secret('hub_password');
    },
    token: function () {
        return this._secret('participant_token');
    },
    pullSince: function () {
        return String(gs.getProperty(AgentConfig.PREFIX + 'pull_since', ''));
    },
    lastSync: function () {
        return String(gs.getProperty(AgentConfig.PREFIX + 'last_sync', ''));
    },
    scoreCache: function () {
        try {
            return JSON.parse(gs.getProperty(AgentConfig.PREFIX + 'score_cache', '') || 'null');
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

    /**
     * Grava uma propriedade do Agent. As propriedades privadas (não vêm no Update Set) são criadas aqui
     * na primeira vez. password2: o valor é cifrado pela plataforma ao gravar.
     */
    set: function (name, value) {
        var gr = new GlideRecord('sys_properties');
        var text = value === null || value === undefined ? '' : String(value);
        if (gr.get('name', AgentConfig.PREFIX + name)) {
            gr.setValue('value', text);
            gr.update();
            return;
        }
        gr.initialize();
        gr.setValue('name', AgentConfig.PREFIX + name);
        gr.setValue('type', AgentConfig.SECRET_PROPS.indexOf(name) !== -1 ? 'password2' : 'string');
        gr.setValue('description', 'Dev Lab Agent (criada automaticamente)');
        gr.setValue('value', text);
        gr.insert();
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
        if (url) this.set('hub_url', url);
        if (String(input.hub_user || '').trim()) this.set('hub_user', String(input.hub_user).trim());
        if (input.hub_password) this.set('hub_password', String(input.hub_password));
        if (token) this.set('participant_token', token.toLowerCase());
        var missing = this.missing();
        return missing.length
            ? { ok: true, message: 'Configuração salva. Ainda falta: ' + missing.join(', ') + '.' }
            : { ok: true, message: 'Configuração salva. Sincronizando com o Hub…' };
    },

    markSynced: function () {
        this.set('last_sync', new GlideDateTime().getValue());
    },

    /**
     * password2: gs.getProperty devolve o valor decifrado na maioria das releases. Se vier vazio/cifrado,
     * tenta decifrar pelo registro (ver CLAUDE.md, plano B: Basic Auth Profile).
     */
    _secret: function (name) {
        var value = gs.getProperty(AgentConfig.PREFIX + name, '');
        if (value) return String(value);
        try {
            var gr = new GlideRecord('sys_properties');
            if (gr.get('name', AgentConfig.PREFIX + name)) {
                return String(gr.value.getDecryptedValue() || '');
            }
        } catch (e) {
            // sem acesso ao valor decifrado neste contexto
        }
        return '';
    },

    type: 'AgentConfig',
};
