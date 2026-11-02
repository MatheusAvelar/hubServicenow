#!/usr/bin/env node
'use strict';
/**
 * Valida localmente os JSON de atividade com as MESMAS regras do Hub
 * (hub/src/server/script-includes/ActivityValidator.server.js).
 *
 * Uso: node scripts/validate-activity.js [arquivo.json ...]
 * Sem argumentos, valida todos os arquivos de activities/.
 * A validação de verdade acontece no Hub (ActivityImportService), na importação.
 */
const fs = require('node:fs');
const path = require('node:path');
const { loadScriptInclude } = require('./load-script-include');

const ActivityValidator = loadScriptInclude(
    'hub/src/server/script-includes/ActivityValidator.server.js',
    'ActivityValidator',
);

const root = path.resolve(__dirname, '..');
let files = process.argv.slice(2);
if (files.length === 0) {
    const dir = path.join(root, 'activities');
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => path.join(dir, f));
}

let failed = 0;
const numbers = new Map();
for (const file of files) {
    const rel = path.relative(root, path.resolve(file));
    const text = fs.readFileSync(file, 'utf8');
    const result = new ActivityValidator().validate(text);
    if (result.valid) {
        const expected = path.basename(file, '.json');
        if (result.activity.number !== expected) {
            console.log(`✕ ${rel}\n    - o nome do arquivo deve ser ${result.activity.number}.json`);
            failed++;
            continue;
        }
        if (numbers.has(result.activity.number)) {
            console.log(`✕ ${rel}\n    - number repetido (também em ${numbers.get(result.activity.number)})`);
            failed++;
            continue;
        }
        numbers.set(result.activity.number, rel);
        const points = result.activity.checks.reduce((s, c) => s + c.points, 0);
        console.log(`✓ ${rel} — ${result.activity.number} v${result.activity.version}, ${result.activity.checks.length} checks, ${points} pts`);
    } else {
        failed++;
        console.log(`✕ ${rel}`);
        for (const e of result.errors) console.log(`    - ${e}`);
    }
}
console.log(failed ? `\n${failed} arquivo(s) com erro.` : `\n${files.length} arquivo(s) válidos.`);
process.exit(failed ? 1 : 0);
