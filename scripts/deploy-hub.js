#!/usr/bin/env node
// Deploy direto do Hub na PDI do instrutor (now-sdk install). Só o Hub, só na dev400642, nunca --reinstall.
// Credenciais vêm de SN_SDK_INSTANCE_URL, SN_SDK_USER e SN_SDK_USER_PWD (lidas pelo próprio SDK).
'use strict';
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const HUB_INSTANCE = 'https://dev400642.service-now.com';
const url = String(process.env.SN_SDK_INSTANCE_URL || '').replace(/\/+$/, '');
if (url !== HUB_INSTANCE) {
    console.error(`SN_SDK_INSTANCE_URL deve ser ${HUB_INSTANCE} (recebido: "${url || 'vazio'}").`);
    process.exit(1);
}
if (!process.env.SN_SDK_USER || !process.env.SN_SDK_USER_PWD) {
    console.error('Defina SN_SDK_USER e SN_SDK_USER_PWD no ambiente (nunca em arquivo).');
    process.exit(1);
}
if (process.argv.slice(2).some((a) => /^(-r|--reinstall)$/.test(a))) {
    console.error('--reinstall é proibido: apagaria os dados do Hub.');
    process.exit(1);
}

const hubDir = path.join(__dirname, '..', 'hub');
// SN_SDK_NODE_ENV=SN_SDK_CI_INSTALL faz o SDK usar as credenciais do ambiente em vez de um alias salvo.
const env = { ...process.env, SN_SDK_NODE_ENV: 'SN_SDK_CI_INSTALL' };
const run = (args) => execFileSync('npx', ['now-sdk', ...args], { cwd: hubDir, stdio: 'inherit', env });
run(['clean']);
run(['build']);
run(['install']);
