#!/usr/bin/env node
'use strict';
/**
 * build-updateset.js — gera um Update Set XML (Retrieved Update Sets > Import XML) a partir do build local
 * de um app do repositório. Não fala com nenhuma instância e não precisa de credenciais.
 *
 * Fonte dos registros: `<app>/dist/app/**` (gerado offline por `npm run build` dentro do app — o compilador
 * Fluent do ServiceNow SDK transforma src/ em um XML <record_update> por registro). Este script só embrulha
 * cada registro num sys_update_xml e junta tudo num <unload> com o sys_remote_update_set.
 *
 * Uso:
 *   node scripts/build-updateset.js hub                → dist/DevLab_Hub_v1.xml
 *   node scripts/build-updateset.js agent              → dist/DevLab_Agent_v1.xml
 *   node scripts/build-updateset.js hub --profile prova → dist/DevLab_Prova_v1.xml (pacote mínimo de prova)
 *
 * Os sys_ids do update set e de cada sys_update_xml são determinísticos (derivados do nome), então gerar de
 * novo produz o mesmo arquivo para o mesmo conteúdo.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');

const APPS = {
    hub: { dir: 'hub', label: 'Hub', file: 'DevLab_Hub' },
    agent: { dir: 'agent', label: 'Agent', file: 'DevLab_Agent' },
};

/**
 * Pacote mínimo de prova (Hub): cria o app x_1556735_dlhub com só o necessário para confirmar que
 * app escopado + role + tabela com form + Script Include + menu passam no Preview e no Commit.
 * Os sys_ids são os mesmos do pacote completo: depois, o DevLab_Hub_v1.xml só complementa.
 */
const PROFILES = {
    prova: {
        app: 'hub',
        file: 'DevLab_Prova',
        title: 'Dev Lab — pacote de prova',
        description: 'Prova do formato: app x_1556735_dlhub, roles, tabela Trilha (com form), Script Include ScoringRules e menu com o módulo Trilhas.',
        include(rec) {
            if (['sys_app', 'sys_user_role', 'sys_app_application'].includes(rec.table)) return true;
            if (rec.table === 'sys_app_module') return /<title>Trilhas<\/title>/.test(rec.payload);
            if (rec.table === 'sys_script_include') return /<name>ScoringRules<\/name>/.test(rec.payload);
            // Tabela track: sys_db_object, dicionário e labels só dela (não o campo activity.track) e o form
            const t = 'x_1556735_dlhub_track';
            if (['sys_dictionary', 'sys_documentation'].includes(rec.table)) return recordTable(rec) === t;
            if (rec.table === 'sys_db_object') return new RegExp(`<name>${t}</name>`).test(rec.payload);
            if (['sys_ui_section', 'sys_ui_form_sections'].includes(rec.table)) return new RegExp(`<(name|table)>${t}</`).test(rec.payload);
            return false;
        },
    },
};

/** Registros do build que não vão no update set (metadados do pacote do SDK, sem uso fora dele). */
const SKIP_TABLES = new Set(['sys_module']);

/** Ordem de aplicação: dependências antes de quem as usa. */
const ORDER = [
    'sys_app', 'sys_user_role', 'sys_db_object', 'sys_dictionary', 'sys_choice_set', 'sys_choice', 'sys_documentation',
    'sys_properties', 'sys_scope_privilege', 'sys_script_include', 'sys_script', 'sysevent_register',
    'sysevent_script_action', 'sysauto_script', 'sys_security_acl', 'sys_security_acl_role',
    'sys_ws_definition', 'sys_ws_operation', 'sys_ws_header', 'sys_ws_header_map', 'sys_ws_query_parameter',
    'sys_ws_query_parameter_map', 'sys_ui_action', 'sys_ui_action_role', 'sys_ui_page', 'sys_ui_section',
    'sys_ui_form_sections', 'sys_ui_form', 'sys_ui_element', 'sys_ui_annotation', 'sp_header_footer', 'sp_widget',
    'sp_theme', 'sp_page', 'sp_container', 'sp_row', 'sp_column', 'sp_instance', 'sp_portal',
    'sys_app_application', 'sys_app_module',
];

