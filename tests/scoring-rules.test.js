'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadScriptInclude } = require('../scripts/load-script-include');

const ScoringRules = loadScriptInclude('hub/src/server/script-includes/ScoringRules.server.js', 'ScoringRules');
const rules = new ScoringRules();
// Objetos criados no sandbox têm outro realm: normaliza antes de comparar.
const plain = (v) => JSON.parse(JSON.stringify(v));

const defs = [
    { code: 'c1', points: 30, required: true },
    { code: 'c2', points: 20, required: true },
    { code: 'c3', points: 50, required: true },
];

test('soma só os checks aprovados, com os pontos do Hub', () => {
    const r = rules.scoreAttempt(defs, [
        { check_id: 'c1', passed: true, points: 999 },
        { check_id: 'c2', passed: false },
        { check_id: 'c3', passed: true },
    ], 0);
    assert.equal(r.score, 80);
    assert.equal(r.max, 100);
    assert.equal(r.completed, false);
    assert.deepEqual(plain(r.checks.map((c) => c.points)), [30, 0, 50]);
});

test('concluída quando todos os obrigatórios passam', () => {
    const optional = [...defs.slice(0, 2), { code: 'c3', points: 50, required: false }];
    const r = rules.scoreAttempt(optional, [{ check_id: 'c1', passed: true }, { check_id: 'c2', passed: true }], 0);
    assert.equal(r.completed, true);
    assert.equal(r.score, 50);
});

test('check não enviado conta como reprovado; ids desconhecidos são ignorados', () => {
    const r = rules.scoreAttempt(defs, [{ check_id: 'c1', passed: true }, { check_id: 'zz', passed: true }], 0);
    assert.equal(r.score, 30);
    assert.deepEqual(plain(r.unknown), ['zz']);
    assert.equal(r.checks[1].sent, false);
});

test('passed precisa ser exatamente true', () => {
    const r = rules.scoreAttempt(defs, [{ check_id: 'c1', passed: 'true' }, { check_id: 'c2', passed: 1 }], 0);
    assert.equal(r.score, 0);
});

test('custo de dica desconta, sem ficar negativo', () => {
    const all = defs.map((d) => ({ check_id: d.code, passed: true }));
    assert.equal(rules.scoreAttempt(defs, all, 10).score, 90);
    assert.equal(rules.scoreAttempt(defs, [], 10).score, 0);
});

test('atividade sem checks nunca é concluída', () => {
    assert.equal(rules.scoreAttempt([], [], 0).completed, false);
});

test('limite de tentativas', () => {
    assert.equal(rules.checkAttempt(1, 5), null);
    assert.equal(rules.checkAttempt(5, 5), null);
    assert.match(rules.checkAttempt(6, 5), /Limite de 5/);
    assert.equal(rules.checkAttempt(50, 0), null);
    assert.ok(rules.checkAttempt(0, 5));
    assert.ok(rules.checkAttempt(1.5, 5));
    assert.ok(rules.checkAttempt('2', 5));
});

test('ranking com empates e desempate', () => {
    const r = rules.rank([
        { name: 'Bia', points: 100, completed: 1, last_scored_at: '2026-11-01 10:00:00' },
        { name: 'Ana', points: 150, completed: 2, last_scored_at: '2026-11-01 12:00:00' },
        { name: 'Caio', points: 100, completed: 1, last_scored_at: '2026-11-01 09:00:00' },
        { name: 'Duda', points: 0, completed: 0 },
    ]);
    assert.deepEqual(plain(r.map((x) => x.name)), ['Ana', 'Caio', 'Bia', 'Duda']);
    assert.deepEqual(plain(r.map((x) => x.position)), [1, 2, 2, 4]);
});

test('iniciais e tempo relativo', () => {
    assert.equal(rules.initials('Ana Paula Souza'), 'AS');
    assert.equal(rules.initials('matheus'), 'M');
    assert.equal(rules.initials(''), '?');
    assert.equal(rules.relativeTime(30 * 1000), 'agora');
    assert.equal(rules.relativeTime(12 * 60000), 'há 12 min');
    assert.equal(rules.relativeTime(5 * 3600000), 'há 5 h');
    assert.equal(rules.relativeTime(26 * 3600000), 'há 1 dia');
    assert.equal(rules.relativeTime(4 * 86400000), 'há 4 dias');
    assert.equal(rules.relativeTime(NaN), 'nunca');
});
