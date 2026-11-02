'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { cdata, readRecords, PROFILES } = require('../scripts/build-updateset');

test('CDATA aceita conteúdo que já tem CDATA (scripts dentro do payload)', () => {
    const inner = '<script><![CDATA[if (a[b]]>0) x();]]></script>';
    const out = cdata(inner);
    assert.ok(out.startsWith('<![CDATA[') && out.endsWith(']]>'));
    // Remontando os pedaços, o conteúdo volta igual
    const rebuilt = out.slice(9, -3).split(']]]]><![CDATA[>').join(']]>');
    assert.equal(rebuilt, inner);
    // Não sobra nenhum "]]>" que feche o CDATA externo antes da hora
    assert.equal(out.slice(9, -3).replace(/\]\]\]\]><!\[CDATA\[>/g, '').includes(']]>'), false);
});

const hubBuilt = fs.existsSync(path.join(__dirname, '..', 'hub', 'dist', 'app', 'scope'));

test('pacote de prova: só a tabela Trilha, sem o campo activity.track', { skip: !hubBuilt && 'rode npm run hub:build' }, () => {
    const recs = readRecords('hub');
    const prova = recs.filter((r) => PROFILES.prova.include(r));
    const tables = new Set(prova.map((r) => r.table));
    assert.ok(tables.has('sys_app'));
    assert.ok(tables.has('sys_db_object'));
    assert.ok(tables.has('sys_script_include'));
    assert.equal(prova.filter((r) => r.table === 'sys_db_object').length, 1);
    assert.equal(prova.some((r) => r.name === 'sys_dictionary_x_1556735_dlhub_activity_track'), false);
    assert.ok(prova.some((r) => r.name === 'sys_dictionary_x_1556735_dlhub_track_null'));
});

test('nenhum registro do build tem objeto serializado errado', { skip: !hubBuilt && 'rode npm run hub:build' }, () => {
    for (const app of ['hub', 'agent']) {
        if (!fs.existsSync(path.join(__dirname, '..', app, 'dist', 'app'))) continue;
        for (const r of readRecords(app)) assert.equal(r.payload.includes('[object Object]'), false, `${app}: ${r.name}`);
    }
});
