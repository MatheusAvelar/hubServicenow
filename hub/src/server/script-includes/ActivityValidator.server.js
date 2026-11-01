/**
 * ActivityValidator — validação pura (sem Glide) do JSON de uma atividade.
 *
 * Mesmas regras de schemas/activity.schema.json. Usado pelo ActivityImportService (Hub)
 * e pelo scripts/validate-activity.js (Node), que carrega este arquivo num sandbox.
 * Não usa nenhuma API do ServiceNow: pode ser testado localmente com `npm test`.
 *
 * Retorno de validate(): { valid: boolean, errors: string[] } — mensagens em português.
 */
var ActivityValidator = Class.create();

/** Tabelas onde o setup pode criar registros. Precisa bater com os cross-scope privileges do Agent. */
ActivityValidator.SETUP_TABLE_ALLOWLIST = ['sys_user', 'sys_user_group', 'incident'];

/** Ações de setup conhecidas pelo SetupEngine do Agent. */
ActivityValidator.SETUP_ACTIONS = ['create_record'];

/** Tipos de check que o CheckEngine do Agent sabe executar nesta versão. */
ActivityValidator.SUPPORTED_CHECK_TYPES = ['record_exists', 'business_rule', 'script_not_contains'];

/** Tabelas de script que os checks script_* podem inspecionar. */
ActivityValidator.SCRIPT_SOURCE_TABLES = ['sys_script', 'sys_script_include', 'sys_script_client'];

ActivityValidator.LEVELS = ['junior', 'pleno', 'senior'];

ActivityValidator.TOP_LEVEL_KEYS = [
    'number', 'version', 'track', 'title', 'level', 'description',
    'due_date', 'max_attempts', 'setup', 'checks',
];

ActivityValidator.CHECK_KEYS = ['id', 'name', 'type', 'params', 'points', 'required', 'hint', 'hint_cost'];

