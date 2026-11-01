import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/* Toda a lógica do Agent. Jobs, Script Action e widgets só chamam estes Script Includes. */

ScriptInclude({
    $id: Now.ID['si_agent_rules'],
    name: 'AgentRules',
    apiName: 'x_1556735_dlagent.AgentRules',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Regras puras: classificação da resposta do Hub, backoff, busca de texto em script, estados.',
    script: Now.include('../server/script-includes/AgentRules.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_agent_config'],
    name: 'AgentConfig',
    apiName: 'x_1556735_dlagent.AgentConfig',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Propriedades do Agent (URL, credenciais do Hub, token, cache de pontuação).',
    script: Now.include('../server/script-includes/AgentConfig.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_hub_client'],
    name: 'HubClient',
    apiName: 'x_1556735_dlagent.HubClient',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Chamadas REST ao Hub (Agent → Hub) com detecção de Hub hibernando.',
    script: Now.include('../server/script-includes/HubClient.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_outbox_service'],
    name: 'OutboxService',
    apiName: 'x_1556735_dlagent.OutboxService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Fila de envios para o Hub com retry e backoff exponencial até 12 h.',
    script: Now.include('../server/script-includes/OutboxService.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_pull_service'],
    name: 'PullService',
    apiName: 'x_1556735_dlagent.PullService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Pull de atividades e pontuação do Hub; sincronização completa (pull + flush).',
    script: Now.include('../server/script-includes/PullService.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_setup_engine'],
    name: 'SetupEngine',
    apiName: 'x_1556735_dlagent.SetupEngine',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Motor declarativo do setup (create_record em tabelas da allowlist).',
    script: Now.include('../server/script-includes/SetupEngine.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_check_engine'],
    name: 'CheckEngine',
    apiName: 'x_1556735_dlagent.CheckEngine',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Motor de checks: record_exists, business_rule, script_not_contains.',
    script: Now.include('../server/script-includes/CheckEngine.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_agent_activity_service'],
    name: 'AgentActivityService',
    apiName: 'x_1556735_dlagent.AgentActivityService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Atividades locais: lista, detalhe, aprovar e instalar, validar, sincronizar.',
    script: Now.include('../server/script-includes/AgentActivityService.server.js'),
})
