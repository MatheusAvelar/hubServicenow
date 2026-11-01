import '@servicenow/sdk/global'
import {
    Table,
    StringColumn,
    ChoiceColumn,
    BooleanColumn,
    IntegerColumn,
    ReferenceColumn,
    DateColumn,
    DateTimeColumn,
    HtmlColumn,
    JsonColumn,
    MultiLineTextColumn,
} from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

/*
 * Modelo de dados do Hub (ver CLAUDE.md, "Modelo de dados — Hub").
 * Acesso: só a role admin lê e grava pelas telas. O usuário de integração (role agent)
 * não tem acesso às tabelas: a API grava via Script Include no servidor.
 */

export const x_1556735_dlhub_track = Table({
    name: 'x_1556735_dlhub_track',
    label: 'Trilha',
    display: 'name',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    schema: {
        name: StringColumn({ label: 'Nome', mandatory: true, maxLength: 100 }),
        description: MultiLineTextColumn({ label: 'Descrição', maxLength: 4000 }),
        order: IntegerColumn({ label: 'Ordem', default: 100 }),
        active: BooleanColumn({ label: 'Ativa', default: true }),
    },
    index: [{ name: 'track_name', unique: true, element: 'name' }],
})

export const x_1556735_dlhub_activity = Table({
    name: 'x_1556735_dlhub_activity',
    label: 'Atividade',
    display: 'number',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    audit: true,
    schema: {
        number: StringColumn({ label: 'Número', mandatory: true, maxLength: 20 }),
        title: StringColumn({ label: 'Título', mandatory: true, maxLength: 160 }),
        track: ReferenceColumn({ label: 'Trilha', referenceTable: 'x_1556735_dlhub_track', mandatory: true }),
        level: ChoiceColumn({
            label: 'Nível',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            default: 'junior',
            choices: {
                junior: { label: 'Júnior', sequence: 0 },
                pleno: { label: 'Pleno', sequence: 1 },
                senior: { label: 'Sênior', sequence: 2 },
            },
        }),
        description: HtmlColumn({ label: 'Enunciado', maxLength: 65536 }),
        due_date: DateColumn({ label: 'Prazo' }),
        state: ChoiceColumn({
            label: 'Estado',
            mandatory: true,
            readOnly: true,
            dropdown: 'dropdown_without_none',
            default: 'draft',
            choices: {
                draft: { label: 'Rascunho', sequence: 0 },
                published: { label: 'Publicada', sequence: 1 },
                archived: { label: 'Arquivada', sequence: 2 },
            },
        }),
        version: IntegerColumn({ label: 'Versão', default: 1, readOnly: true }),
        setup: JsonColumn({ label: 'Setup (JSON)', maxLength: 65000 }),
        max_attempts: IntegerColumn({ label: 'Máximo de tentativas', default: 5 }),
        total_points: IntegerColumn({ label: 'Total de pontos', default: 0, readOnly: true }),
        published_on: DateTimeColumn({ label: 'Publicada em', readOnly: true }),
    },
    index: [{ name: 'activity_number', unique: true, element: 'number' }],
})

export const x_1556735_dlhub_check = Table({
    name: 'x_1556735_dlhub_check',
    label: 'Check',
    display: 'name',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    audit: true,
    schema: {
        activity: ReferenceColumn({ label: 'Atividade', referenceTable: 'x_1556735_dlhub_activity', mandatory: true }),
        code: StringColumn({ label: 'Código', mandatory: true, maxLength: 20 }),
        order: IntegerColumn({ label: 'Ordem', default: 100 }),
        name: StringColumn({ label: 'Nome', mandatory: true, maxLength: 160 }),
        type: ChoiceColumn({
            label: 'Tipo',
            mandatory: true,
            dropdown: 'dropdown_with_none',
            choices: {
                record_exists: { label: 'record_exists', sequence: 0 },
                business_rule: { label: 'business_rule', sequence: 1 },
                script_not_contains: { label: 'script_not_contains', sequence: 2 },
            },
        }),
        params: JsonColumn({ label: 'Parâmetros (JSON)', maxLength: 65000 }),
        points: IntegerColumn({ label: 'Pontos', default: 10, mandatory: true }),
        required: BooleanColumn({ label: 'Obrigatório', default: true }),
        hint: MultiLineTextColumn({ label: 'Dica', maxLength: 1000 }),
        hint_cost: IntegerColumn({ label: 'Custo da dica', default: 0 }),
    },
    index: [{ name: 'check_activity_code', unique: true, element: ['activity', 'code'] }],
})

