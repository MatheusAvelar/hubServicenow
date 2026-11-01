import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

/* Menu do navegador: a interface do instrutor é a página única x_1556735_dlhub_devlab.do. */

export const hubMenu = ApplicationMenu({
    $id: Now.ID['menu_hub'],
    title: 'Dev Lab Hub',
    hint: 'Laboratórios guiados de ServiceNow',
    roles: [adminRole],
    active: true,
})

Record({
    $id: Now.ID['mod_dashboard'],
    table: 'sys_app_module',
    data: {
        title: 'Dev Lab',
        application: hubMenu,
        link_type: 'DIRECT',
        query: 'x_1556735_dlhub_devlab.do',
        order: 100,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})

Record({
    $id: Now.ID['mod_enrollments'],
    table: 'sys_app_module',
    data: {
        title: 'Matrículas',
        application: hubMenu,
        link_type: 'LIST',
        name: 'x_1556735_dlhub_enrollment',
        order: 500,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})

Record({
    $id: Now.ID['mod_api_log'],
    table: 'sys_app_module',
    data: {
        title: 'Log da API',
        application: hubMenu,
        link_type: 'LIST',
        name: 'x_1556735_dlhub_api_log',
        order: 600,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})
