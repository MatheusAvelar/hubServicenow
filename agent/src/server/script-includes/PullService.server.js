/**
 * PullService — leitura periódica do Hub (GET /ping e GET /activities).
 * São só leituras: se o Hub estiver hibernando, nada se perde — o próximo job (ou o "Sincronizar
 * agora") tenta de novo. Escritas vão sempre pelo OutboxService.
 */
var PullService = Class.create();

PullService.prototype = {
    initialize: function () {
        this.client = new HubClient();
        this.config = new AgentConfig();
    },

    /** @returns {{ok:boolean, updated:number, message:string}} */
    pull: function () {
        var ping = this.client.request('GET', '/ping', null);
        if (ping.kind !== 'ok') return { ok: false, updated: 0, message: ping.message };
        if (ping.json && ping.json.score) this.config.set('score_cache', JSON.stringify(ping.json.score));

        // Sem nenhuma atividade local (Agent novo, reinstalado ou com falha anterior): pede a lista completa.
        var local = new GlideAggregate(AgentActivityService.T_ACTIVITY);
        local.addAggregate('COUNT');
        local.query();
        var hasLocal = local.next() && (parseInt(local.getAggregate('COUNT'), 10) || 0) > 0;
        var since = hasLocal ? this.config.pullSince() : '';
        var path = '/activities' + (since ? '?since=' + encodeURIComponent(since) : '');
        var res = this.client.request('GET', path, null);
        if (res.kind !== 'ok') return { ok: false, updated: 0, message: res.message };

        var list = (res.json && res.json.activities) || [];
        var service = new AgentActivityService();
        var updated = 0;
        var failed = 0;
        for (var i = 0; i < list.length; i++) {
            try {
                if (service.upsertFromHub(list[i])) updated++;
            } catch (e) {
                failed++;
                gs.error('[Dev Lab Agent] Falha ao gravar ' + (list[i] && list[i].number) + ': ' + e.message);
            }
        }
        // Só avança o marco incremental se tudo foi gravado; senão a próxima sincronização pede de novo.
        if (!failed && res.json && res.json.server_time) this.config.set('pull_since', res.json.server_time);
        this.config.markSynced();
        return { ok: true, updated: updated, message: '' };
    },

    /** Pull + flush do outbox (job do "Sincronizar agora"). */
    syncNow: function () {
        var pull = this.pull();
        var flush = new OutboxService().flush(true);
        gs.info('[Dev Lab Agent] Sincronização: pull=' + (pull.ok ? 'ok (' + pull.updated + ')' : 'falhou') +
            ' enviados=' + flush.sent + ' pendentes=' + flush.pending);
        return { pull: pull, flush: flush };
    },

    type: 'PullService',
};
