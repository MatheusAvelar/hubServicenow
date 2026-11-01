/**
 * AgentActivityService — regras das atividades na PDI do dev. Os widgets do portal /devlab só chamam
 * este Script Include (lista, detalhe, aprovar e instalar, validar, sincronizar).
 */
var AgentActivityService = Class.create();

AgentActivityService.T_ACTIVITY = 'x_1556735_dlagent_activity';
AgentActivityService.T_RESULT = 'x_1556735_dlagent_check_result';
AgentActivityService.SYNC_EVENT = 'x_1556735_dlagent.sync_now';
AgentActivityService.STATE_LABELS = {
    new: 'Nova',
    approved: 'Em andamento',
    in_progress: 'Em andamento',
    completed: 'Concluída',
    archived: 'Arquivada',
};
AgentActivityService.HUB_DOWN_MESSAGE = 'Hub indisponível no momento — resultado salvo e será enviado automaticamente.';

AgentActivityService.prototype = {
    initialize: function () {
        this.rules = new AgentRules();
    },

    // ------------------------------------------------------------ Hub → local

    /** Cria/atualiza a cópia local de uma atividade vinda do GET /activities. */
    upsertFromHub: function (a) {
        if (!a || !/^LAB\d{4}$/.test(a.number || '')) return false;
        var gr = new GlideRecord(AgentActivityService.T_ACTIVITY);
        var exists = gr.get('number', a.number);
        if (!exists) {
            gr.initialize();
            gr.setValue('number', a.number);
            gr.setValue('state', 'new');
            gr.setValue('attempts', 0);
            gr.setValue('score', 0);
        }
        gr.setValue('version', parseInt(a.version, 10) || 1);
        gr.setValue('track', String(a.track || '').substring(0, 100));
        gr.setValue('title', String(a.title || '').substring(0, 160));
        gr.setValue('level', a.level || 'junior');
        gr.setValue('description', this._sanitize(a.description));
        gr.setValue('due_date', a.due_date || '');
        gr.setValue('max_attempts', parseInt(a.max_attempts, 10) || 0);
        gr.setValue('setup', JSON.stringify(a.setup || []));
        gr.setValue('checks', JSON.stringify(a.checks || []));
        gr.setValue('total_points', parseInt(a.total_points, 10) || 0);
        gr.setValue('hub_state', a.state === 'archived' ? 'archived' : 'published');
        var en = a.enrollment || null;
        if (en && typeof en.score === 'number') gr.setValue('best_score', en.score);
        gr.setValue('state', this.rules.localState(a.state, en ? en.state : null, exists ? gr.getValue('state') : 'new'));
        if (en && en.completed_at && !gr.getValue('completed_at')) gr.setValue('completed_at', this._fromIso(en.completed_at));
        // Agent reinstalado: recupera a aprovação feita antes (o anti-trapaça precisa do approved_at).
        if (en && en.approved_at && !gr.getValue('approved_at')) gr.setValue('approved_at', this._fromIso(en.approved_at));
        if (en && typeof en.attempts === 'number' && en.attempts > (parseInt(gr.getValue('attempts'), 10) || 0)) {
            gr.setValue('attempts', en.attempts);
        }
        var saved = exists ? gr.update() : gr.insert();
        if (!saved) throw new Error('a plataforma recusou gravar a atividade ' + a.number + '.');
        return true;
    },

    /** Aplica a resposta do Hub a uma mensagem do outbox enviada com sucesso. */
    applyHubResponse: function (kind, activityId, json) {
        if (!json) return;
        if (json.score_summary) new AgentConfig().set('score_cache', JSON.stringify(json.score_summary));
        if (kind !== 'results' || !activityId) return;
        var gr = new GlideRecord(AgentActivityService.T_ACTIVITY);
        if (!gr.get(activityId)) return;
        if (typeof json.best_score === 'number') gr.setValue('best_score', json.best_score);
        if (json.completed === true && gr.getValue('state') !== 'completed') {
            gr.setValue('state', 'completed');
            if (!gr.getValue('completed_at')) gr.setValue('completed_at', new GlideDateTime());
        }
        gr.update();
    },

    // ------------------------------------------------------------ ações do dev

    /** "Aprovar e instalar": aprova, roda o setup declarativo e enfileira o approve para o Hub. */
    approveAndInstall: function (number) {
        var gr = this._get(number);
        if (!gr) return { ok: false, message: 'Atividade não encontrada.' };
        if (gr.getValue('hub_state') === 'archived') return { ok: false, message: 'Atividade arquivada no Hub.' };
        if (gr.getValue('state') !== 'new') return { ok: false, message: 'Esta atividade já foi aprovada.' };

        var approvedAt = new GlideDateTime();
        var setup = new SetupEngine().run(this._parse(gr.getValue('setup'), []));
        gr.setValue('approved_at', approvedAt);
        gr.setValue('setup_log', JSON.stringify(setup.log));
        gr.setValue('state', 'approved');
        gr.update();

        new OutboxService().enqueue('approve', '/activities/' + number + '/approve',
            { approved_at: this._iso(approvedAt) }, gr.getUniqueValue(), 'approve:' + number);
        this.requestSync();

        if (!setup.ok) {
            return { ok: true, warning: true, message: 'Atividade aprovada, mas parte do setup falhou. Veja os detalhes no enunciado.', setup: setup.log };
        }
        return { ok: true, message: 'Atividade aprovada e instalada. Bom trabalho!', setup: setup.log };
    },

    /** "Validar": roda os checks localmente, guarda o resultado e enfileira o envio ao Hub. */
    validate: function (number) {
        var gr = this._get(number);
        if (!gr) return { ok: false, message: 'Atividade não encontrada.' };
        if (gr.getValue('state') === 'new') return { ok: false, message: 'Aprove e instale a atividade antes de validar.' };
        if (gr.getValue('hub_state') === 'archived') return { ok: false, message: 'Atividade arquivada no Hub.' };
        var attempts = parseInt(gr.getValue('attempts'), 10) || 0;
        var max = parseInt(gr.getValue('max_attempts'), 10) || 0;
        if (max > 0 && attempts >= max) return { ok: false, message: 'Você já usou as ' + max + ' tentativas desta atividade.' };

        if (!gr.getValue('approved_at')) return { ok: false, message: 'Data de aprovação ausente. Use "Sincronizar agora" e tente de novo.' };
        var approvedAt = this._gdt(gr.getValue('approved_at'));
        var checks = this._parse(gr.getValue('checks'), []);
        var results = new CheckEngine().run(checks, approvedAt);
        var attempt = attempts + 1;
        var validatedAt = new GlideDateTime();
        var score = 0;
        var requiredOk = checks.length > 0;
        for (var i = 0; i < results.length; i++) {
            var r = results[i];
            score += r.points;
            if (checks[i].required !== false && !r.passed) requiredOk = false;
            var row = new GlideRecord(AgentActivityService.T_RESULT);
            row.initialize();
            row.setValue('activity', gr.getUniqueValue());
            row.setValue('attempt', attempt);
            row.setValue('check_id', r.check_id);
            row.setValue('name', String(r.name || '').substring(0, 160));
            row.setValue('passed', r.passed);
            row.setValue('points', r.points);
            row.setValue('max_points', r.max);
            row.setValue('message', String(r.message || '').substring(0, 1000));
            row.setValue('evidence', r.evidence ? JSON.stringify(r.evidence).substring(0, 8000) : '');
            row.setValue('validated_at', validatedAt);
            row.insert();
        }
        gr.setValue('attempts', attempt);
        gr.setValue('score', score);
        if (requiredOk) {
            gr.setValue('state', 'completed');
            if (!gr.getValue('completed_at')) gr.setValue('completed_at', validatedAt);
        } else if (gr.getValue('state') !== 'completed') {
            gr.setValue('state', 'in_progress');
        }
        gr.update();

        new OutboxService().enqueue('results', '/activities/' + number + '/results', {
            activity_version: parseInt(gr.getValue('version'), 10) || 1,
            attempt: attempt,
            validated_at: this._iso(validatedAt),
            checks: results.map(function (x) {
                return { check_id: x.check_id, passed: x.passed, evidence: x.evidence, message: x.message };
            }),
        }, gr.getUniqueValue(), 'results:' + number + ':' + attempt);
        this.requestSync();

        var total = parseInt(gr.getValue('total_points'), 10) || this._sumMax(results);
        return {
            ok: true,
            message: 'Validação ' + attempt + ' concluída: ' + score + ' de ' + total + ' pts. Resultado salvo; envio ao Hub em andamento.',
        };
    },

    /** "Sincronizar agora": dispara pull + flush em segundo plano (o portal não espera o Hub). */
    requestSync: function () {
        gs.eventQueue(AgentActivityService.SYNC_EVENT, null, '', '');
        return { ok: true, message: 'Sincronização solicitada. O status atualiza em instantes.' };
    },

    // ------------------------------------------------------------ dados do portal

    /** Status do header + card de pontuação. */
    getStatus: function () {
        var config = new AgentConfig();
        var outbox = new OutboxService();
        var pending = outbox.pendingCount();
        var lastSync = config.lastSync();
        var minutes = null;
        if (lastSync) minutes = (new GlideDateTime().getNumericValue() - this._gdt(lastSync).getNumericValue()) / 60000;
        var hubDown = false;
        var lastError = '';
        var ob = new GlideRecord(OutboxService.TABLE);
        ob.addQuery('status', 'pending');
        ob.addQuery('attempts', '>', 0);
        ob.orderByDesc('sys_updated_on');
        ob.setLimit(1);
        ob.query();
        if (ob.next()) {
            hubDown = true;
            lastError = ob.getValue('last_error') || '';
        }
        var counts = this._counts();
        var score = config.scoreCache() || {};
        return {
            configured: config.isConfigured(),
            missing: config.missing(),
            sync_label: this.rules.syncLabel(minutes, pending),
            pending: pending,
            hub_down: hubDown,
            hub_down_message: hubDown ? AgentActivityService.HUB_DOWN_MESSAGE : '',
            last_error: lastError,
            score: {
                points: typeof score.points === 'number' ? score.points : counts.localPoints,
                rank: typeof score.rank === 'number' ? score.rank : null,
                participants: score.participants || null,
                completed: counts.completed,
                total: counts.total,
                from_hub: typeof score.points === 'number',
            },
        };
    },

    /** Cards da lista (sem as arquivadas). */
    list: function () {
        var out = [];
        var gr = new GlideRecord(AgentActivityService.T_ACTIVITY);
        gr.addQuery('hub_state', '!=', 'archived');
        gr.orderBy('number');
        gr.setLimit(200);
        gr.query();
        while (gr.next()) out.push(this._card(gr));
        return out;
    },

    /** Detalhe da atividade com os critérios da última tentativa. */
    detail: function (number) {
        var gr = this._get(number);
        if (!gr) return null;
        var card = this._card(gr);
        var checks = this._parse(gr.getValue('checks'), []);
        var attempt = parseInt(gr.getValue('attempts'), 10) || 0;
        var last = {};
        if (attempt > 0) {
            var r = new GlideRecord(AgentActivityService.T_RESULT);
            r.addQuery('activity', gr.getUniqueValue());
            r.addQuery('attempt', attempt);
            r.query();
            while (r.next()) {
                last[r.getValue('check_id')] = {
                    passed: r.getValue('passed') === '1' || r.getValue('passed') === 'true',
                    message: r.getValue('message'),
                    points: parseInt(r.getValue('points'), 10) || 0,
                };
            }
        }
        card.description = gr.getValue('description') || '';
        card.approved_label = gr.getValue('approved_at') ? this._dateLabel(gr.getValue('approved_at')) : '';
        card.setup_log = this._parse(gr.getValue('setup_log'), []);
        // O que o "Aprovar e instalar" vai criar (o dev vê antes de aprovar).
        card.setup_preview = this._parse(gr.getValue('setup'), []).map(function (s) {
            var values = s.values || {};
            var keys = Array.isArray(s.key) && s.key.length ? s.key : Object.keys(values).slice(0, 1);
            return s.table + ' (' + keys.map(function (k) { return k + '=' + values[k]; }).join(', ') + ')';
        });
        card.criteria = checks.map(function (c) {
            var res = last[c.id];
            return {
                id: c.id,
                name: c.name,
                status: res ? (res.passed ? 'pass' : 'fail') : 'none',
                message: res ? res.message : '',
                points: res ? res.points : 0,
                max: parseInt(c.points, 10) || 0,
            };
        });
        return card;
    },

    // ------------------------------------------------------------ apoio

    _card: function (gr) {
        var state = gr.getValue('state');
        var total = parseInt(gr.getValue('total_points'), 10) || 0;
        var score = parseInt(gr.getValue('score'), 10) || 0;
        var best = parseInt(gr.getValue('best_score'), 10);
        return {
            number: gr.getValue('number'),
            track: gr.getValue('track'),
            title: gr.getValue('title'),
            level: gr.getDisplayValue('level'),
            state: state,
            state_label: AgentActivityService.STATE_LABELS[state] || state,
            due_label: gr.getValue('due_date') ? gr.getDisplayValue('due_date') : '',
            attempts: parseInt(gr.getValue('attempts'), 10) || 0,
            max_attempts: parseInt(gr.getValue('max_attempts'), 10) || 0,
            score: isNaN(best) ? score : Math.max(best, score),
            last_score: score,
            total_points: total,
            progress: total > 0 ? Math.round((Math.max(isNaN(best) ? 0 : best, score) / total) * 100) : 0,
            completed_label: gr.getValue('completed_at') ? this._dateLabel(gr.getValue('completed_at')) : '',
        };
    },

    _counts: function () {
        var out = { total: 0, completed: 0, localPoints: 0 };
        var gr = new GlideRecord(AgentActivityService.T_ACTIVITY);
        gr.addQuery('hub_state', '!=', 'archived');
        gr.query();
        while (gr.next()) {
            out.total++;
            if (gr.getValue('state') === 'completed') out.completed++;
            out.localPoints += Math.max(parseInt(gr.getValue('best_score'), 10) || 0, parseInt(gr.getValue('score'), 10) || 0);
        }
        return out;
    },

    _get: function (number) {
        if (!number || !/^LAB\d{4}$/.test(String(number))) return null;
        var gr = new GlideRecord(AgentActivityService.T_ACTIVITY);
        return gr.get('number', String(number)) ? gr : null;
    },

    _sumMax: function (results) {
        var s = 0;
        for (var i = 0; i < results.length; i++) s += results[i].max;
        return s;
    },

    /** Defesa extra (o Hub já rejeita conteúdo ativo; o portal ainda usa $sanitize). */
    _sanitize: function (html) {
        return String(html || '')
            .replace(/<\s*(script|style|iframe|object|embed|form)[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
            .replace(/<\s*(script|style|iframe|object|embed|form|input|button|link|meta|base)\b[^>]*>/gi, '')
            .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
            .replace(/javascript\s*:/gi, '')
            .replace(/\{\{/g, '{ {');
    },

    _parse: function (text, fallback) {
        if (!text) return fallback;
        try {
            return JSON.parse(text);
        } catch (e) {
            return fallback;
        }
    },

    _gdt: function (value) {
        var g = new GlideDateTime();
        if (value) g.setValue(value);
        return g;
    },

    _iso: function (gdt) {
        return String(gdt.getValue()).replace(' ', 'T') + 'Z';
    },

    _fromIso: function (text) {
        var m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/.exec(String(text || ''));
        var g = new GlideDateTime();
        if (m) g.setValueUTC(m[1] + ' ' + m[2], 'yyyy-MM-dd HH:mm:ss');
        return g;
    },

    /** Data no formato do usuário (DD/MM/AAAA no perfil pt-BR). */
    _dateLabel: function (value) {
        return this._gdt(value).getLocalDate().getDisplayValue();
    },

    type: 'AgentActivityService',
};
