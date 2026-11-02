/**
 * HubConsoleService — backend da página única do Hub (x_1556735_dlhub_devlab.do).
 *
 * A página chama POST /api/x_1556735_dlhub/console/v1/run com { action, params } usando a sessão do
 * instrutor (X-UserToken). Este Script Include valida o pedido, executa a ação e devolve um objeto
 * simples; a regra de negócio continua nos serviços de sempre (ActivityImportService, TokenService,
 * HubDashboardService). Ações desconhecidas são recusadas.
 */
var HubConsoleService = Class.create();

HubConsoleService.ROLE = 'x_1556735_dlhub.admin';

HubConsoleService.T = {
    activity: 'x_1556735_dlhub_activity',
    check: 'x_1556735_dlhub_check',
    track: 'x_1556735_dlhub_track',
    participant: 'x_1556735_dlhub_participant',
};

/** Ações aceitas pela página (nome → método). */
HubConsoleService.ACTIONS = {
    overview: 'overview',
    ranking_csv: 'rankingCsv',
    activities: 'activities',
    activity_json: 'activityJson',
    activity_raw: 'activityRaw',
    api_log: 'apiLog',
    validate: 'validate',
    import: 'importActivity',
    publish: 'publish',
    archive: 'archive',
    tracks: 'tracks',
    save_track: 'saveTrack',
    participants: 'participants',
    save_participant: 'saveParticipant',
    new_token: 'newToken',
};