const TYPE_LABELS = {
    sys_app: 'Custom Application', sys_user_role: 'Role', sys_db_object: 'Table', sys_dictionary: 'Dictionary',
    sys_choice_set: 'Choice List', sys_choice: 'Choice List', sys_documentation: 'Field Label',
    sys_properties: 'System Property', sys_scope_privilege: 'Cross scope privilege', sys_script_include: 'Script Include',
    sys_script: 'Business Rule', sysevent_register: 'Event Registration', sysevent_script_action: 'Script Action',
    sysauto_script: 'Scheduled Script Execution', sys_security_acl: 'Access Control', sys_security_acl_role: 'Access Role',
    sys_ws_definition: 'Scripted REST Service', sys_ws_operation: 'Scripted REST Resource', sys_ws_header: 'REST Header',
    sys_ws_header_map: 'REST Header Map', sys_ws_query_parameter: 'REST Query Parameter',
    sys_ws_query_parameter_map: 'REST Query Parameter Map', sys_ui_action: 'UI Action', sys_ui_action_role: 'UI Action Role',
    sys_ui_page: 'UI Page', sys_ui_section: 'Form Sections', sys_ui_form_sections: 'Form Sections', sys_ui_form: 'Form',
    sp_header_footer: 'Header | Footer', sp_widget: 'Widget', sp_theme: 'Theme', sp_page: 'Page',
    sp_container: 'Container', sp_row: 'Row', sp_column: 'Column', sp_instance: 'Instance', sp_portal: 'Portal',
    sys_app_application: 'Application Menu', sys_app_module: 'Module',
};

// ------------------------------------------------------------------ utilidades

function sysId(seed) {
    return crypto.createHash('md5').update(seed).digest('hex');
}

function esc(text) {
    return String(text === null || text === undefined ? '' : text)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** CDATA que aceita conteúdo com "]]>" (os payloads já têm CDATA de scripts dentro). */
function cdata(text) {
    return '<![CDATA[' + String(text).split(']]>').join(']]]]><![CDATA[>') + ']]>';
}

function tag(name, value, attrs) {
    const a = attrs ? Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('') : '';
    if (value === null || value === undefined || value === '') return `<${name}${a}/>`;
    return `<${name}${a}>${esc(value)}</${name}>`;
}

function first(re, text) {
    const m = re.exec(text);
    return m ? m[1] : '';
}

/** Data no formato do ServiceNow (UTC). */
function snDate(d) {
    return d.toISOString().replace('T', ' ').substring(0, 19);
}

// ------------------------------------------------------------------ leitura do build

function readRecords(appDir) {
    const base = path.join(ROOT, appDir, 'dist', 'app');
    if (!fs.existsSync(base)) {
        throw new Error(`Build não encontrado em ${path.relative(ROOT, base)}. Rode antes: npm --prefix ${appDir} run build`);
    }
    const out = [];
    // dictionary/ é o "bootstrap" da instalação de app; num update set a tabela nasce dos sys_dictionary (_null).
    for (const sub of ['scope', 'update', 'author_elective_update']) {
        const dir = path.join(base, sub);
        if (!fs.existsSync(dir)) continue;
        for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.xml')).sort()) {
            const raw = fs.readFileSync(path.join(dir, file), 'utf8');
            const payload = raw.replace(/^\s*<\?xml[^>]*\?>\s*/, '').trim();
            const table = first(/^<record_update[^>]*?\btable="([^"]+)"/, payload) ||
                first(/^<record_update[^>]*>\s*<([a-z0-9_]+)[\s>]/, payload);
            if (!table) throw new Error(`Não consegui identificar a tabela de ${sub}/${file}`);
            out.push({
                file: `${sub}/${file}`,
                table,
                name: first(/<sys_update_name>([^<]+)<\/sys_update_name>/, payload) || file.replace(/\.xml$/, ''),
                payload,
            });
        }
    }
    return out;
}

/** Atributos do elemento interno (<sys_dictionary table=".." element="..">), não do <record_update>. */
function innerAttr(rec, attr) {
    return first(new RegExp(`<${rec.table}\\b[^>]*\\b${attr}="([^"]*)"`), rec.payload);
}

/** Tabela a que um registro de dicionário/label/choice se refere. */
function recordTable(rec) {
    return innerAttr(rec, 'table') || first(/<name>([^<]+)<\/name>/, rec.payload);
}

