'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadScriptInclude } = require('../scripts/load-script-include');

const AgentRules = loadScriptInclude('agent/src/server/script-includes/AgentRules.server.js', 'AgentRules');
const rules = new AgentRules();

test('Hub respondendo JSON 2xx', () => {
    const r = rules.classify(200, 'application/json;charset=UTF-8', '{"ok":true}');
    assert.equal(r.kind, 'ok');
    assert.equal(r.json.ok, true);
});

test('Hub hibernando (HTML) é transitório', () => {
    const html = '<!DOCTYPE html><html><body>Your instance is hibernating</body></html>';
    assert.equal(rules.classify(200, 'text/html', html).kind, 'transient');
    assert.equal(rules.classify(302, 'text/html', '').kind, 'transient');
    assert.equal(rules.classify(0, '', '').kind, 'transient');
    assert.match(rules.classify(200, 'text/html', html).message, /hibernando/);
});

test('5xx e 429 são transitórios; 401 também (token trocado)', () => {
    assert.equal(rules.classify(503, 'application/json', '{"error":{"message":"x"}}').kind, 'transient');
    assert.equal(rules.classify(429, 'application/json', '{"error":{}}').kind, 'transient');
    assert.equal(rules.classify(401, 'application/json', '{"error":{"code":"invalid_token"}}').kind, 'transient');
});

test('4xx com JSON é definitivo', () => {
    const r = rules.classify(409, 'application/json', '{"error":{"code":"not_approved","message":"A atividade ainda não foi aprovada"}}');
    assert.equal(r.kind, 'permanent');
    assert.match(r.message, /ainda não foi aprovada/);
});

test('backoff exponencial até 12 h', () => {
    assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 20].map((n) => rules.backoffMinutes(n)), [15, 30, 60, 120, 240, 480, 720, 720, 720]);
    assert.equal(rules.backoffMinutes(0), 15);
});

test('localiza o texto proibido pela linha', () => {
    const script = [
        '(function executeRule(current, previous) {',
        '    if (current.caller_id.vip) {',
        '        current.impact = 1;',
        '        current.urgency = 1;',
        '    }',
        '    current.update();',
        '})(current, previous);',
    ].join('\n');
    assert.equal(rules.findLine(script, 'current.update()'), 6);
    assert.equal(rules.findLine(script.replace('current.update()', 'current.update ( )'), 'current.update()'), 6);
    assert.equal(rules.findLine(script.replace('    current.update();\n', ''), 'current.update()'), 0);
    assert.equal(rules.findLine('gs.log("a")', 'gs.log('), 1);
    assert.equal(rules.findLine('', 'x'), 0);
});

test('estado local nunca volta para trás', () => {
    assert.equal(rules.localState('published', null, 'new'), 'new');
    assert.equal(rules.localState('published', 'approved', 'new'), 'approved');
    assert.equal(rules.localState('published', null, 'in_progress'), 'in_progress');
    assert.equal(rules.localState('published', 'completed', 'in_progress'), 'completed');
    assert.equal(rules.localState('archived', 'completed', 'completed'), 'archived');
});

test('texto de status do header', () => {
    assert.equal(rules.syncLabel(12, 2), 'Hub sincronizado há 12 min · 2 envios na fila');
    assert.equal(rules.syncLabel(0.2, 0), 'Hub sincronizado agora · nenhum envio na fila');
    assert.equal(rules.syncLabel(null, 1), 'Hub ainda não sincronizado · 1 envio na fila');
    assert.equal(rules.syncLabel(130, 0), 'Hub sincronizado há 2 h · nenhum envio na fila');
});

// ---- Consistência Hub × Agent: as allowlists precisam ser as mesmas dos cross-scope privileges

function staticArray(file, expr) {
    const code = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const sandbox = { Class: { create: () => function () {} } };
    vm.createContext(sandbox);
    vm.runInContext(`${code};this.__v = JSON.stringify(${expr});`, sandbox);
    return JSON.parse(sandbox.__v).slice().sort();
}

function privileges(operation) {
    const text = fs.readFileSync(path.join(__dirname, '..', 'agent/src/fluent/cross-scope.now.ts'), 'utf8');
    const re = new RegExp(`operation: '${operation}', targetName: '([a-z_]+)'`, 'g');
    const out = [];
    let m;
    while ((m = re.exec(text))) out.push(m[1]);
    return out.sort();
}

test('allowlist do setup: Hub = Agent = privilégios de create', () => {
    const hub = staticArray('hub/src/server/script-includes/ActivityValidator.server.js', 'ActivityValidator.SETUP_TABLE_ALLOWLIST');
    const agent = staticArray('agent/src/server/script-includes/SetupEngine.server.js', 'SetupEngine.TABLE_ALLOWLIST');
    assert.deepEqual(hub, agent);
    assert.deepEqual(privileges('create').filter((t) => t !== 'sys_properties'), agent);
});

test('tabelas do record_exists: Hub = Agent = privilégios de leitura', () => {
    const hub = staticArray('hub/src/server/script-includes/ActivityValidator.server.js', 'ActivityValidator.RECORD_TABLE_ALLOWLIST');
    const agent = staticArray('agent/src/server/script-includes/CheckEngine.server.js', 'CheckEngine.RECORD_TABLE_ALLOWLIST');
    assert.deepEqual(hub, agent);
    const read = privileges('read');
    for (const t of agent) assert.ok(read.includes(t), `falta privilégio de leitura em ${t}`);
    for (const t of staticArray('agent/src/server/script-includes/CheckEngine.server.js', 'CheckEngine.SCRIPT_SOURCE_TABLES')) {
        assert.ok(read.includes(t), `falta privilégio de leitura em ${t}`);
    }
});

test('tipos de check: tudo que o Hub publica o Agent executa', () => {
    const hub = staticArray('hub/src/server/script-includes/ActivityValidator.server.js', 'ActivityValidator.SUPPORTED_CHECK_TYPES');
    const engine = fs.readFileSync(path.join(__dirname, '..', 'agent/src/server/script-includes/CheckEngine.server.js'), 'utf8');
    for (const type of hub) assert.match(engine, new RegExp(`${type}: this\\.`), `CheckEngine não trata ${type}`);
});

test('os dois portais usam as mesmas variáveis de tema', () => {
    const vars = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8').match(/:root \{[\s\S]*?\}/)[0];
    assert.equal(vars('hub/src/portal/theme.scss'), vars('agent/src/portal/theme.scss'));
});
