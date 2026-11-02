/**
 * CheckEngine — executa os checks declarativos de uma atividade na PDI do dev.
 *
 * - Cada tipo é uma função isolada com params validados. Tipo desconhecido = check reprovado.
 * - Erro em um check reprova só aquele check, com mensagem; nunca derruba a validação inteira.
 * - Anti-trapaça: registros/metadados avaliados precisam ter sys_created_on posterior ao approved_at.
 * - Evidência: sys_id + timestamps do que foi encontrado (o Hub guarda o hash).
 * - Sem eval: o motor só lê tabelas com GlideRecord + encoded query.
 */
var CheckEngine = Class.create();

/** Precisa bater com ActivityValidator.RECORD_TABLE_ALLOWLIST (Hub) e com os cross-scope privileges de leitura. */
CheckEngine.RECORD_TABLE_ALLOWLIST = [
    'incident', 'problem', 'change_request', 'sc_req_item', 'sys_user', 'sys_user_group', 'sys_user_grmember',
];
CheckEngine.SCRIPT_SOURCE_TABLES = ['sys_script', 'sys_script_include', 'sys_script_client'];
CheckEngine.MAX_SCAN = 200;

CheckEngine.prototype = {
    initialize: function () {
        this.rules = new AgentRules();
        this.handlers = {
            record_exists: this.recordExists,
            business_rule: this.businessRule,
            script_not_contains: this.scriptNotContains,
        };
    },

    /**
     * @param {Array} checks definição dos checks (do Hub)
     * @param {GlideDateTime} approvedAt momento da aprovação local
     * @returns {Array<{check_id, name, passed, message, evidence, points, max}>}
     */
    run: function (checks, approvedAt) {
        var out = [];
        var list = Array.isArray(checks) ? checks : [];
        for (var i = 0; i < list.length; i++) {
            var check = list[i] || {};
            var r;
            try {
                var handler = this.handlers[check.type];
                if (!handler) {
                    r = this._fail('Tipo de check não suportado por este Agent (' + check.type + '). Atualize o Agent.');
                } else if (!check.params || typeof check.params !== 'object') {
                    r = this._fail('Check sem parâmetros válidos.');
                } else {
                    r = handler.call(this, check.params, approvedAt);
                }
            } catch (e) {
                r = this._fail('Erro ao executar o check: ' + e.message);
            }
            var max = parseInt(check.points, 10) || 0;
            out.push({
                check_id: check.id,
                name: check.name,
                passed: r.passed === true,
                message: r.message,
                evidence: r.evidence || null,
                points: r.passed === true ? max : 0,
                max: max,
            });
        }
        return out;
    },

    // --------------------------------------------------------------- tipos

    /** params: { table, query } */
    recordExists: function (params, approvedAt) {
        if (CheckEngine.RECORD_TABLE_ALLOWLIST.indexOf(params.table) === -1) {
            return this._fail('Tabela não permitida para este check: ' + params.table);
        }
        if (typeof params.query !== 'string' || !params.query) return this._fail('Parâmetro "query" ausente.');
        var gr = new GlideRecord(params.table);
        if (!gr.isValid()) return this._fail('Tabela inexistente: ' + params.table);
        gr.addEncodedQuery(params.query);
        gr.addQuery('sys_created_on', '>', approvedAt);
        gr.orderByDesc('sys_created_on');
        gr.setLimit(1);
        gr.query();
        if (gr.next()) {
            return {
                passed: true,
                message: 'Encontrado ' + this._display(gr) + ' em ' + params.table + '.',
                evidence: this._evidence(gr),
            };
        }
        var older = new GlideRecord(params.table);
        older.addEncodedQuery(params.query);
        older.setLimit(1);
        older.query();
        if (older.next()) {
            return this._fail('Existe registro que atende ao critério, mas foi criado antes da aprovação da atividade. Crie um novo para validar.');
        }
        return this._fail('Nenhum registro de ' + params.table + ' atende ao critério.');
    },

    /** params: { table, when?, active?, action?[], name_contains? } */
    businessRule: function (params, approvedAt) {
        if (typeof params.table !== 'string' || !params.table) return this._fail('Parâmetro "table" ausente.');
        var gr = new GlideRecord('sys_script');
        gr.addQuery('collection', params.table);
        if (params.when) gr.addQuery('when', params.when);
        if (params.active !== undefined) gr.addQuery('active', params.active === true);
        if (Array.isArray(params.action)) {
            for (var i = 0; i < params.action.length; i++) {
                var a = params.action[i];
                if (['insert', 'update', 'delete', 'query'].indexOf(a) !== -1) gr.addQuery('action_' + a, true);
            }
        }
        if (params.name_contains) gr.addQuery('name', 'CONTAINS', params.name_contains);
        gr.addQuery('sys_created_on', '>', approvedAt);
        gr.orderByDesc('sys_created_on');
        gr.setLimit(1);
        gr.query();
        if (gr.next()) {
            return {
                passed: true,
                message: 'Business Rule "' + gr.getValue('name') + '" encontrada (' + gr.getValue('when') + ').',
                evidence: this._evidence(gr),
            };
        }
        var detail = [params.when ? params.when : null, params.active === true ? 'ativa' : null,
            Array.isArray(params.action) ? params.action.join('/') : null].filter(function (x) { return x; }).join(', ');
        return this._fail('Nenhuma Business Rule criada após a aprovação na tabela ' + params.table +
            (detail ? ' (' + detail + ')' : '') + '.');
    },

    /** params: { source_table, filter, text } — só scripts criados após a aprovação (os do dev). */
    scriptNotContains: function (params, approvedAt) {
        if (CheckEngine.SCRIPT_SOURCE_TABLES.indexOf(params.source_table) === -1) {
            return this._fail('Tabela de script não permitida: ' + params.source_table);
        }
        if (!params.text) return this._fail('Parâmetro "text" ausente.');
        var gr = new GlideRecord(params.source_table);
        if (params.filter) gr.addEncodedQuery(params.filter);
        gr.addQuery('sys_created_on', '>', approvedAt);
        gr.orderBy('sys_created_on');
        gr.setLimit(CheckEngine.MAX_SCAN);
        gr.query();
        var scanned = [];
        while (gr.next()) {
            var line = this.rules.findLine(gr.getValue('script'), params.text);
            if (line > 0) {
                var where = this._kind(params.source_table) + ' "' + gr.getValue('name') + '"';
                var hint = params.source_table === 'sys_script' && gr.getValue('when') === 'before'
                    ? ' — remova em BR before.' : ' — remova esse trecho.';
                return {
                    passed: false,
                    message: 'Encontrado ' + params.text + ' na linha ' + line + ' de ' + where + hint,
                    evidence: { sys_id: gr.getUniqueValue(), line: line, sys_created_on: gr.getValue('sys_created_on'), sys_updated_on: gr.getValue('sys_updated_on') },
                };
            }
            scanned.push({ sys_id: gr.getUniqueValue(), sys_updated_on: gr.getValue('sys_updated_on') });
        }
        if (scanned.length === 0) {
            return this._fail('Nenhum script seu (criado após a aprovação) foi encontrado para analisar.');
        }
        return {
            passed: true,
            message: scanned.length + (scanned.length === 1 ? ' script analisado' : ' scripts analisados') + ', sem ' + params.text + '.',
            evidence: { scanned: scanned },
        };
    },

    // --------------------------------------------------------------- apoio

    _fail: function (message) {
        return { passed: false, message: message, evidence: null };
    },

    _evidence: function (gr) {
        return {
            table: gr.getTableName(),
            sys_id: gr.getUniqueValue(),
            sys_created_on: gr.getValue('sys_created_on'),
            sys_updated_on: gr.getValue('sys_updated_on'),
        };
    },

    _display: function (gr) {
        var number = gr.isValidField('number') ? gr.getValue('number') : '';
        return number || gr.getDisplayValue() || gr.getUniqueValue();
    },

    _kind: function (table) {
        return { sys_script: 'Business Rule', sys_script_include: 'Script Include', sys_script_client: 'Client Script' }[table] || table;
    },

    type: 'CheckEngine',
};