function targetName(rec) {
    const p = rec.payload;
    if (rec.table === 'sys_dictionary' || rec.table === 'sys_documentation') {
        const e = innerAttr(rec, 'element') || first(/<element>([^<]*)<\/element>/, p);
        const t = recordTable(rec);
        return e ? `${t}.${e}` : t;
    }
    if (rec.table === 'sys_choice_set') return `${innerAttr(rec, 'table')}.${innerAttr(rec, 'field')}`;
    return first(/<(?:name|title|id|label|caption|event_name)>([^<]{1,100})<\/(?:name|title|id|label|caption|event_name)>/, p) || rec.name;
}

function tableField(rec) {
    if (['sys_dictionary', 'sys_choice_set', 'sys_documentation'].includes(rec.table)) return recordTable(rec);
    return '';
}

/** sys_app: tira a referência ao package.json do SDK (sys_module não vai no update set). */
function adjust(rec) {
    if (rec.table === 'sys_app') {
        rec.payload = rec.payload.replace(/<package_json>[^<]*<\/package_json>/, '<package_json/>');
    }
    return rec;
}

function sortRecords(records) {
    const rank = (t) => {
        const i = ORDER.indexOf(t);
        return i === -1 ? ORDER.length : i;
    };
    return records.slice().sort((a, b) => {
        const d = rank(a.table) - rank(b.table);
        if (d) return d;
        // sys_dictionary: a coleção (_null, cria a tabela) antes dos campos
        if (a.table === 'sys_dictionary') {
            const an = a.name.endsWith('_null') ? 0 : 1;
            const bn = b.name.endsWith('_null') ? 0 : 1;
            if (an !== bn) return an - bn;
        }
        return a.name.localeCompare(b.name);
    });
}

// ------------------------------------------------------------------ montagem

