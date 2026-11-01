/**
 * OutboxService — fila de mensagens para o Hub, com retry e backoff exponencial (até 12 h).
 * O Hub é uma PDI e hiberna: nenhuma ação do dev depende dele estar acordado. Tudo que escreve
 * no Hub (approve, results) entra aqui e é enviado pelo job de flush ou pelo "Sincronizar agora".
 */
var OutboxService = Class.create();

OutboxService.TABLE = 'x_1556735_dlagent_outbox';

OutboxService.prototype = {
    initialize: function () {
        this.rules = new AgentRules();
    },

    /**
     * @param {string} kind approve | results
     * @param {string} path rota relativa (ex.: /activities/LAB0001/results)
     * @param {object} payload corpo JSON
     * @param {string} activityId sys_id da atividade local
     * @param {string} dedupeKey se já existir mensagem pendente com a mesma chave, não duplica
     */
    enqueue: function (kind, path, payload, activityId, dedupeKey) {
        if (dedupeKey) {
            var dup = new GlideRecord(OutboxService.TABLE);
            dup.addQuery('dedupe_key', dedupeKey);
            dup.addQuery('status', 'IN', 'pending,sent');
            dup.setLimit(1);
            dup.query();
            if (dup.next()) return dup.getUniqueValue();
        }
        var gr = new GlideRecord(OutboxService.TABLE);
        gr.initialize();
        gr.setValue('kind', kind);
        gr.setValue('method', 'POST');
        gr.setValue('endpoint', path);
        gr.setValue('payload', JSON.stringify(payload || {}));
        gr.setValue('status', 'pending');
        gr.setValue('attempts', 0);
        gr.setValue('next_retry', new GlideDateTime());
        gr.setValue('dedupe_key', dedupeKey || '');
        if (activityId) gr.setValue('activity', activityId);
        return String(gr.insert());
    },

    /** Quantas mensagens ainda vão para o Hub. */
    pendingCount: function () {
        var ga = new GlideAggregate(OutboxService.TABLE);
        ga.addQuery('status', 'pending');
        ga.addAggregate('COUNT');
        ga.query();
        return ga.next() ? parseInt(ga.getAggregate('COUNT'), 10) || 0 : 0;
    },

    /**
     * Envia as mensagens vencidas, na ordem de criação. Para no primeiro erro transitório
     * (se o Hub está dormindo, não adianta insistir agora) e reagenda com backoff.
     * @param {boolean} ignoreSchedule true = "Sincronizar agora" (tenta mesmo antes do next_retry)
     * @returns {{sent:number, failed:number, pending:number, hubDown:boolean, message:string}}
     */
    flush: function (ignoreSchedule) {
        var client = new HubClient();
        var activityService = new AgentActivityService();
        var out = { sent: 0, failed: 0, pending: 0, hubDown: false, message: '' };
        var gr = new GlideRecord(OutboxService.TABLE);
        gr.addQuery('status', 'pending');
        if (!ignoreSchedule) gr.addQuery('next_retry', '<=', new GlideDateTime());
        gr.orderBy('sys_created_on');
        gr.setLimit(50);
        gr.query();
        while (gr.next()) {
            var payload = null;
            try {
                payload = JSON.parse(gr.getValue('payload') || '{}');
            } catch (e) {
                payload = {};
            }
            var res = client.request(gr.getValue('method') || 'POST', gr.getValue('endpoint'), payload);
            var attempts = (parseInt(gr.getValue('attempts'), 10) || 0) + 1;
            gr.setValue('attempts', attempts);
            gr.setValue('last_status', res.status);
            if (res.kind === 'ok') {
                gr.setValue('status', 'sent');
                gr.setValue('last_error', '');
                gr.setValue('response', JSON.stringify(res.json).substring(0, 8000));
                gr.update();
                activityService.applyHubResponse(gr.getValue('kind'), gr.getValue('activity'), res.json);
                new AgentConfig().markSynced();
                out.sent++;
            } else if (res.kind === 'permanent') {
                gr.setValue('status', 'failed');
                gr.setValue('last_error', res.message.substring(0, 1000));
                gr.update();
                out.failed++;
            } else {
                var next = new GlideDateTime();
                next.addSeconds(this.rules.backoffMinutes(attempts) * 60);
                gr.setValue('next_retry', next);
                gr.setValue('last_error', res.message.substring(0, 1000));
                gr.update();
                out.hubDown = true;
                out.message = res.message;
                break;
            }
        }
        out.pending = this.pendingCount();
        return out;
    },

    type: 'OutboxService',
};
