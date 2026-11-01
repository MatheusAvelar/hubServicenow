/**
 * ActivityImportService — importa, valida e publica atividades no Hub.
 *
 * - importJson(texto): valida com o ActivityValidator, cria ou atualiza a activity e os checks.
 *   Se a atividade já existir, incrementa `version`. A atividade importada fica em draft.
 * - publish(activityGr): monta o JSON a partir dos registros, valida de novo e publica.
 * - toJson(activityGr): formato entregue ao Agent (GET /activities).
 */
var ActivityImportService = Class.create();

ActivityImportService.T_ACTIVITY = 'x_1556735_dlhub_activity';
ActivityImportService.T_CHECK = 'x_1556735_dlhub_check';
ActivityImportService.T_TRACK = 'x_1556735_dlhub_track';

ActivityImportService.prototype = {
    initialize: function () {
        this.validator = new ActivityValidator();
    },

    /**
     * @param {string} text JSON da atividade
     * @returns {{ok:boolean, errors:string[], number?:string, version?:number, created?:boolean, sys_id?:string}}
     */
    importJson: function (text) {
        var result = this.validator.validate(String(text || ''));
        if (!result.valid) return { ok: false, errors: result.errors };
        var a = result.activity;

        var gr = new GlideRecord(ActivityImportService.T_ACTIVITY);
        var exists = gr.get('number', a.number);
        var version = a.version;
        if (exists) {
            version = Math.max(a.version, (parseInt(gr.getValue('version'), 10) || 0) + 1);
        } else {
            gr.initialize();
            gr.setValue('number', a.number);
            gr.setValue('state', 'draft');
        }
        gr.setValue('title', a.title);
        gr.setValue('track', this._trackId(a.track));
        gr.setValue('level', a.level);
        gr.setValue('description', a.description);
        gr.setValue('due_date', a.due_date || '');
        gr.setValue('max_attempts', a.max_attempts || 0);
        gr.setValue('version', version);
        gr.setValue('setup', JSON.stringify(a.setup || []));
        var sysId = exists ? gr.update() : gr.insert();
        if (!sysId) return { ok: false, errors: ['Não foi possível gravar a atividade ' + a.number + '.'] };

        this._syncChecks(sysId, a.checks);
        this.recalcTotal(sysId);
        return { ok: true, errors: [], number: a.number, version: version, created: !exists, sys_id: String(sysId) };
    },

    /**
     * Valida a atividade como está no banco e muda o state para published.
     * @returns {{ok:boolean, errors:string[]}}
     */
    publish: function (activityGr) {
        var json = this.toJson(activityGr, true);
        var result = this.validator.validate(json);
        if (!result.valid) return { ok: false, errors: result.errors };
        activityGr.setValue('state', 'published');
        activityGr.setValue('published_on', new GlideDateTime());
        activityGr.update();
        return { ok: true, errors: [] };
    },

    /** Soma os pontos dos checks e grava em total_points. */
    recalcTotal: function (activityId) {
        var total = 0;
        var c = new GlideRecord(ActivityImportService.T_CHECK);
        c.addQuery('activity', activityId);
        c.query();
        while (c.next()) total += parseInt(c.getValue('points'), 10) || 0;
        var a = new GlideRecord(ActivityImportService.T_ACTIVITY);
        if (a.get(activityId) && parseInt(a.getValue('total_points'), 10) !== total) {
            a.setValue('total_points', total);
            a.setWorkflow(false);
            a.update();
        }
        return total;
    },

    /**
     * JSON da atividade no formato de activities/*.json.
     * @param {boolean} forValidation true = só os campos do schema (para revalidar no publish)
     */
    toJson: function (activityGr, forValidation) {
        var out = {
            number: activityGr.getValue('number'),
            version: parseInt(activityGr.getValue('version'), 10) || 1,
            track: activityGr.track.getDisplayValue() || '',
            title: activityGr.getValue('title') || '',
            level: activityGr.getValue('level'),
            description: activityGr.getValue('description') || '',
            setup: this._parse(activityGr.getValue('setup'), []),
            checks: [],
        };
        if (activityGr.getValue('due_date')) out.due_date = activityGr.getValue('due_date');
        var max = parseInt(activityGr.getValue('max_attempts'), 10) || 0;
        if (max > 0) out.max_attempts = max;

        var c = new GlideRecord(ActivityImportService.T_CHECK);
        c.addQuery('activity', activityGr.getUniqueValue());
        c.orderBy('order');
        c.query();
        while (c.next()) {
            var check = {
                id: c.getValue('code'),
                name: c.getValue('name'),
                type: c.getValue('type'),
                params: this._parse(c.getValue('params'), {}),
                points: parseInt(c.getValue('points'), 10) || 0,
                required: c.getValue('required') === '1' || c.getValue('required') === 'true',
            };
            if (c.getValue('hint')) check.hint = c.getValue('hint');
            var cost = parseInt(c.getValue('hint_cost'), 10) || 0;
            if (cost > 0) check.hint_cost = cost;
            out.checks.push(check);
        }
        if (!forValidation) {
            out.state = activityGr.getValue('state');
            out.total_points = parseInt(activityGr.getValue('total_points'), 10) || 0;
            out.updated_at = activityGr.getValue('sys_updated_on');
        }
        return out;
    },

    _syncChecks: function (activityId, checks) {
        var keep = {};
        for (var i = 0; i < checks.length; i++) {
            var def = checks[i];
            keep[def.id] = true;
            var c = new GlideRecord(ActivityImportService.T_CHECK);
            c.addQuery('activity', activityId);
            c.addQuery('code', def.id);
            c.query();
            var exists = c.next();
            if (!exists) {
                c.initialize();
                c.setValue('activity', activityId);
                c.setValue('code', def.id);
            }
            c.setValue('order', (i + 1) * 100);
            c.setValue('name', def.name);
            c.setValue('type', def.type);
            c.setValue('params', JSON.stringify(def.params || {}));
            c.setValue('points', def.points);
            c.setValue('required', def.required !== false);
            c.setValue('hint', def.hint || '');
            c.setValue('hint_cost', def.hint_cost || 0);
            c.setWorkflow(false);
            if (exists) c.update(); else c.insert();
        }
        // Checks que saíram do JSON: remove só se ainda não têm resultados; senão desativa pelo order negativo.
        var old = new GlideRecord(ActivityImportService.T_CHECK);
        old.addQuery('activity', activityId);
        old.query();
        while (old.next()) {
            if (keep[old.getValue('code')]) continue;
            var res = new GlideAggregate('x_1556735_dlhub_result');
            res.addQuery('check', old.getUniqueValue());
            res.addAggregate('COUNT');
            res.query();
            var used = res.next() && parseInt(res.getAggregate('COUNT'), 10) > 0;
            if (used) {
                gs.warn('[Dev Lab] Check ' + old.getValue('code') + ' saiu do JSON mas tem resultados; mantido com 0 pontos.');
                old.setValue('points', 0);
                old.setValue('required', false);
                old.setWorkflow(false);
                old.update();
            } else {
                old.deleteRecord();
            }
        }
    },

    _trackId: function (name) {
        var t = new GlideRecord(ActivityImportService.T_TRACK);
        if (t.get('name', name)) return t.getUniqueValue();
        t.initialize();
        t.setValue('name', name);
        t.setValue('active', true);
        return String(t.insert());
    },

    _parse: function (text, fallback) {
        if (!text) return fallback;
        try {
            return JSON.parse(text);
        } catch (e) {
            return fallback;
        }
    },

    type: 'ActivityImportService',
};