HubConsoleService.prototype = {
    initialize: function () {
        this.importer = new ActivityImportService();
        this.validator = new ActivityValidator();
        this.dashboard = new HubDashboardService();
        this.tokens = new TokenService();
        this.rules = new ScoringRules();
    },

    /** Ponto de entrada da rota REST. */
    handle: function (request, response) {
        var status = 200;
        var out;
        try {
            if (!gs.hasRole(HubConsoleService.ROLE)) {
                status = 403;
                out = { ok: false, error: 'Acesso só para o instrutor (role x_1556735_dlhub.admin).' };
            } else {
                var body = {};
                try {
                    body = request.body.data || {};
                } catch (e) {
                    body = {};
                }
                out = this.run(body.action, body.params || {});
                if (!out.ok && out.status) status = out.status;
            }
        } catch (e) {
            gs.error('[Dev Lab] Console: ' + e.message);
            status = 500;
            out = { ok: false, error: 'Erro interno no Hub.' };
        }
        delete out.status;
        response.setStatus(status);
        response.setContentType('application/json');
        response.setBody(out);
    },

    /** Executa uma ação da lista branca. */
    run: function (action, params) {
        var method = HubConsoleService.ACTIONS.hasOwnProperty(action) ? HubConsoleService.ACTIONS[action] : null;
        if (!method) return { ok: false, status: 400, error: 'Ação desconhecida.' };
        return this[method](params || {});
    },

    // ------------------------------------------------------------- painel

    overview: function () {
        return {
            ok: true,
            kpis: this.dashboard.getKpis(),
            ranking: this.dashboard.getRanking(),
            awaiting: this.dashboard.getAwaitingApproval(),
        };
    },

    rankingCsv: function () {
        return { ok: true, csv: this.dashboard.getRankingCsv() };
    },

    // ---------------------------------------------------------- atividades

    activities: function () {
        var checks = {};
        var ga = new GlideAggregate(HubConsoleService.T.check);
        ga.addAggregate('COUNT');
        ga.groupBy('activity');
        ga.query();
        while (ga.next()) checks[ga.getValue('activity')] = parseInt(ga.getAggregate('COUNT'), 10) || 0;

        var list = [];
        var a = new GlideRecord(HubConsoleService.T.activity);
        a.orderBy('number');
        a.query();
        while (a.next()) {
            list.push({
                sys_id: a.getUniqueValue(),
                number: a.getValue('number'),
                title: a.getValue('title'),
                track: a.track.getDisplayValue(),
                level: a.getValue('level'),
                level_label: a.getDisplayValue('level'),
                state: a.getValue('state'),
                state_label: a.getDisplayValue('state'),
                version: parseInt(a.getValue('version'), 10) || 1,
                total_points: parseInt(a.getValue('total_points'), 10) || 0,
                checks: checks[a.getUniqueValue()] || 0,
                due_date: a.getDisplayValue('due_date'),
                published_on: a.getDisplayValue('published_on'),
            });
        }
        return { ok: true, activities: list };
    },

    /** JSON da atividade no formato de activities/*.json (para editar e reimportar). */
    activityJson: function (params) {
        var a = this._activity(params.number);
        if (!a) return { ok: false, status: 404, error: 'Atividade não encontrada.' };
        return { ok: true, json: JSON.stringify(this.importer.toJson(a, true), null, 2) };
    },

    /** Diagnóstico: valores brutos de setup/params como estão gravados (para investigar JSON ilegível). */
    activityRaw: function (params) {
        var a = this._activity(params.number);
        if (!a) return { ok: false, status: 404, error: 'Atividade não encontrada.' };
        var checks = [];
        var c = new GlideRecord(HubConsoleService.T.check);
        c.addQuery('activity', a.getUniqueValue());
        c.orderBy('order');
        c.query();
        while (c.next()) {
            checks.push({ code: c.getValue('code'), params: c.getValue('params'), params_display: c.getDisplayValue('params'), params_type: typeof c.getValue('params') });
        }
        return { ok: true, setup: a.getValue('setup'), setup_display: a.getDisplayValue('setup'), checks: checks };
    },

    /** Últimas chamadas da API do Dev Lab (diagnóstico de sincronização). */
    apiLog: function (params) {
        var limit = Math.min(Math.max(parseInt(params.limit, 10) || 20, 1), 100);
        var list = [];
        var l = new GlideRecord('x_1556735_dlhub_api_log');
        l.orderByDesc('sys_created_on');
        l.setLimit(limit);
        l.query();
        while (l.next()) {
            list.push({
                created: l.getDisplayValue('sys_created_on'),
                participant: l.participant.getDisplayValue() || '',
                endpoint: l.getValue('endpoint'),
                status: parseInt(l.getValue('status'), 10) || 0,
                summary: l.getValue('payload_summary') || '',
            });
        }
        return { ok: true, entries: list };
    },

    /** Valida sem gravar e descreve o que a importação vai fazer. */
    validate: function (params) {
        var result = this.validator.validate(String(params.json || ''));
        if (!result.valid) return { ok: true, valid: false, errors: result.errors };
        var a = result.activity;
        var existing = this._activity(a.number);
        var points = 0;
        for (var i = 0; i < a.checks.length; i++) points += a.checks[i].points || 0;
        var nextVersion = a.version;
        if (existing) nextVersion = Math.max(a.version, (parseInt(existing.getValue('version'), 10) || 0) + 1);
        return {
            ok: true,
            valid: true,
            errors: [],
            summary: {
                number: a.number,
                title: a.title,
                track: a.track,
                level: a.level,
                checks: a.checks.length,
                points: points,
                setup: (a.setup || []).length,
                exists: !!existing,
                current_state: existing ? existing.getValue('state') : null,
                next_version: nextVersion,
            },
        };
    },

    /** Importa (cria ou atualiza) e, se pedido, publica em seguida. */
    importActivity: function (params) {
        var result = this.importer.importJson(String(params.json || ''));
        if (!result.ok) return { ok: false, status: 422, error: 'JSON rejeitado.', errors: result.errors };
        var published = false;
        var publishErrors = [];
        if (params.publish === true) {
            var a = this._activity(result.number);
            var pub = this.importer.publish(a);
            published = pub.ok;
            publishErrors = pub.errors;
        }
        return {
            ok: true,
            number: result.number,
            version: result.version,
            created: result.created,
            published: published,
            publish_errors: publishErrors,
        };
    },

    publish: function (params) {
        var a = this._activity(params.number);
        if (!a) return { ok: false, status: 404, error: 'Atividade não encontrada.' };
        var result = this.importer.publish(a);
        if (!result.ok) return { ok: false, status: 422, error: 'Não foi possível publicar.', errors: result.errors };
        return { ok: true };
    },

    archive: function (params) {
        var a = this._activity(params.number);
        if (!a) return { ok: false, status: 404, error: 'Atividade não encontrada.' };
        if (a.getValue('state') !== 'published') return { ok: false, status: 409, error: 'Só atividade publicada pode ser arquivada.' };
        a.setValue('state', 'archived');
        a.update();
        return { ok: true };
    },

    // -------------------------------------------------------------- trilhas

    tracks: function () {
        var counts = {};
        var ga = new GlideAggregate(HubConsoleService.T.activity);
        ga.addAggregate('COUNT');
        ga.groupBy('track');
        ga.query();
        while (ga.next()) counts[ga.getValue('track')] = parseInt(ga.getAggregate('COUNT'), 10) || 0;

        var list = [];
        var t = new GlideRecord(HubConsoleService.T.track);
        t.orderBy('order');
        t.orderBy('name');
        t.query();
        while (t.next()) {
            list.push({
                sys_id: t.getUniqueValue(),
                name: t.getValue('name'),
                description: t.getValue('description') || '',
                order: parseInt(t.getValue('order'), 10) || 0,
                active: t.getValue('active') === '1',
                activities: counts[t.getUniqueValue()] || 0,
            });
        }
        return { ok: true, tracks: list };
    },

    saveTrack: function (params) {
        var name = this._text(params.name, 100);
        var t = new GlideRecord(HubConsoleService.T.track);
        var exists = params.sys_id ? t.get(String(params.sys_id)) : false;
        if (params.sys_id && !exists) return { ok: false, status: 404, error: 'Trilha não encontrada.' };
        if (!exists) {
            if (!name) return { ok: false, status: 422, error: 'Informe o nome da trilha.' };
            t.initialize();
        }
        if (name) {
            var dup = new GlideRecord(HubConsoleService.T.track);
            dup.addQuery('name', name);
            if (exists) dup.addQuery('sys_id', '!=', t.getUniqueValue());
            dup.setLimit(1);
            dup.query();
            if (dup.hasNext()) return { ok: false, status: 409, error: 'Já existe uma trilha com esse nome.' };
            t.setValue('name', name);
        }
        if (params.hasOwnProperty('description')) t.setValue('description', this._text(params.description, 4000));
        if (params.hasOwnProperty('order')) t.setValue('order', parseInt(params.order, 10) || 0);
        if (params.hasOwnProperty('active')) t.setValue('active', params.active === true);
        else if (!exists) t.setValue('active', true);
        var id = exists ? t.update() : t.insert();
        if (!id) return { ok: false, status: 500, error: 'Não foi possível salvar a trilha.' };
        return { ok: true, sys_id: String(id) };
    },

    // -------------------------------------------------------- participantes

    participants: function () {
        var now = new GlideDateTime().getNumericValue();
        var list = [];
        var p = new GlideRecord(HubConsoleService.T.participant);
        p.orderBy('name');
        p.query();
        while (p.next()) {
            var lastSeen = p.getValue('last_seen');
            var ms = null;
            if (lastSeen) {
                var g = new GlideDateTime();
                g.setValue(lastSeen);
                ms = g.getNumericValue();
            }
            list.push({
                sys_id: p.getUniqueValue(),
                name: p.getValue('name'),
                initials: this.rules.initials(p.getValue('name')),
                email: p.getValue('email') || '',
                instance_url: p.getValue('instance_url') || '',
                active: p.getValue('active') === '1',
                has_token: !!p.getValue('token_hash'),
                agent_version: p.getValue('agent_version') || '',
                last_seen_label: ms === null ? 'nunca' : this.rules.relativeTime(now - ms),
            });
        }
        return { ok: true, participants: list };
    },

    /** Cria (devolve o token uma única vez) ou altera nome/e-mail/URL/ativo. */
    saveParticipant: function (params) {
        var name = this._text(params.name, 100);
        var p = new GlideRecord(HubConsoleService.T.participant);
        var exists = params.sys_id ? p.get(String(params.sys_id)) : false;
        if (params.sys_id && !exists) return { ok: false, status: 404, error: 'Participante não encontrado.' };
        if (!exists && !name) return { ok: false, status: 422, error: 'Informe o nome do participante.' };
        if (!exists) p.initialize();
        if (name) p.setValue('name', name);
        if (params.hasOwnProperty('email')) p.setValue('email', this._text(params.email, 100));
        if (params.hasOwnProperty('instance_url')) p.setValue('instance_url', this._text(params.instance_url, 255));
        if (params.hasOwnProperty('active')) p.setValue('active', params.active === true);
        else if (!exists) p.setValue('active', true);

        if (exists) {
            p.update();
            return { ok: true, sys_id: p.getUniqueValue() };
        }
        // Token gerado aqui para devolvê-lo à página; a BR de insert é pulada para não gerar outro.
        var token = this.tokens.issue(p, true);
        p.setWorkflow(false);
        var id = p.insert();
        if (!id) return { ok: false, status: 500, error: 'Não foi possível cadastrar o participante.' };
        return { ok: true, sys_id: String(id), token: token };
    },

    newToken: function (params) {
        var p = new GlideRecord(HubConsoleService.T.participant);
        if (!params.sys_id || !p.get(String(params.sys_id))) return { ok: false, status: 404, error: 'Participante não encontrado.' };
        return { ok: true, token: this.tokens.issue(p, false) };
    },

    // -------------------------------------------------------------- apoio

    _activity: function (number) {
        if (!number) return null;
        var a = new GlideRecord(HubConsoleService.T.activity);
        return a.get('number', String(number)) ? a : null;
    },

    _text: function (value, max) {
        if (value === null || value === undefined) return '';
        return String(value).trim().substring(0, max);
    },

    type: 'HubConsoleService',
};
