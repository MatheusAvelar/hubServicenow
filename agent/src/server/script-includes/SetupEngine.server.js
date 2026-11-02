/**
 * SetupEngine — interpreta o setup declarativo de uma atividade. Nada de eval: só ações conhecidas.
 *
 * Regras (CLAUDE.md, princípio 5):
 * - só cria DADOS em tabelas da allowlist; nunca metadados (sys_script, sys_db_object, ACL…);
 * - roda só depois de o dev clicar em "Aprovar e instalar";
 * - é idempotente: com `key`, não duplica o registro se ele já existir.
 */
var SetupEngine = Class.create();

/** Precisa bater com ActivityValidator.SETUP_TABLE_ALLOWLIST (Hub) e com os cross-scope privileges de create. */
SetupEngine.TABLE_ALLOWLIST = ['sys_user', 'sys_user_group', 'incident'];

SetupEngine.prototype = {
    initialize: function () {},

    /**
     * @param {Array} steps setup da atividade
     * @returns {{ok:boolean, log:Array<{step:number, ok:boolean, message:string, sys_id?:string}>}}
     */
    run: function (steps) {
        var log = [];
        var ok = true;
        var list = Array.isArray(steps) ? steps : [];
        for (var i = 0; i < list.length; i++) {
            var entry;
            try {
                entry = this._step(list[i]);
            } catch (e) {
                entry = { ok: false, message: 'Erro inesperado: ' + e.message };
            }
            entry.step = i + 1;
            if (!entry.ok) ok = false;
            log.push(entry);
        }
        return { ok: ok, log: log };
    },

    _step: function (step) {
        if (!step || step.action !== 'create_record') {
            return { ok: false, message: 'Ação de setup desconhecida: ' + (step && step.action) };
        }
        if (SetupEngine.TABLE_ALLOWLIST.indexOf(step.table) === -1) {
            return { ok: false, message: 'Tabela fora da allowlist do setup: ' + step.table };
        }
        var values = step.values || {};
        var gr = new GlideRecord(step.table);
        if (!gr.isValid()) return { ok: false, message: 'Tabela inexistente: ' + step.table };

        for (var field in values) {
            if (field.indexOf('sys_') === 0 || !gr.isValidField(field)) {
                return { ok: false, message: 'Campo inválido em ' + step.table + ': ' + field };
            }
        }

        if (Array.isArray(step.key) && step.key.length > 0) {
            var existing = new GlideRecord(step.table);
            for (var k = 0; k < step.key.length; k++) existing.addQuery(step.key[k], values[step.key[k]]);
            existing.setLimit(1);
            existing.query();
            if (existing.next()) {
                return { ok: true, message: 'Já existia em ' + step.table + ' (' + this._label(step, values) + ').', sys_id: existing.getUniqueValue() };
            }
        }

        gr.initialize();
        for (var f in values) gr.setValue(f, this._value(values[f]));
        var sysId = gr.insert();
        if (!sysId) return { ok: false, message: 'Não foi possível criar em ' + step.table + ' (' + this._label(step, values) + ').' };
        return { ok: true, message: 'Criado em ' + step.table + ' (' + this._label(step, values) + ').', sys_id: String(sysId) };
    },

    _value: function (v) {
        if (v === true) return 'true';
        if (v === false) return 'false';
        if (v === null || v === undefined) return '';
        return String(v);
    },

    _label: function (step, values) {
        var keys = Array.isArray(step.key) && step.key.length ? step.key : Object.keys(values).slice(0, 1);
        return keys.map(function (k) { return k + '=' + values[k]; }).join(', ');
    },

    type: 'SetupEngine',
};
