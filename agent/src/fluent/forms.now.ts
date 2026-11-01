import '@servicenow/sdk/global'
import { ApplicationMenu, Form, Record, default_view } from '@servicenow/sdk/core'
import { userRole } from './roles.now'

/* Forms (somente consulta/diagnóstico — a interface do dev é o portal /devlab) e menu. */

export const activityForm = Form({
    table: 'x_1556735_dlagent_activity',
    view: default_view,
    sections: [
        {
            caption: 'Atividade',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'title', type: 'table_field' },
                        { field: 'track', type: 'table_field' },
                        { field: 'level', type: 'table_field' },
                        { field: 'version', type: 'table_field' },
                        { field: 'due_date', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'state', type: 'table_field' },
                        { field: 'hub_state', type: 'table_field' },
                        { field: 'approved_at', type: 'table_field' },
                        { field: 'completed_at', type: 'table_field' },
                        { field: 'attempts', type: 'table_field' },
                        { field: 'max_attempts', type: 'table_field' },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'score', type: 'table_field' }, { field: 'best_score', type: 'table_field' }],
                    rightElements: [{ field: 'total_points', type: 'table_field' }],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'description', type: 'table_field' },
                        { field: 'setup', type: 'table_field' },
                        { field: 'checks', type: 'table_field' },
                        { field: 'setup_log', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Resultados',
            content: [{ layout: 'one-column', elements: [{ type: 'list', listType: '12M', listRef: 'x_1556735_dlagent_check_result.activity' }] }],
        },
    ],
})

export const resultForm = Form({
    table: 'x_1556735_dlagent_check_result',
    view: default_view,
    sections: [
        {
            caption: 'Resultado',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'activity', type: 'table_field' },
                        { field: 'attempt', type: 'table_field' },
                        { field: 'check_id', type: 'table_field' },
                        { field: 'name', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'passed', type: 'table_field' },
                        { field: 'points', type: 'table_field' },
                        { field: 'max_points', type: 'table_field' },
                        { field: 'validated_at', type: 'table_field' },
                    ],
                },
                { layout: 'one-column', elements: [{ field: 'message', type: 'table_field' }, { field: 'evidence', type: 'table_field' }] },
            ],
        },
    ],
})

export const outboxForm = Form({
    table: 'x_1556735_dlagent_outbox',
    view: default_view,
    sections: [
        {
            caption: 'Envio',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'kind', type: 'table_field' },
                        { field: 'endpoint', type: 'table_field' },
                        { field: 'activity', type: 'table_field' },
                        { field: 'dedupe_key', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'status', type: 'table_field' },
                        { field: 'attempts', type: 'table_field' },
                        { field: 'next_retry', type: 'table_field' },
                        { field: 'last_status', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'last_error', type: 'table_field' },
                        { field: 'payload', type: 'table_field' },
                        { field: 'response', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

export const agentMenu = ApplicationMenu({
    $id: Now.ID['menu_agent'],
    title: 'Dev Lab',
    hint: 'Minhas atividades do Dev Lab',
    roles: [userRole],
    active: true,
})

Record({
    $id: Now.ID['mod_portal'],
    table: 'sys_app_module',
    data: { title: 'Minhas Atividades', application: agentMenu, link_type: 'DIRECT', query: '/devlab', window_name: '_blank', order: 100, roles: [userRole], active: true },
})
Record({
    $id: Now.ID['mod_outbox'],
    table: 'sys_app_module',
    data: { title: 'Outbox', application: agentMenu, link_type: 'LIST', name: 'x_1556735_dlagent_outbox', order: 200, roles: [userRole], active: true },
})
Record({
    $id: Now.ID['mod_activities'],
    table: 'sys_app_module',
    data: { title: 'Atividades (diagnóstico)', application: agentMenu, link_type: 'LIST', name: 'x_1556735_dlagent_activity', order: 300, roles: [userRole], active: true },
})
