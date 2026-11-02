/**
 * HubClient — única porta de saída do Agent para o Hub (Agent → Hub, nunca o contrário).
 * Chamadas de escrita (approve, results) só passam por aqui a partir do OutboxService.
 *
 * Retorno: { kind: 'ok'|'transient'|'permanent', status, json, message }
 */
var HubClient = Class.create();

HubClient.BASE_PATH = '/api/x_1556735_dlhub/devlab/v1';
HubClient.TIMEOUT_MS = 20000;

HubClient.prototype = {
    initialize: function () {
        this.config = new AgentConfig();
        this.rules = new AgentRules();
    },

    /**
     * @param {string} method GET | POST
     * @param {string} path ex.: "/activities/LAB0001/results" (relativo a BASE_PATH)
     * @param {object|null} body
     */
    request: function (method, path, body) {
        if (!this.config.isConfigured()) {
            return { kind: 'transient', status: 0, json: null, message: 'Agent não configurado: falta ' + this.config.missing().join(', ') + '.' };
        }
        var status = 0;
        var contentType = '';
        var text = '';
        try {
            var rm = new sn_ws.RESTMessageV2();
            rm.setEndpoint(this.config.hubUrl() + HubClient.BASE_PATH + path);
            rm.setHttpMethod(method);
            rm.setBasicAuth(this.config.hubUser(), this.config.hubPassword());
            rm.setRequestHeader('Accept', 'application/json');
            rm.setRequestHeader('Content-Type', 'application/json');
            rm.setRequestHeader('X-DevLab-Token', this.config.token());
            rm.setRequestHeader('X-DevLab-Agent-Version', AgentRules.AGENT_VERSION);
            rm.setHttpTimeout(HubClient.TIMEOUT_MS);
            if (body !== null && body !== undefined && method !== 'GET') rm.setRequestBody(JSON.stringify(body));
            var res = rm.execute();
            status = res.getStatusCode();
            contentType = res.getHeader('Content-Type') || '';
            text = res.getBody() || '';
            if (res.haveError() && !status) {
                return { kind: 'transient', status: 0, json: null, message: 'Falha de conexão com o Hub: ' + res.getErrorMessage() };
            }
        } catch (e) {
            return { kind: 'transient', status: 0, json: null, message: 'Falha de conexão com o Hub: ' + e.message };
        }
        var c = this.rules.classify(status, contentType, text);
        return { kind: c.kind, status: status, json: c.json, message: c.message };
    },

    type: 'HubClient',
};
