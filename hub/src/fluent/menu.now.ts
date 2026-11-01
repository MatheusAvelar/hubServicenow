import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

/* Menu do navegador para o instrutor (cadastro administrativo). O painel fica no portal /devlab_hub. */

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
        title: 'Painel',
        application: hubMenu,
        link_type: 'DIRECT',
        query: '/devlab_hub?id=x_1556735_dlhub_painel',
        window_name: '_blank',
        order: 100,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})

Record({
    $id: Now.ID['mod_activities'],
    table: 'sys_app_module',
    data: {
        title: 'Atividades',
        application: hubMenu,
        link_type: 'LIST',
        name: 'x_1556735_dlhub_activity',
        order: 200,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})

Record({
    $id: Now.ID['mod_import'],
    table: 'sys_app_module',
    data: {
        title: 'Importar JSON',
        application: hubMenu,
        link_type: 'DIRECT',
        query: 'x_1556735_dlhub_import.do',
        order: 250,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})

Record({
    $id: Now.ID['mod_tracks'],
    table: 'sys_app_module',
    data: {
        title: 'Trilhas',
        application: hubMenu,
        link_type: 'LIST',
        name: 'x_1556735_dlhub_track',
        order: 300,
        roles: ['x_1556735_dlhub.admin'],
        active: true,
    },
})

Record({
    $id: Now.ID['mod_participants'],
    table: 'sys_app_module',
    data: {
        title: 'Participantes',
        application: hubMenu,
        link_type: 'LIST',
        name: 'x_1556735_dlhub_participant',
        order: 400,
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