function build(appKey, profileKey) {
    const profile = profileKey ? PROFILES[profileKey] : null;
    if (profileKey && !profile) throw new Error(`Perfil desconhecido: ${profileKey}`);
    if (profile && profile.app !== appKey) throw new Error(`O perfil ${profileKey} é do app ${profile.app}.`);
    const app = APPS[appKey];
    if (!app) throw new Error(`App desconhecido: ${appKey} (use hub ou agent)`);

    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, app.dir, 'package.json'), 'utf8'));
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, app.dir, 'now.config.json'), 'utf8'));
    const major = String(pkg.version).split('.')[0];

    let records = readRecords(app.dir).filter((r) => !SKIP_TABLES.has(r.table)).map(adjust);
    if (profile) records = records.filter((r) => profile.include(r));
    records = sortRecords(records);

    const appRec = records.find((r) => r.table === 'sys_app');
    if (!appRec) throw new Error('O build não tem o registro sys_app.');
    const seen = new Set();
    for (const r of records) {
        if (seen.has(r.name)) throw new Error(`sys_update_name repetido: ${r.name}`);
        seen.add(r.name);
    }

    const fileBase = `${profile ? profile.file : app.file}_v${major}`;
    const title = profile ? profile.title : `Dev Lab ${app.label} v${pkg.version}`;
    const description = profile ? profile.description
        : `Dev Lab ${app.label} (${cfg.scope}) versão ${pkg.version}. Gerado por scripts/build-updateset.js a partir de ${app.dir}/src.`;
    // Cada versão é um update set novo (reimportar a mesma versão colidiria com o já commitado).
    const setId = sysId(`devlab-updateset:${fileBase}:${pkg.version}`);
    const now = new Date();
    const stamp = snDate(now);
    const appRef = { display_value: cfg.name };

    const parts = [];
    parts.push('<?xml version="1.0" encoding="UTF-8"?>');
    parts.push(`<unload unload_date="${stamp}">`);
    parts.push('<sys_remote_update_set action="INSERT_OR_UPDATE">');
    parts.push(tag('application', cfg.scopeId, appRef));
    parts.push(tag('application_name', cfg.name));
    parts.push(tag('application_scope', cfg.scope));
    parts.push(tag('application_version', pkg.version));
    parts.push(tag('collisions', ''));
    parts.push(tag('commit_date', ''));
    parts.push(tag('deleted', ''));
    parts.push(tag('description', description));
    parts.push(tag('inserted', ''));
    parts.push(tag('name', title));
    parts.push(tag('origin_sys_id', ''));
    parts.push(tag('parent', '', { display_value: '' }));
    parts.push(tag('release_date', ''));
    parts.push(tag('remote_base_update_set', '', { display_value: '' }));
    parts.push(tag('remote_parent_id', ''));
    parts.push(tag('remote_sys_id', setId));
    parts.push(tag('state', 'loaded'));
    parts.push(tag('summary', ''));
    parts.push(tag('sys_class_name', 'sys_remote_update_set'));
    parts.push(tag('sys_created_by', 'admin'));
    parts.push(tag('sys_created_on', stamp));
    parts.push(tag('sys_id', setId));
    parts.push(tag('sys_mod_count', '0'));
    parts.push(tag('sys_updated_by', 'admin'));
    parts.push(tag('sys_updated_on', stamp));
    parts.push(tag('update_set', '', { display_value: '' }));
    parts.push(tag('update_source', '', { display_value: '' }));
    parts.push(tag('updated', ''));
    parts.push('</sys_remote_update_set>');

    const baseMs = now.getTime();
    records.forEach((r, i) => {
        const id = sysId(`devlab-update:${fileBase}:${pkg.version}:${r.name}`);
        const guid = sysId(`devlab-guid:${r.name}:${crypto.createHash('sha1').update(r.payload).digest('hex')}`);
        const when = snDate(new Date(baseMs + i * 1000));
        // Registro removido do código: o SDK grava action="DELETE" no payload e o update set precisa refletir isso.
        const action = /^\s*<record_update[^>]*>\s*<[a-z0-9_]+ action="DELETE"/.test(r.payload) ? 'DELETE' : 'INSERT_OR_UPDATE';
        parts.push('<sys_update_xml action="INSERT_OR_UPDATE">');
        parts.push(tag('action', action));
        parts.push(tag('application', cfg.scopeId, appRef));
        parts.push(tag('category', 'customer'));
        parts.push(tag('comments', ''));
        parts.push(tag('name', r.name));
        parts.push(`<payload>${cdata('<?xml version="1.0" encoding="UTF-8"?>' + r.payload)}</payload>`);
        parts.push(tag('payload_hash', ''));
        parts.push(tag('remote_update_set', setId, { display_value: title }));
        parts.push(tag('replace_on_upgrade', 'false'));
        parts.push(tag('sys_created_by', 'admin'));
        parts.push(tag('sys_created_on', when));
        parts.push(tag('sys_id', id));
        parts.push(tag('sys_mod_count', '0'));
        parts.push(tag('sys_recorded_at', (baseMs + i).toString(16) + '0000001'));
        parts.push(tag('sys_updated_by', 'admin'));
        parts.push(tag('sys_updated_on', when));
        parts.push(tag('table', tableField(r)));
        parts.push(tag('target_name', targetName(r)));
        parts.push(tag('type', TYPE_LABELS[r.table] || r.table));
        parts.push(tag('update_domain', 'global'));
        parts.push(tag('update_guid', guid));
        parts.push(tag('update_guid_history', `${guid}:0`));
        parts.push(tag('update_set', '', { display_value: '' }));
        parts.push(tag('view', ''));
        parts.push('</sys_update_xml>');
    });
    parts.push('</unload>');

    const outDir = path.join(ROOT, 'dist');
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, `${fileBase}.xml`);
    fs.writeFileSync(outFile, parts.join('\n') + '\n', 'utf8');

    const byTable = {};
    for (const r of records) byTable[r.table] = (byTable[r.table] || 0) + 1;
    return { outFile, title, count: records.length, byTable };
}

module.exports = { build, readRecords, cdata, PROFILES };

if (require.main === module) {
    const args = process.argv.slice(2);
    const appKey = args.find((a) => !a.startsWith('--'));
    const pi = args.indexOf('--profile');
    const profileKey = pi !== -1 ? args[pi + 1] : null;
    try {
        const r = build(appKey, profileKey);
        console.log(`✓ ${path.relative(ROOT, r.outFile)} — "${r.title}", ${r.count} registros`);
        for (const [t, n] of Object.entries(r.byTable)) console.log(`    ${String(n).padStart(4)}  ${t}`);
    } catch (e) {
        console.error(`✕ ${e.message}`);
        process.exit(1);
    }
}
