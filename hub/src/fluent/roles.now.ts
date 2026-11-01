import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

/** Instrutor: telas administrativas e portal /devlab_hub. */
export const adminRole = Role({
    $id: Now.ID['role_admin'],
    name: 'x_1556735_dlhub.admin',
    description: 'Dev Lab Hub — instrutor: cadastra trilhas, atividades, checks e participantes; vê o painel.',
})

/** Usuário de integração compartilhado: só chama os endpoints do Dev Lab (sem acesso às tabelas). */
export const agentRole = Role({
    $id: Now.ID['role_agent'],
    name: 'x_1556735_dlhub.agent',
    description: 'Dev Lab Hub — usuário de integração dos Agents: acesso somente à API /devlab/v1.',
})
