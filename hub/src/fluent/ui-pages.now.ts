import '@servicenow/sdk/global'
import { Acl, UiPage } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

/*
 * Interface única do Hub: x_1556735_dlhub_devlab.do — abas Painel, Atividades, Importar JSON,
 * Trilhas e Participantes. A página só desenha; os dados vêm de POST /api/x_1556735_dlhub/console/v1/run
 * (HubConsoleService). O HTML é Jelly: nada de aspas duplas dentro de atributos e nada de script inline
 * (o JS fica em clientScript, que não passa pelo Jelly).
 */

UiPage({
    $id: Now.ID['page_devlab'],
    category: 'general',
    endpoint: 'x_1556735_dlhub_devlab.do',
    description: 'Dev Lab Hub — página única do instrutor (painel, atividades, importação, trilhas, participantes).',
    html: Now.include('../server/ui-pages/devlab.html'),
    clientScript: Now.include('../server/ui-pages/devlab.client.js'),
})

Acl({
    $id: Now.ID['acl_page_devlab'],
    name: 'x_1556735_dlhub_devlab',
    type: 'ui_page',
    operation: 'read',
    decisionType: 'allow',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Só o instrutor abre a página do Hub.',
})
