'use strict';
/**
 * Carrega um Script Include "puro" (Class.create, sem APIs Glide) num sandbox do Node.
 * Permite testar localmente a mesma lógica que roda no ServiceNow.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadScriptInclude(relativePath, name) {
    const file = path.resolve(__dirname, '..', relativePath);
    const code = fs.readFileSync(file, 'utf8');
    const sandbox = {
        Class: {
            create() {
                return function () {
                    if (typeof this.initialize === 'function') this.initialize.apply(this, arguments);
                };
            },
        },
        JSON,
        Math,
        Object,
        Array,
        String,
        Number,
        isFinite,
        parseInt,
    };
    vm.createContext(sandbox);
    vm.runInContext(`${code}\n;this.__exported = ${name};`, sandbox, { filename: file });
    return sandbox.__exported;
}

module.exports = { loadScriptInclude };