export const x_1556735_dlhub_participant = Table({
    name: 'x_1556735_dlhub_participant',
    label: 'Participante',
    display: 'name',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    audit: true,
    schema: {
        name: StringColumn({ label: 'Nome', mandatory: true, maxLength: 100 }),
        email: StringColumn({ label: 'E-mail', maxLength: 100 }),
        instance_url: StringColumn({ label: 'URL da instância', maxLength: 255 }),
        token_hash: StringColumn({ label: 'Hash do token', maxLength: 64, readOnly: true }),
        active: BooleanColumn({ label: 'Ativo', default: true }),
        last_seen: DateTimeColumn({ label: 'Última sincronização', readOnly: true }),
        agent_version: StringColumn({ label: 'Versão do Agent', maxLength: 40, readOnly: true }),
    },
    index: [{ name: 'participant_token_hash', unique: false, element: 'token_hash' }],
})

export const x_1556735_dlhub_enrollment = Table({
    name: 'x_1556735_dlhub_enrollment',
    label: 'Matrícula',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    schema: {
        participant: ReferenceColumn({ label: 'Participante', referenceTable: 'x_1556735_dlhub_participant', mandatory: true }),
        activity: ReferenceColumn({ label: 'Atividade', referenceTable: 'x_1556735_dlhub_activity', mandatory: true }),
        state: ChoiceColumn({
            label: 'Estado',
            dropdown: 'dropdown_without_none',
            default: 'available',
            choices: {
                available: { label: 'Disponível', sequence: 0 },
                approved: { label: 'Aprovada', sequence: 1 },
                in_progress: { label: 'Em andamento', sequence: 2 },
                completed: { label: 'Concluída', sequence: 3 },
                expired: { label: 'Expirada', sequence: 4 },
            },
        }),
        approved_at: DateTimeColumn({ label: 'Aprovada em' }),
        completed_at: DateTimeColumn({ label: 'Concluída em' }),
        score: IntegerColumn({ label: 'Pontuação', default: 0 }),
        attempts: IntegerColumn({ label: 'Tentativas', default: 0 }),
        hints_used: IntegerColumn({ label: 'Dicas usadas', default: 0 }),
    },
    index: [{ name: 'enrollment_participant_activity', unique: true, element: ['participant', 'activity'] }],
})

export const x_1556735_dlhub_result = Table({
    name: 'x_1556735_dlhub_result',
    label: 'Resultado',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    schema: {
        enrollment: ReferenceColumn({ label: 'Matrícula', referenceTable: 'x_1556735_dlhub_enrollment', mandatory: true }),
        check: ReferenceColumn({ label: 'Check', referenceTable: 'x_1556735_dlhub_check', mandatory: true }),
        attempt: IntegerColumn({ label: 'Tentativa', mandatory: true }),
        passed: BooleanColumn({ label: 'Aprovado', default: false }),
        points: IntegerColumn({ label: 'Pontos', default: 0 }),
        evidence: JsonColumn({ label: 'Evidência (JSON)', maxLength: 65000 }),
        evidence_hash: StringColumn({ label: 'Hash da evidência', maxLength: 64 }),
        validated_at: DateTimeColumn({ label: 'Validado em' }),
    },
    index: [{ name: 'result_enrollment_attempt', unique: false, element: ['enrollment', 'attempt'] }],
})

export const x_1556735_dlhub_api_log = Table({
    name: 'x_1556735_dlhub_api_log',
    label: 'Log da API',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: adminRole,
    schema: {
        participant: ReferenceColumn({ label: 'Participante', referenceTable: 'x_1556735_dlhub_participant' }),
        endpoint: StringColumn({ label: 'Endpoint', maxLength: 200 }),
        payload_summary: StringColumn({ label: 'Resumo', maxLength: 1000 }),
        status: IntegerColumn({ label: 'Status HTTP' }),
    },
})
