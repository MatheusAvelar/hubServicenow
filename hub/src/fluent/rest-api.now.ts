import '@servicenow/sdk/global'
import { Acl, RestApi } from '@servicenow/sdk/core'
import { adminRole, agentRole } from './roles.now'

/*
 * API do Hub: /api/x_1556735_dlhub/devlab/v1/...
 * - Basic Auth do usuário de integração (role x_1556735_dlhub.agent) — ACL abaixo.
 * - Dev identificado pelo header X-DevLab-Token (validado em DevLabApi).
 * Contrato: docs/api-contract.md.
 */

export const devlabApiAcl = Acl({
    $id: Now.ID['acl_rest_devlab'],
    name: 'x_1556735_dlhub.devlab_api',
    type: 'rest_endpoint',
    operation: 'execute',
    decisionType: 'allow',
    roles: [agentRole],
    adminOverrides: true,
    description: 'Somente o usuário de integração dos Agents (e admin) chama a API do Dev Lab.',
})

export const devlabApi = RestApi({
    $id: Now.ID['rest_devlab'],
    name: 'Dev Lab',
    serviceId: 'devlab',
    shortDescription: 'API do Dev Lab Hub (chamada só pelos Agents).',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [devlabApiAcl],
    routes: [
        {
            $id: Now.ID['route_ping'],
            name: 'ping',
            method: 'GET',
            path: '/v1/ping',
            enforceAcl: [devlabApiAcl],
            headers: [
                {
                    $id: Now.ID['hdr_token_ping'],
                    name: 'X-DevLab-Token',
                    required: true,
                    shortDescription: 'Token individual do dev',
                },
            ],
            script: `(function process(request, response) {
    new DevLabApi().handle('ping', request, response);
})(request, response);`,
        },
        {
            $id: Now.ID['route_activities'],
            name: 'activities',
            method: 'GET',
            path: '/v1/activities',
            enforceAcl: [devlabApiAcl],
            headers: [
                {
                    $id: Now.ID['hdr_token_activities'],
                    name: 'X-DevLab-Token',
                    required: true,
                    shortDescription: 'Token individual do dev',
                },
            ],
            parameters: [
                {
                    $id: Now.ID['param_since'],
                    name: 'since',
                    required: false,
                    shortDescription: 'Só atividades alteradas depois deste momento (ISO 8601, UTC)',
                },
            ],
            script: `(function process(request, response) {
    new DevLabApi().handle('activities', request, response);
})(request, response);`,
        },
        {
            $id: Now.ID['route_approve'],
            name: 'approve',
            method: 'POST',
            path: '/v1/activities/{number}/approve',
            enforceAcl: [devlabApiAcl],
            headers: [
                {
                    $id: Now.ID['hdr_token_approve'],
                    name: 'X-DevLab-Token',
                    required: true,
                    shortDescription: 'Token individual do dev',
                },
            ],
            script: `(function process(request, response) {
    new DevLabApi().handle('approve', request, response);
})(request, response);`,
        },
        {
            $id: Now.ID['route_results'],
            name: 'results',
            method: 'POST',
            path: '/v1/activities/{number}/results',
            enforceAcl: [devlabApiAcl],
            headers: [
                {
                    $id: Now.ID['hdr_token_results'],
                    name: 'X-DevLab-Token',
                    required: true,
                    shortDescription: 'Token individual do dev',
                },
            ],
            script: `(function process(request, response) {
    new DevLabApi().handle('results', request, response);
})(request, response);`,
        },
    ],
})

/*
 * Backend da página única do Hub: POST /api/x_1556735_dlhub/console/v1/run com { action, params }.
 * Só o instrutor (role admin do Hub), com a sessão da página (X-UserToken). Lógica no HubConsoleService.
 */
export const consoleApiAcl = Acl({
    $id: Now.ID['acl_rest_console'],
    name: 'x_1556735_dlhub.console_api',
    type: 'rest_endpoint',
    operation: 'execute',
    decisionType: 'allow',
    roles: [adminRole],
    adminOverrides: true,
    description: 'Só o instrutor chama o backend da página do Hub.',
})

export const consoleApi = RestApi({
    $id: Now.ID['rest_console'],
    name: 'Dev Lab Console',
    serviceId: 'console',
    shortDescription: 'Backend da página do Hub (somente instrutor).',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [consoleApiAcl],
    routes: [
        {
            $id: Now.ID['route_console_run'],
            name: 'run',
            method: 'POST',
            path: '/v1/run',
            enforceAcl: [consoleApiAcl],
            script: `(function process(request, response) {
    new HubConsoleService().handle(request, response);
})(request, response);`,
        },
    ],
})
