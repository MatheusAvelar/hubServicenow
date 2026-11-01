'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadScriptInclude } = require('../scripts/load-script-include');

const ActivityValidator = loadScriptInclude('hub/src/server/script-includes/ActivityValidator.server.js', 'ActivityValidator');
const validate = (a) => new ActivityValidator().validate(a);
const base = () => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'activities', 'LAB0001.json'), 'utf8'));
const hasError = (r, fragment) => r.errors.some((e) => e.includes(fragment));

test('atividades piloto são válidas', () => {
    for (const f of ['LAB0001.json', 'LAB0002.json']) {
        const text = fs.readFileSync(path.join(__dirname, '..', 'activities', f), 'utf8');
        const r = validate(text);
        assert.equal(r.valid, true, `${f}: ${r.errors.join('; ')}`);
    }
});

test('JSON inválido e não-objeto', () => {
    assert.equal(validate('{ nope').valid, false);
    assert.ok(hasError(validate('{ nope'), 'JSON inválido'));
    assert.equal(validate('[]').valid, false);
    assert.equal(validate(null).valid, false);
});

test('campos obrigatórios e formatos', () => {
    const a = base();
    a.number = 'LAB1';
    a.version = 0;
    a.level = 'expert';
    a.due_date = '2026-02-30';
    a.max_attempts = 0;
    delete a.title;
    const r = validate(a);
    assert.equal(r.valid, false);
    assert.ok(hasError(r, '"number"'));
    assert.ok(hasError(r, '"version"'));
    assert.ok(hasError(r, '"level"'));
    assert.ok(hasError(r, '"due_date"'));
    assert.ok(hasError(r, '"max_attempts"'));
    assert.ok(hasError(r, '"title"'));
});

test('campo desconhecido é rejeitado (pega erro de digitação)', () => {
    const a = base();
    a.max_attemps = 3;
    assert.ok(hasError(validate(a), 'campo desconhecido "max_attemps"'));
});

test('setup só em tabelas da allowlist (nunca metadados)', () => {
    for (const table of ['sys_script', 'sys_db_object', 'sys_security_acl', 'sys_properties']) {
        const a = base();
        a.setup = [{ action: 'create_record', table, values: { name: 'x' } }];
        assert.ok(hasError(validate(a), 'allowlist'), table);
    }
});

test('setup: ação desconhecida, valores e chave', () => {
    const a = base();
    a.setup = [
        { action: 'run_script', table: 'sys_user', values: { user_name: 'a' } },
        { action: 'create_record', table: 'sys_user', values: { sys_id: 'abc', nested: { a: 1 } } },
        { action: 'create_record', table: 'sys_user', values: { user_name: 'a' }, key: ['email'] },
    ];
    const r = validate(a);
    assert.ok(hasError(r, 'ação desconhecida "run_script"'));
    assert.ok(hasError(r, 'campo inválido "sys_id"'));
    assert.ok(hasError(r, 'o valor de "nested"'));
    assert.ok(hasError(r, 'campo-chave "email"'));
});

test('tipo de check desconhecido para o motor é rejeitado', () => {
    const a = base();
    a.checks[0].type = 'atf_passed';
    assert.ok(hasError(validate(a), 'tipo de check desconhecido para o motor "atf_passed"'));
});

test('ids de check repetidos e pontos inválidos', () => {
    const a = base();
    a.checks[1].id = 'c1';
    a.checks[2].points = -5;
    a.checks[2].hint_cost = 80;
    const r = validate(a);
    assert.ok(hasError(r, 'repetido'));
    assert.ok(hasError(r, '"points"'));
});

test('hint_cost maior que points', () => {
    const a = base();
    a.checks[2].hint_cost = 60;
    assert.ok(hasError(validate(a), '"hint_cost" não pode ser maior'));
});

test('params por tipo', () => {
    const a = base();
    a.checks[0].params = { table: 'Incident!', when: 'later', active: 'sim', action: ['merge'] };
    a.checks[1].params = { source_table: 'sys_dictionary', filter: '', text: '' };
    a.checks[2].params = { table: 'incident' };
    const r = validate(a);
    const b = base();
    b.checks[2].params = { table: 'sys_script', query: 'active=true' };
    assert.ok(hasError(validate(b), 'tabelas que o Agent pode ler'));
    assert.ok(hasError(r, 'params.table deve ser um nome de tabela'));
    assert.ok(hasError(r, 'params.when'));
    assert.ok(hasError(r, 'params.active'));
    assert.ok(hasError(r, 'params.action'));
    assert.ok(hasError(r, 'params.source_table'));
    assert.ok(hasError(r, 'params.query'));
});

test('enunciado sem conteúdo ativo', () => {
    const cases = [
        '<p>oi</p><script>alert(1)</script>',
        '<img src=x onerror="alert(1)">',
        '<a href="javascript:alert(1)">x</a>',
        '<p>{{ c.data }}</p>',
        '<iframe src="x"></iframe>',
    ];
    for (const html of cases) {
        const a = base();
        a.description = html;
        assert.equal(validate(a).valid, false, html);
    }
});

test('validateCheck isolado (edição manual no Hub)', () => {
    const v = new ActivityValidator();
    assert.equal(v.validateCheck('record_exists', { table: 'incident', query: 'active=true' }, 'c1').length, 0);
    assert.equal(v.validateCheck('eval_script', {}, 'c1').length, 1);
    assert.ok(v.validateCheck('record_exists', null, 'c1')[0].includes('"params"'));
});
