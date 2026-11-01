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
    Password2Column,
} from '@servicenow/sdk/core'
import { userRole } from './roles.now'

/* Modelo de dados do Agent (CLAUDE.md, "Modelo de dados — Agent"). Ninguém edita à mão: só os Script Includes. */

export const x_1556735_dlagent_activity = Table({
    name: 'x_1556735_dlagent_activity',
    label: 'Atividade (Dev Lab)',
    display: 'number',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: userRole,
    schema: {
        number: StringColumn({ label: 'Número', mandatory: true, maxLength: 20, readOnly: true }),
        version: IntegerColumn({ label: 'Versão', readOnly: true }),
        track: StringColumn({ label: 'Trilha', maxLength: 100, readOnly: true }),
        title: StringColumn({ label: 'Título', maxLength: 160, readOnly: true }),
        level: ChoiceColumn({
            label: 'Nível',
            readOnly: true,
            dropdown: 'dropdown_without_none',
            choices: {
                junior: { label: 'Júnior', sequence: 0 },
                pleno: { label: 'Pleno', sequence: 1 },
                senior: { label: 'Sênior', sequence: 2 },
            },
        }),
        description: HtmlColumn({ label: 'Enunciado', readOnly: true }),
        due_date: DateColumn({ label: 'Prazo', readOnly: true }),
        max_attempts: IntegerColumn({ label: 'Máximo de tentativas', readOnly: true }),
        setup: JsonColumn({ label: 'Setup (JSON)', maxLength: 65000, readOnly: true }),
        checks: JsonColumn({ label: 'Checks (JSON)', maxLength: 65000, readOnly: true }),
        total_points: IntegerColumn({ label: 'Total de pontos', readOnly: true }),
        hub_state: ChoiceColumn({
            label: 'Estado no Hub',
            readOnly: true,
            dropdown: 'dropdown_without_none',
            default: 'published',
            choices: {
                published: { label: 'Publicada', sequence: 0 },
                archived: { label: 'Arquivada', sequence: 1 },
            },
        }),
        state: ChoiceColumn({
            label: 'Estado',
            readOnly: true,
            dropdown: 'dropdown_without_none',
            default: 'new',
            choices: {
                new: { label: 'Nova', sequence: 0 },
                approved: { label: 'Aprovada', sequence: 1 },
                in_progress: { label: 'Em andamento', sequence: 2 },
                completed: { label: 'Concluída', sequence: 3 },
                archived: { label: 'Arquivada', sequence: 4 },
            },
        }),
        approved_at: DateTimeColumn({ label: 'Aprovada em', readOnly: true }),
        completed_at: DateTimeColumn({ label: 'Concluída em', readOnly: true }),
        attempts: IntegerColumn({ label: 'Tentativas', default: 0, readOnly: true }),
        score: IntegerColumn({ label: 'Pontos da última tentativa', default: 0, readOnly: true }),
        best_score: IntegerColumn({ label: 'Melhor pontuação (Hub)', readOnly: true }),
        setup_log: JsonColumn({ label: 'Log do setup', maxLength: 65000, readOnly: true }),
    },
    index: [{ name: 'dlagent_activity_number', unique: true, element: 'number' }],
})

export const x_1556735_dlagent_check_result = Table({
    name: 'x_1556735_dlagent_check_result',
    label: 'Resultado de check (Dev Lab)',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: userRole,
    schema: {
        activity: ReferenceColumn({ label: 'Atividade', referenceTable: 'x_1556735_dlagent_activity', mandatory: true, readOnly: true }),
        attempt: IntegerColumn({ label: 'Tentativa', readOnly: true }),
        check_id: StringColumn({ label: 'Check', maxLength: 20, readOnly: true }),
        name: StringColumn({ label: 'Nome', maxLength: 160, readOnly: true }),
        passed: BooleanColumn({ label: 'Aprovado', readOnly: true }),
        points: IntegerColumn({ label: 'Pontos', readOnly: true }),
        max_points: IntegerColumn({ label: 'Máximo', readOnly: true }),
        message: StringColumn({ label: 'Mensagem do motor', maxLength: 1000, readOnly: true }),
        evidence: JsonColumn({ label: 'Evidência', maxLength: 65000, readOnly: true }),
        validated_at: DateTimeColumn({ label: 'Validado em', readOnly: true }),
    },
    index: [{ name: 'dlagent_result_activity_attempt', unique: false, element: ['activity', 'attempt'] }],
})

