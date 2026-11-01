import '@servicenow/sdk/global'
import { Property } from '@servicenow/sdk/core'
import { userRole } from './roles.now'

/*
 * Propriedades do Agent.
 * - Iguais para todos os devs (vêm no Update Set): hub_url, hub_user, pull_interval.
 * - Do dev / de estado (isPrivate: não viajam no Update Set, então uma atualização do Agent não apaga):
 *   hub_password, participant_token, last_sync, score_cache, pull_since.
 *   São criadas pelo AgentConfig (tela "Configurar Agent" do portal) na primeira vez.
 * Nenhum segredo é versionado: hub_password e participant_token nunca têm valor aqui.
 */

Property({
    $id: Now.ID['prop_hub_url'],
    name: 'x_1556735_dlagent.hub_url',
    type: 'string',
    value: 'https://dev400642.service-now.com',
    description: 'URL da PDI do Hub (sem barra no final).',
    roles: { read: [userRole], write: ['admin'] },
})

Property({
    $id: Now.ID['prop_hub_user'],
    name: 'x_1556735_dlagent.hub_user',
    type: 'string',
    value: '',
    description: 'Usuário de integração do Hub (role x_1556735_dlhub.agent). Informado pelo instrutor.',
    roles: { read: [userRole], write: ['admin'] },
})

Property({
    $id: Now.ID['prop_pull_interval'],
    name: 'x_1556735_dlagent.pull_interval',
    type: 'integer',
    value: 30,
    description: 'Intervalo do pull de atividades, em minutos (informativo: o job roda a cada 30 min).',
    roles: { read: [userRole], write: ['admin'] },
})