ActivityValidator.prototype = {
    initialize: function () {},

    /**
     * @param {object|string} input JSON da atividade (objeto ou texto)
     * @returns {{valid: boolean, errors: string[], activity: object|null}}
     */
    validate: function (input) {
        var errors = [];
        var activity = input;

        if (typeof input === 'string') {
            try {
                activity = JSON.parse(input);
            } catch (e) {
                return { valid: false, errors: ['JSON inválido: ' + e.message], activity: null };
            }
        }
        if (!this._isPlainObject(activity)) {
            return { valid: false, errors: ['A atividade precisa ser um objeto JSON.'], activity: null };
        }

        this._unknownKeys(activity, ActivityValidator.TOP_LEVEL_KEYS, 'atividade', errors);

        if (typeof activity.number !== 'string' || !/^LAB\d{4}$/.test(activity.number)) {
            errors.push('"number" deve seguir o formato LAB0001.');
        }
        if (!this._isInt(activity.version) || activity.version < 1) {
            errors.push('"version" deve ser um inteiro maior ou igual a 1.');
        }
        this._requiredText(activity.track, 'track', 100, errors);
        this._requiredText(activity.title, 'title', 160, errors);
        if (ActivityValidator.LEVELS.indexOf(activity.level) === -1) {
            errors.push('"level" deve ser junior, pleno ou senior.');
        }
        this._validateDescription(activity.description, errors);

        if (activity.due_date !== undefined && activity.due_date !== null) {
            if (typeof activity.due_date !== 'string' || !this._isIsoDate(activity.due_date)) {
                errors.push('"due_date" deve ser uma data válida no formato AAAA-MM-DD.');
            }
        }
        if (activity.max_attempts !== undefined && (!this._isInt(activity.max_attempts) || activity.max_attempts < 1)) {
            errors.push('"max_attempts" deve ser um inteiro maior ou igual a 1.');
        }

        this._validateSetup(activity.setup, errors);
        this._validateChecks(activity.checks, errors);

        return { valid: errors.length === 0, errors: errors, activity: errors.length === 0 ? activity : null };
    },

    /**
     * Valida tipo + params de um check isolado (usado na edição manual de checks no Hub).
     * @returns {string[]} erros (vazio se ok)
     */
    validateCheck: function (type, params, label) {
        var errors = [];
        if (ActivityValidator.SUPPORTED_CHECK_TYPES.indexOf(type) === -1) {
            errors.push(label + ': tipo de check desconhecido para o motor "' + type + '".');
        } else {
            this._validateCheckParams(type, params, label, errors);
        }
        return errors;
    },

    _validateDescription: function (html, errors) {
        if (typeof html !== 'string' || html.trim() === '') {
            errors.push('"description" é obrigatório (HTML).');
            return;
        }
        // Enunciado é exibido no portal do dev: rejeita (em vez de tentar limpar) qualquer conteúdo ativo.
        var forbidden = [
            { re: /<\s*script/i, msg: '<script>' },
            { re: /<\s*(iframe|object|embed|form|input|button|style|link|meta|base)\b/i, msg: 'tags interativas ou de estilo' },
            { re: /\son[a-z]+\s*=/i, msg: 'atributos de evento (onclick, onerror…)' },
            { re: /javascript\s*:/i, msg: 'URLs javascript:' },
            { re: /\{\{/, msg: 'expressões AngularJS ({{ }})' },
        ];
        for (var i = 0; i < forbidden.length; i++) {
            if (forbidden[i].re.test(html)) {
                errors.push('"description" não pode conter ' + forbidden[i].msg + '.');
            }
        }
    },

    _validateSetup: function (setup, errors) {
        if (setup === undefined) return;
        if (!Array.isArray(setup)) {
            errors.push('"setup" deve ser uma lista.');
            return;
        }
        for (var i = 0; i < setup.length; i++) {
            var step = setup[i];
            var where = 'setup[' + i + ']';
            if (!this._isPlainObject(step)) {
                errors.push(where + ' deve ser um objeto.');
                continue;
            }
            this._unknownKeys(step, ['action', 'table', 'values', 'key'], where, errors);
            if (ActivityValidator.SETUP_ACTIONS.indexOf(step.action) === -1) {
                errors.push(where + ': ação desconhecida "' + step.action + '".');
            }
            if (ActivityValidator.SETUP_TABLE_ALLOWLIST.indexOf(step.table) === -1) {
                errors.push(where + ': a tabela "' + step.table + '" não está na allowlist do setup (' +
                    ActivityValidator.SETUP_TABLE_ALLOWLIST.join(', ') + ').');
            }
            if (!this._isPlainObject(step.values) || Object.keys(step.values).length === 0) {
                errors.push(where + ': "values" deve ser um objeto com pelo menos um campo.');
            } else {
                for (var field in step.values) {
                    if (!/^[a-z][a-z0-9_]*$/.test(field) || field.indexOf('sys_') === 0) {
                        errors.push(where + ': campo inválido "' + field + '".');
                    }
                    var v = step.values[field];
                    if (v !== null && typeof v === 'object') {
                        errors.push(where + ': o valor de "' + field + '" deve ser texto, número ou booleano.');
                    }
                }
            }
            if (step.key !== undefined) {
                if (!Array.isArray(step.key) || step.key.length === 0) {
                    errors.push(where + ': "key" deve ser uma lista de campos.');
                } else if (this._isPlainObject(step.values)) {
                    for (var k = 0; k < step.key.length; k++) {
                        if (!Object.prototype.hasOwnProperty.call(step.values, step.key[k])) {
                            errors.push(where + ': o campo-chave "' + step.key[k] + '" não está em "values".');
                        }
                    }
                }
            }
        }
    },

    _validateChecks: function (checks, errors) {
        if (!Array.isArray(checks) || checks.length === 0) {
            errors.push('"checks" deve ter pelo menos um check.');
            return;
        }
        var seen = {};
        for (var i = 0; i < checks.length; i++) {
            var check = checks[i];
            var where = 'checks[' + i + ']';
            if (!this._isPlainObject(check)) {
                errors.push(where + ' deve ser um objeto.');
                continue;
            }
            this._unknownKeys(check, ActivityValidator.CHECK_KEYS, where, errors);
            if (typeof check.id !== 'string' || !/^[a-z][a-z0-9_]{0,19}$/.test(check.id)) {
                errors.push(where + ': "id" deve ser curto, minúsculo e sem espaços (ex.: c1).');
            } else if (seen[check.id]) {
                errors.push(where + ': id "' + check.id + '" repetido.');
            } else {
                seen[check.id] = true;
                where = 'check ' + check.id;
            }
            this._requiredText(check.name, where + ': name', 160, errors);
            if (ActivityValidator.SUPPORTED_CHECK_TYPES.indexOf(check.type) === -1) {
                errors.push(where + ': tipo de check desconhecido para o motor "' + check.type + '".');
            } else {
                this._validateCheckParams(check.type, check.params, where, errors);
            }
            if (!this._isInt(check.points) || check.points < 0) {
                errors.push(where + ': "points" deve ser um inteiro maior ou igual a 0.');
            }
            if (check.required !== undefined && typeof check.required !== 'boolean') {
                errors.push(where + ': "required" deve ser true ou false.');
            }
            if (check.hint !== undefined && typeof check.hint !== 'string') {
                errors.push(where + ': "hint" deve ser texto.');
            }
            if (check.hint_cost !== undefined) {
                if (!this._isInt(check.hint_cost) || check.hint_cost < 0) {
                    errors.push(where + ': "hint_cost" deve ser um inteiro maior ou igual a 0.');
                } else if (this._isInt(check.points) && check.hint_cost > check.points) {
                    errors.push(where + ': "hint_cost" não pode ser maior que "points".');
                }
            }
        }
    },

    _validateCheckParams: function (type, params, where, errors) {
        if (!this._isPlainObject(params)) {
            errors.push(where + ': "params" deve ser um objeto.');
            return;
        }
        if (type === 'record_exists') {
            this._unknownKeys(params, ['table', 'query'], where + ' params', errors);
            this._tableName(params.table, where + ': params.table', errors);
            this._requiredText(params.query, where + ': params.query', 4000, errors);
        } else if (type === 'business_rule') {
            this._unknownKeys(params, ['table', 'when', 'active', 'action', 'name_contains'], where + ' params', errors);
            this._tableName(params.table, where + ': params.table', errors);
            if (params.when !== undefined && ['before', 'after', 'async', 'display'].indexOf(params.when) === -1) {
                errors.push(where + ': params.when deve ser before, after, async ou display.');
            }
            if (params.active !== undefined && typeof params.active !== 'boolean') {
                errors.push(where + ': params.active deve ser true ou false.');
            }
            if (params.action !== undefined) {
                var actions = ['insert', 'update', 'delete', 'query'];
                if (!Array.isArray(params.action) || params.action.length === 0 ||
                    params.action.some(function (a) { return actions.indexOf(a) === -1; })) {
                    errors.push(where + ': params.action deve ser uma lista com insert, update, delete ou query.');
                }
            }
            if (params.name_contains !== undefined && typeof params.name_contains !== 'string') {
                errors.push(where + ': params.name_contains deve ser texto.');
            }
        } else if (type === 'script_not_contains') {
            this._unknownKeys(params, ['source_table', 'filter', 'text'], where + ' params', errors);
            if (ActivityValidator.SCRIPT_SOURCE_TABLES.indexOf(params.source_table) === -1) {
                errors.push(where + ': params.source_table deve ser ' + ActivityValidator.SCRIPT_SOURCE_TABLES.join(', ') + '.');
            }
            this._requiredText(params.filter, where + ': params.filter', 4000, errors);
            this._requiredText(params.text, where + ': params.text', 500, errors);
        }
    },

    _tableName: function (value, label, errors) {
        if (typeof value !== 'string' || !/^[a-z][a-z0-9_]{0,79}$/.test(value)) {
            errors.push(label + ' deve ser um nome de tabela válido.');
        }
    },

    _requiredText: function (value, label, max, errors) {
        if (typeof value !== 'string' || value.trim() === '') {
            errors.push('"' + label + '" é obrigatório.');
        } else if (value.length > max) {
            errors.push('"' + label + '" passa do limite de ' + max + ' caracteres.');
        }
    },

    _unknownKeys: function (obj, allowed, where, errors) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && allowed.indexOf(key) === -1) {
                errors.push(where + ': campo desconhecido "' + key + '".');
            }
        }
    },

    _isIsoDate: function (s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
        if (!m) return false;
        var y = +m[1], mo = +m[2], d = +m[3];
        if (mo < 1 || mo > 12 || d < 1) return false;
        var days = [31, (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return d <= days[mo - 1];
    },

    _isInt: function (n) {
        return typeof n === 'number' && isFinite(n) && Math.floor(n) === n;
    },

    _isPlainObject: function (o) {
        return o !== null && typeof o === 'object' && !Array.isArray(o);
    },

    type: 'ActivityValidator',
};
