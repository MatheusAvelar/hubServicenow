/**
 * ApiLogService — registro das chamadas do Agent (api_log).
 * Nunca grava token, senha ou evidência completa: só um resumo curto.
 */
var ApiLogService = Class.create();

ApiLogService.TABLE = 'x_1556735_dlhub_api_log';

ApiLogService.prototype = {
    initialize: function () {},

    /**
     * @param {string|null} participantId sys_id do participante (null se não identificado)
     * @param {string} endpoint ex.: "POST /activities/LAB0001/results"
     * @param {string} summary resumo curto, sem dados sensíveis
     * @param {number} status código HTTP devolvido
     */
    log: function (participantId, endpoint, summary, status) {
        try {
            var gr = new GlideRecord(ApiLogService.TABLE);
            gr.initialize();
            if (participantId) gr.setValue('participant', participantId);
            gr.setValue('endpoint', String(endpoint || '').substring(0, 200));
            gr.setValue('payload_summary', String(summary || '').substring(0, 1000));
            gr.setValue('status', status);
            gr.insert();
        } catch (e) {
            gs.error('[Dev Lab] Falha ao gravar api_log: ' + e.message);
        }
    },

    type: 'ApiLogService',
};
