/**
 * HubDashboardService — dados do Painel do Hub e do card de pontuação do Agent.
 * Os widgets só chamam estes métodos; nenhuma regra de negócio fica no widget.
 */
var HubDashboardService = Class.create();

HubDashboardService.T = {
    activity: 'x_1556735_dlhub_activity',
    enrollment: 'x_1556735_dlhub_enrollment',
    participant: 'x_1556735_dlhub_participant',
};

/** Dias sem sincronizar para o dev aparecer com alerta de inativo. */
HubDashboardService.INACTIVE_DAYS = 3;

HubDashboardService.prototype = {
    initialize: function () {
        this.rules = new ScoringRules();
    },

    /** Linhas do ranking (todos os participantes ativos). */
    getRanking: function () {
        var now = new GlideDateTime().getNumericValue();
        var totalPublished = this._count(HubDashboardService.T.activity, 'state=published');
        var rows = {};
        var p = new GlideRecord(HubDashboardService.T.participant);
        p.addQuery('active', true);
        p.query();
        while (p.next()) {
            var lastSeen = p.getValue('last_seen');
            var lastSeenMs = lastSeen ? this._ms(lastSeen) : null;
            rows[p.getUniqueValue()] = {
                participant: p.getUniqueValue(),
                name: p.getValue('name'),
                initials: this.rules.initials(p.getValue('name')),
                points: 0,
                completed: 0,
                total: totalPublished,
                last_scored_at: null,
                last_seen: lastSeen || null,
                last_seen_label: lastSeenMs === null ? 'nunca' : this.rules.relativeTime(now - lastSeenMs),
                inactive: lastSeenMs === null || now - lastSeenMs > HubDashboardService.INACTIVE_DAYS * 86400000,
            };
        }
        var e = new GlideRecord(HubDashboardService.T.enrollment);
        e.addQuery('participant.active', true);
        e.addQuery('activity.state', 'IN', 'published,archived');
        e.query();
        while (e.next()) {
            var row = rows[e.getValue('participant')];
            if (!row) continue;
            row.points += parseInt(e.getValue('score'), 10) || 0;
            if (e.getValue('state') === 'completed') row.completed++;
            var updated = e.getValue('sys_updated_on');
            if ((parseInt(e.getValue('score'), 10) || 0) > 0 && (!row.last_scored_at || updated > row.last_scored_at)) {
                row.last_scored_at = updated;
            }
        }
        var list = [];
        for (var id in rows) {
            var r = rows[id];
            r.progress = r.total > 0 ? Math.round((r.completed / r.total) * 100) : 0;
            list.push(r);
        }
        return this.rules.rank(list);
    },

    /** Pontos, posição e concluídas de um dev (devolvido ao Agent em /ping e /results). */
    getScoreSummary: function (participantId) {
        var ranking = this.getRanking();
        for (var i = 0; i < ranking.length; i++) {
            if (ranking[i].participant === participantId) {
                return {
                    points: ranking[i].points,
                    rank: ranking[i].position,
                    participants: ranking.length,
                    completed: ranking[i].completed,
                    total: ranking[i].total,
                };
            }
        }
        return { points: 0, rank: null, participants: ranking.length, completed: 0, total: 0 };
    },

    /** Os 4 KPIs do Painel. */
    getKpis: function () {
        var ranking = this.getRanking();
        var inactive = 0;
        var progressSum = 0;
        for (var i = 0; i < ranking.length; i++) {
            if (ranking[i].inactive) inactive++;
            progressSum += ranking[i].progress;
        }
        var tracks = {};
        var a = new GlideRecord(HubDashboardService.T.activity);
        a.addQuery('state', 'published');
        a.query();
        var published = 0;
        while (a.next()) {
            published++;
            if (a.getValue('track')) tracks[a.getValue('track')] = true;
        }
        var awaiting = this.getAwaitingApproval();
        return {
            active_devs: ranking.length,
            inactive_devs: inactive,
            published: published,
            tracks: Object.keys(tracks).length,
            completion_avg: ranking.length ? Math.round(progressSum / ranking.length) : 0,
            awaiting: awaiting.devs.length,
            awaiting_activity: awaiting.activity,
        };
    },

    /** Devs que ainda não aprovaram a última atividade publicada. */
    getAwaitingApproval: function () {
        var a = new GlideRecord(HubDashboardService.T.activity);
        a.addQuery('state', 'published');
        a.orderByDesc('published_on');
        a.setLimit(1);
        a.query();
        if (!a.next()) return { activity: null, devs: [] };

        var now = new GlideDateTime().getNumericValue();
        var publishedOn = a.getValue('published_on');
        var activity = {
            number: a.getValue('number'),
            title: a.getValue('title'),
            published_label: publishedOn ? this.rules.relativeTime(now - this._ms(publishedOn)) : '',
        };
        var approved = {};
        var e = new GlideRecord(HubDashboardService.T.enrollment);
        e.addQuery('activity', a.getUniqueValue());
        e.addNotNullQuery('approved_at');
        e.query();
        while (e.next()) approved[e.getValue('participant')] = true;

        var devs = [];
        var p = new GlideRecord(HubDashboardService.T.participant);
        p.addQuery('active', true);
        p.orderBy('name');
        p.query();
        while (p.next()) {
            if (approved[p.getUniqueValue()]) continue;
            var lastSeen = p.getValue('last_seen');
            devs.push({
                name: p.getValue('name'),
                initials: this.rules.initials(p.getValue('name')),
                last_seen_label: lastSeen ? this.rules.relativeTime(now - this._ms(lastSeen)) : 'nunca',
            });
        }
        return { activity: activity, devs: devs };
    },

    /** CSV do ranking (separador ;, para abrir direto no Excel em pt-BR). */
    getRankingCsv: function () {
        var lines = ['Posição;Nome;Pontos;Concluídas;Total;Última sincronização'];
        var ranking = this.getRanking();
        for (var i = 0; i < ranking.length; i++) {
            var r = ranking[i];
            lines.push([r.position, this._csv(r.name), r.points, r.completed, r.total, r.last_seen_label].join(';'));
        }
        return lines.join('\n');
    },

    _csv: function (v) {
        var s = String(v === null || v === undefined ? '' : v);
        return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    },

    _count: function (table, query) {
        var ga = new GlideAggregate(table);
        ga.addEncodedQuery(query);
        ga.addAggregate('COUNT');
        ga.query();
        return ga.next() ? parseInt(ga.getAggregate('COUNT'), 10) || 0 : 0;
    },

    _ms: function (value) {
        var g = new GlideDateTime();
        g.setValue(value);
        return g.getNumericValue();
    },

    type: 'HubDashboardService',
};
