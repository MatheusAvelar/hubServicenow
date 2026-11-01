import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

/*
 * Toda a lógica de servidor do Hub. Business Rules, REST, UI Actions e widgets só orquestram.
 * ActivityValidator e ScoringRules são puros (sem Glide) e têm testes locais em tests/.
 */

ScriptInclude({
    $id: Now.ID['si_activity_validator'],
    name: 'ActivityValidator',
    apiName: 'x_1556735_dlhub.ActivityValidator',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Validação pura do JSON de atividade (mesmas regras de schemas/activity.schema.json).',
    script: Now.include('../server/script-includes/ActivityValidator.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_scoring_rules'],
    name: 'ScoringRules',
    apiName: 'x_1556735_dlhub.ScoringRules',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Regras puras de pontuação e ranking.',
    script: Now.include('../server/script-includes/ScoringRules.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_token_service'],
    name: 'TokenService',
    apiName: 'x_1556735_dlhub.TokenService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Geração e hash (SHA-256) dos tokens dos participantes.',
    script: Now.include('../server/script-includes/TokenService.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_api_log_service'],
    name: 'ApiLogService',
    apiName: 'x_1556735_dlhub.ApiLogService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Registro resumido das chamadas da API (api_log).',
    script: Now.include('../server/script-includes/ApiLogService.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_activity_import_service'],
    name: 'ActivityImportService',
    apiName: 'x_1556735_dlhub.ActivityImportService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Importação de JSON, publicação e serialização de atividades.',
    script: Now.include('../server/script-includes/ActivityImportService.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_hub_dashboard_service'],
    name: 'HubDashboardService',
    apiName: 'x_1556735_dlhub.HubDashboardService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'KPIs, ranking e "Aguardando aprovação" do Painel; resumo de pontuação para o Agent.',
    script: Now.include('../server/script-includes/HubDashboardService.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_devlab_api'],
    name: 'DevLabApi',
    apiName: 'x_1556735_dlhub.DevLabApi',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Lógica dos endpoints /devlab/v1 (ping, activities, approve, results).',
    script: Now.include('../server/script-includes/DevLabApi.server.js'),
})

ScriptInclude({
    $id: Now.ID['si_hub_console_service'],
    name: 'HubConsoleService',
    apiName: 'x_1556735_dlhub.HubConsoleService',
    accessibleFrom: 'package_private',
    active: true,
    description: 'Backend da página única do Hub (x_1556735_dlhub_devlab.do): painel, atividades, importação, trilhas e participantes.',
    script: Now.include('../server/script-includes/HubConsoleService.server.js'),
})
