/**
 * DevLabApi — lógica dos endpoints /api/x_1556735_dlhub/devlab/v1/*.
 *
 * As rotas do Scripted REST só chamam handle(); toda a regra fica aqui e nos Script Includes
 * que este usa. Toda resposta é JSON. Identificação do dev: header X-DevLab-Token (hash SHA-256).
 * O Hub recalcula os pontos (ScoringRules) — pontos enviados pelo Agent são ignorados.
 */
var DevLabApi = Class.create();

DevLabApi.T = {
    activity: 'x_1556735_dlhub_activity',
    check: 'x_1556735_dlhub_check',
    enrollment: 'x_1556735_dlhub_enrollment',
    result: 'x_1556735_dlhub_result',
};

DevLabApi.prototype = {
    initialize: function () {
        this.tokens = new TokenService();
        this.logger = new ApiLogService();
        this.rules = new ScoringRules();
        this.importer = new ActivityImportService();
        this.dashboard = new HubDashboardService();
    },

    /**
     * Ponto de entrada das rotas.
     * @param {string} route ping | activities | approve | results
     */
    handle: function (route, request, response) {
        var label = this._label(route, request);
        var participant = null;
        var out;
        try {
            participant = this.tokens.findParticipant(request.getHeader('X-DevLab-Token'));
            if (!participant) {
                out = this._error(401, 'invalid_token', 'Token inválido ou participante inativo.');
            } else {
                this._touch(participant, request);
                if (route === 'ping') out = this.ping(participant);
                else if (route === 'activities') out = this.activities(participant, this._query(request, 'since'));
                else if (route === 'approve') out = this.approve(participant, request.pathParams.number);
                else if (route === 'results') out = this.results(participant, request.pathParams.number, this._body(request));
                else out = this._error(404, 'not_found', 'Rota desconhecida.');
            }
        } catch (e) {
            gs.error('[Dev Lab] Erro em ' + label + ': ' + e.message);
            out = this._error(500, 'internal_error', 'Erro interno no Hub.');
        }
        this.logger.log(participant ? participant.getUniqueValue() : null, label, out.summary || '', out.status);
        response.setStatus(out.status);
        response.setContentType('application/json');
        response.setBody(out.body);
    },

    // ---------------------------------------------------------------- rotas

    ping: function (participant) {
        return this._ok({
            ok: true,
            server_time: this._iso(new GlideDateTime()),
            participant: { name: participant.getValue('name') },
            score: this.dashboard.getScoreSummary(participant.getUniqueValue()),
        }, 'ping');
    },

    activities: function (participant, since) {
        var gr = new GlideRecord(DevLabApi.T.activity);
        gr.addQuery('state', 'IN', 'published,archived');
        var sinceGdt = this._parseIso(since);
        if (since && !sinceGdt) return this._error(400, 'invalid_since', 'Parâmetro "since" inválido (use ISO 8601).');
        if (sinceGdt) gr.addQuery('sys_updated_on', '>', sinceGdt);
        gr.orderBy('number');
        gr.setLimit(200);
        gr.query();
        var list = [];
        var enrollments = this._enrollmentsByActivity(participant.getUniqueValue());
        while (gr.next()) {
            var json = this.importer.toJson(gr, false);
            var en = enrollments[gr.getUniqueValue()];
            json.enrollment = en || null;
            list.push(json);
        }
        return this._ok({
            server_time: this._iso(new GlideDateTime()),
            activities: list,
        }, 'activities=' + list.length + (since ? ' since=' + since : ''));
    },

    approve: function (participant, number) {
        var activity = this._publishedActivity(number);
        if (!activity) return this._error(404, 'activity_not_found', 'Atividade ' + number + ' não está publicada.');
        var en = this._enrollment(participant.getUniqueValue(), activity.getUniqueValue(), true);
        if (!en.getValue('approved_at')) {
            en.setValue('approved_at', new GlideDateTime());
        }
        var state = en.getValue('state');
        if (!state || state === 'available') en.setValue('state', 'approved');
        en.update();
        return this._ok({
            number: number,
            state: en.getValue('state'),
            approved_at: this._iso(this._gdt(en.getValue('approved_at'))),
        }, number + ' approve');
    },

    results: function (participant, number, body) {
        if (!body || typeof body !== 'object') return this._error(400, 'invalid_body', 'Corpo JSON inválido.');
        var activity = this._publishedActivity(number);
        if (!activity) return this._error(404, 'activity_not_found', 'Atividade ' + number + ' não está publicada.');
        var en = this._enrollment(participant.getUniqueValue(), activity.getUniqueValue(), false);
        if (!en || !en.getValue('approved_at')) {
            return this._error(409, 'not_approved', 'A atividade ainda não foi aprovada por este dev.');
        }
        var attempt = body.attempt;
        var attemptError = this.rules.checkAttempt(attempt, activity.getValue('max_attempts'));
        if (attemptError) return this._error(422, 'invalid_attempt', attemptError);
        if (!Array.isArray(body.checks)) return this._error(400, 'invalid_body', '"checks" deve ser uma lista.');

        var defs = this._checkDefs(activity.getUniqueValue());
        var summary = number + ' attempt=' + attempt + ' checks=' + body.checks.length;

        // Idempotência: o outbox pode reenviar a mesma tentativa. Não conta de novo.
        if (this._attemptExists(en.getUniqueValue(), attempt)) {
            var stored = this._storedAttempt(en, defs, attempt);
            stored.duplicate = true;
            stored.score_summary = this.dashboard.getScoreSummary(participant.getUniqueValue());
            return this._ok(stored, summary + ' (reenvio)');
        }

        var scored = this.rules.scoreAttempt(defs, body.checks, en.getValue('hints_used') ? this._hintCost(en) : 0);
        var validatedAt = this._parseIso(body.validated_at) || new GlideDateTime();
        var sentById = {};
        for (var i = 0; i < body.checks.length; i++) {
            var c = body.checks[i];
            if (c && typeof c.check_id === 'string') sentById[c.check_id] = c;
        }
        for (var j = 0; j < defs.length; j++) {
            var def = defs[j];
            var s = scored.checks[j];
            var sent = sentById[def.code];
            var evidence = sent && sent.evidence !== undefined ? JSON.stringify(sent.evidence) : '';
            var r = new GlideRecord(DevLabApi.T.result);
            r.initialize();
            r.setValue('enrollment', en.getUniqueValue());
            r.setValue('check', def.sys_id);
            r.setValue('attempt', attempt);
            r.setValue('passed', s.passed);
            r.setValue('points', s.points);
            r.setValue('evidence', evidence.substring(0, 8000));
            r.setValue('evidence_hash', evidence ? this.tokens.hash(evidence) : '');
            r.setValue('validated_at', validatedAt);
            r.insert();
        }

        var best = Math.max(parseInt(en.getValue('score'), 10) || 0, scored.score);
        en.setValue('score', best);
        en.setValue('attempts', Math.max(parseInt(en.getValue('attempts'), 10) || 0, attempt));
        if (scored.completed) {
            en.setValue('state', 'completed');
            if (!en.getValue('completed_at')) en.setValue('completed_at', new GlideDateTime());
        } else if (en.getValue('state') !== 'completed') {
            en.setValue('state', 'in_progress');
        }
        en.update();

        return this._ok({
            number: number,
            attempt: attempt,
            score: scored.score,
            best_score: best,
            max: scored.max,
            completed: en.getValue('state') === 'completed',
            checks: scored.checks,
            ignored_checks: scored.unknown,
            version_mismatch: body.activity_version !== undefined &&
                body.activity_version !== (parseInt(activity.getValue('version'), 10) || 1),
            score_summary: this.dashboard.getScoreSummary(participant.getUniqueValue()),
        }, summary + ' score=' + scored.score + '/' + scored.max);
    },

    // ---------------------------------------------------------------- apoio

    _touch: function (participant, request) {
        participant.setValue('last_seen', new GlideDateTime());
        var version = request.getHeader('X-DevLab-Agent-Version');
        if (version) participant.setValue('agent_version', String(version).substring(0, 40));
        participant.setWorkflow(false);
        participant.update();
    },

    _publishedActivity: function (number) {
        if (!number || !/^LAB\d{4}$/.test(number)) return null;
        var gr = new GlideRecord(DevLabApi.T.activity);
        gr.addQuery('number', number);
        gr.addQuery('state', 'published');
        gr.setLimit(1);
        gr.query();
        return gr.next() ? gr : null;
    },

    _enrollment: function (participantId, activityId, create) {
        var gr = new GlideRecord(DevLabApi.T.enrollment);
        gr.addQuery('participant', participantId);
        gr.addQuery('activity', activityId);
        gr.setLimit(1);
        gr.query();
        if (gr.next()) return gr;
        if (!create) return null;
        gr.initialize();
        gr.setValue('participant', participantId);
        gr.setValue('activity', activityId);
        gr.setValue('state', 'available');
        gr.setValue('score', 0);
        gr.setValue('attempts', 0);
        gr.setValue('hints_used', 0);
        gr.insert();
        return gr;
    },

    _enrollmentsByActivity: function (participantId) {
        var map = {};
        var gr = new GlideRecord(DevLabApi.T.enrollment);
        gr.addQuery('participant', participantId);
        gr.query();
        while (gr.next()) {
            map[gr.getValue('activity')] = {
                state: gr.getValue('state'),
                approved_at: gr.getValue('approved_at') ? this._iso(this._gdt(gr.getValue('approved_at'))) : null,
                completed_at: gr.getValue('completed_at') ? this._iso(this._gdt(gr.getValue('completed_at'))) : null,
                score: parseInt(gr.getValue('score'), 10) || 0,
                attempts: parseInt(gr.getValue('attempts'), 10) || 0,
            };
        }
        return map;
    },

    _checkDefs: function (activityId) {
        var defs = [];
        var gr = new GlideRecord(DevLabApi.T.check);
        gr.addQuery('activity', activityId);
        gr.orderBy('order');
        gr.query();
        while (gr.next()) {
            defs.push({
                sys_id: gr.getUniqueValue(),
                code: gr.getValue('code'),
                points: parseInt(gr.getValue('points'), 10) || 0,
                required: gr.getValue('required') === '1' || gr.getValue('required') === 'true',
            });
        }
        return defs;
    },

    _attemptExists: function (enrollmentId, attempt) {
        var gr = new GlideRecord(DevLabApi.T.result);
        gr.addQuery('enrollment', enrollmentId);
        gr.addQuery('attempt', attempt);
        gr.setLimit(1);
        gr.query();
        return gr.hasNext();
    },

    _storedAttempt: function (en, defs, attempt) {
        var submitted = [];
        var gr = new GlideRecord(DevLabApi.T.result);
        gr.addQuery('enrollment', en.getUniqueValue());
        gr.addQuery('attempt', attempt);
        gr.query();
        var codeBySysId = {};
        for (var i = 0; i < defs.length; i++) codeBySysId[defs[i].sys_id] = defs[i].code;
        while (gr.next()) {
            submitted.push({ check_id: codeBySysId[gr.getValue('check')], passed: gr.getValue('passed') === '1' || gr.getValue('passed') === 'true' });
        }
        var scored = this.rules.scoreAttempt(defs, submitted, 0);
        return {
            number: en.activity.number.toString(),
            attempt: attempt,
            score: scored.score,
            best_score: parseInt(en.getValue('score'), 10) || 0,
            max: scored.max,
            completed: en.getValue('state') === 'completed',
            checks: scored.checks,
            ignored_checks: [],
        };
    },

    /** Custo de dicas (Fase 2). Por enquanto nenhuma dica é registrada. */
    _hintCost: function () {
        return 0;
    },

    _ok: function (body, summary) {
        return { status: 200, body: body, summary: summary };
    },

    _error: function (status, code, message) {
        return { status: status, body: { error: { code: code, message: message } }, summary: code };
    },

    _label: function (route, request) {
        var number = request && request.pathParams && request.pathParams.number;
        var map = {
            ping: 'GET /ping',
            activities: 'GET /activities',
            approve: 'POST /activities/' + number + '/approve',
            results: 'POST /activities/' + number + '/results',
        };
        return map[route] || route;
    },

    _query: function (request, name) {
        var v = request.queryParams[name];
        if (Array.isArray(v)) v = v[0];
        return v ? String(v) : '';
    },

    _body: function (request) {
        try {
            var data = request.body.data;
            return data && typeof data === 'object' ? data : JSON.parse(request.body.dataString);
        } catch (e) {
            return null;
        }
    },

    _gdt: function (value) {
        var g = new GlideDateTime();
        g.setValue(value);
        return g;
    },

    /** GlideDateTime (UTC interno) → "2026-11-01T14:00:00Z". */
    _iso: function (gdt) {
        return String(gdt.getValue()).replace(' ', 'T') + 'Z';
    },

    /** ISO 8601 em UTC ("2026-11-01T14:00:00Z" ou com milissegundos) → GlideDateTime, ou null. */
    _parseIso: function (text) {
        if (!text || typeof text !== 'string') return null;
        var m = /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2})(\.\d+)?Z?$/.exec(text.trim());
        if (!m) return null;
        var g = new GlideDateTime();
        g.setValueUTC(m[1] + ' ' + m[2], 'yyyy-MM-dd HH:mm:ss');
        return g;
    },

    type: 'DevLabApi',
};
