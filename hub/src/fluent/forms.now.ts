import '@servicenow/sdk/global'
import { Form, default_view } from '@servicenow/sdk/core'

/* Forms clássicos: só cadastro administrativo do instrutor. */

export const trackForm = Form({
    table: 'x_1556735_dlhub_track',
    view: default_view,
    sections: [
        {
            caption: 'Trilha',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'name', type: 'table_field' }],
                    rightElements: [
                        { field: 'order', type: 'table_field' },
                        { field: 'active', type: 'table_field' },
                    ],
                },
                { layout: 'one-column', elements: [{ field: 'description', type: 'table_field' }] },
            ],
        },
    ],
})

export const activityForm = Form({
    table: 'x_1556735_dlhub_activity',
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
                    ],
                    rightElements: [
                        { field: 'state', type: 'table_field' },
                        { field: 'version', type: 'table_field' },
                        { field: 'published_on', type: 'table_field' },
                        { field: 'total_points', type: 'table_field' },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'due_date', type: 'table_field' }],
                    rightElements: [{ field: 'max_attempts', type: 'table_field' }],
                },
                { layout: 'one-column', elements: [{ field: 'description', type: 'table_field' }] },
            ],
        },
        {
            caption: 'Setup',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['ann_setup'],
                            text: 'Lista de ações declarativas (JSON). Só create_record em tabelas da allowlist: sys_user, sys_user_group, incident.',
                        },
                        { field: 'setup', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Checks',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ type: 'list', listType: '12M', listRef: 'x_1556735_dlhub_check.activity' }],
                },
            ],
        },
        {
            caption: 'Matrículas',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ type: 'list', listType: '12M', listRef: 'x_1556735_dlhub_enrollment.activity' }],
                },
            ],
        },
    ],
})

export const checkForm = Form({
    table: 'x_1556735_dlhub_check',
    view: default_view,
    sections: [
        {
            caption: 'Check',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'activity', type: 'table_field' },
                        { field: 'code', type: 'table_field' },
                        { field: 'name', type: 'table_field' },
                        { field: 'type', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'order', type: 'table_field' },
                        { field: 'points', type: 'table_field' },
                        { field: 'required', type: 'table_field' },
                        { field: 'hint_cost', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'params', type: 'table_field' },
                        { field: 'hint', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

export const participantForm = Form({
    table: 'x_1556735_dlhub_participant',
    view: default_view,
    sections: [
        {
            caption: 'Participante',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['ann_token'],
                            text: 'O token individual é gerado ao salvar e aparece uma única vez. O Hub guarda só o hash (SHA-256).',
                        },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'name', type: 'table_field' },
                        { field: 'email', type: 'table_field' },
                        { field: 'instance_url', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'active', type: 'table_field' },
                        { field: 'last_seen', type: 'table_field' },
                        { field: 'agent_version', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Matrículas',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ type: 'list', listType: '12M', listRef: 'x_1556735_dlhub_enrollment.participant' }],
                },
            ],
        },
    ],
})

export const enrollmentForm = Form({
    table: 'x_1556735_dlhub_enrollment',
    view: default_view,
    sections: [
        {
            caption: 'Matrícula',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'participant', type: 'table_field' },
                        { field: 'activity', type: 'table_field' },
                        { field: 'state', type: 'table_field' },
                        { field: 'score', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'approved_at', type: 'table_field' },
                        { field: 'completed_at', type: 'table_field' },
                        { field: 'attempts', type: 'table_field' },
                        { field: 'hints_used', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Resultados',
            content: [
                {
                    layout: 'one-column',
                    elements: [{ type: 'list', listType: '12M', listRef: 'x_1556735_dlhub_result.enrollment' }],
                },
            ],
        },
    ],
})

export const resultForm = Form({
    table: 'x_1556735_dlhub_result',
    view: default_view,
    sections: [
        {
            caption: 'Resultado',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'enrollment', type: 'table_field' },
                        { field: 'check', type: 'table_field' },
                        { field: 'attempt', type: 'table_field' },
                        { field: 'validated_at', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'passed', type: 'table_field' },
                        { field: 'points', type: 'table_field' },
                        { field: 'evidence_hash', type: 'table_field' },
                    ],
                },
                { layout: 'one-column', elements: [{ field: 'evidence', type: 'table_field' }] },
            ],
        },
    ],
})

export const apiLogForm = Form({
    table: 'x_1556735_dlhub_api_log',
    view: default_view,
    sections: [
        {
            caption: 'Chamada',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'participant', type: 'table_field' },
                        { field: 'endpoint', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'status', type: 'table_field' },
                        { field: 'sys_created_on', type: 'table_field' },
                    ],
                },
                { layout: 'one-column', elements: [{ field: 'payload_summary', type: 'table_field' }] },
            ],
        },
    ],
})