export const x_1556735_dlagent_outbox = Table({
    name: 'x_1556735_dlagent_outbox',
    label: 'Outbox (Dev Lab)',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: userRole,
    schema: {
        kind: ChoiceColumn({
            label: 'Tipo',
            readOnly: true,
            dropdown: 'dropdown_without_none',
            choices: {
                approve: { label: 'Aprovação', sequence: 0 },
                results: { label: 'Resultado', sequence: 1 },
            },
        }),
        method: StringColumn({ label: 'Método', maxLength: 10, default: 'POST', readOnly: true }),
        endpoint: StringColumn({ label: 'Endpoint', maxLength: 200, readOnly: true }),
        payload: JsonColumn({ label: 'Payload', maxLength: 65000, readOnly: true }),
        status: ChoiceColumn({
            label: 'Status',
            readOnly: true,
            dropdown: 'dropdown_without_none',
            default: 'pending',
            choices: {
                pending: { label: 'Pendente', sequence: 0 },
                sent: { label: 'Enviada', sequence: 1 },
                failed: { label: 'Recusada pelo Hub', sequence: 2 },
            },
        }),
        attempts: IntegerColumn({ label: 'Tentativas de envio', default: 0, readOnly: true }),
        next_retry: DateTimeColumn({ label: 'Próximo envio', readOnly: true }),
        last_status: IntegerColumn({ label: 'Último HTTP', readOnly: true }),
        last_error: StringColumn({ label: 'Último erro', maxLength: 1000, readOnly: true }),
        response: JsonColumn({ label: 'Resposta do Hub', maxLength: 65000, readOnly: true }),
        dedupe_key: StringColumn({ label: 'Chave', maxLength: 100, readOnly: true }),
        activity: ReferenceColumn({ label: 'Atividade', referenceTable: 'x_1556735_dlagent_activity', readOnly: true }),
    },
    index: [{ name: 'dlagent_outbox_status_retry', unique: false, element: ['status', 'next_retry'] }],
})

/*
 * Configuração do Agent nesta PDI (uma linha só, criada pelo AgentConfig na tela "Configurar Agent").
 * Fica numa tabela do próprio escopo porque a sys_properties (global) não deixa app escopado criar registros.
 * Dados de tabela não viajam no Update Set: atualizar o Agent não apaga a configuração do dev.
 */
export const x_1556735_dlagent_config = Table({
    name: 'x_1556735_dlagent_config',
    label: 'Configuração (Dev Lab)',
    accessibleFrom: 'package_private',
    allowWebServiceAccess: false,
    createAccessControls: true,
    userRole: userRole,
    schema: {
        hub_url: StringColumn({ label: 'URL do Hub', maxLength: 255 }),
        hub_user: StringColumn({ label: 'Usuário de integração', maxLength: 100 }),
        hub_password: Password2Column({ label: 'Senha de integração', maxLength: 255 }),
        participant_token: Password2Column({ label: 'Token do participante', maxLength: 255 }),
        last_sync: StringColumn({ label: 'Último contato com o Hub', maxLength: 40, readOnly: true }),
        pull_since: StringColumn({ label: 'Atividades sincronizadas até', maxLength: 40, readOnly: true }),
        score_cache: StringColumn({ label: 'Pontuação (cache do Hub)', maxLength: 1000, readOnly: true }),
    },
})
