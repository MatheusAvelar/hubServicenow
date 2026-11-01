import '@servicenow/sdk/global'
import { Acl, UiPage } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

UiPage({
    $id: Now.ID['page_import'],
    category: 'general',
    endpoint: 'x_1556735_dlhub_import.do',
    description: 'Dev Lab — importar atividade a partir do JSON (ActivityImportService).',
    html: Now.include('../server/ui-pages/import.html'),
    processingScript: Now.include('../server/ui-pages/import.processing.server.js'),
})

Acl({
    $id: Now.ID['acl_page_import'],
    name: 'x_1556735_dlhub_import',
    type: 'ui_page',
    operation: 'read',
    decisionType: 'allow',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Só o instrutor abre a página de importação.',
})
