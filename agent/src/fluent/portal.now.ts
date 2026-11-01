import '@servicenow/sdk/global'
import { SPPage, SPTheme, SPWidget, ServicePortal } from '@servicenow/sdk/core'
import { userRole } from './roles.now'

/*
 * Portal do Agent — /devlab (página Minhas Atividades). O widget só chama AgentActivityService/AgentConfig.
 * O header claro faz parte do widget (precisa do status de sincronização e do botão "Sincronizar agora").
 */

export const agentTheme = SPTheme({
    $id: Now.ID['x_1556735_dlagent_theme'],
    name: 'Dev Lab Agent',
    fixedHeader: false,
    fixedFooter: false,
    customCss: Now.include('../portal/theme.scss'),
})

export const homeWidget = SPWidget({
    $id: Now.ID['x_1556735_dlagent_w_home'],
    id: 'x_1556735_dlagent_w_home',
    name: 'Dev Lab — Minhas Atividades',
    description: 'Pontuação, lista de atividades, detalhe, Aprovar e instalar, Validar e Sincronizar agora.',
    htmlTemplate: Now.include('../portal/widgets/home/template.html'),
    serverScript: Now.include('../portal/widgets/home/server_script.js'),
    clientScript: Now.include('../portal/widgets/home/client_script.js'),
    customCss: Now.include('../portal/widgets/home/styles.scss'),
})

export const homePage = SPPage({
    pageId: 'x_1556735_dlagent_home',
    title: 'Minhas Atividades',
    public: false,
    draft: false,
    roles: [userRole],
    dynamicTitleStructure: 'Minhas Atividades - ${portal.title}',
    containers: [
        {
            $id: Now.ID['x_1556735_dlagent_home_c1'],
            name: 'Minhas Atividades',
            width: 'container',
            order: 100,
            rows: [
                {
                    $id: Now.ID['x_1556735_dlagent_home_r1'],
                    order: 100,
                    columns: [
                        {
                            $id: Now.ID['x_1556735_dlagent_home_r1c1'],
                            size: 12,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['x_1556735_dlagent_home_i_home'],
                                    widget: homeWidget,
                                    order: 100,
                                    active: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
})

export const agentPortal = ServicePortal({
    $id: Now.ID['x_1556735_dlagent_portal'],
    title: 'Dev Lab',
    urlSuffix: 'devlab',
    homePage: homePage,
    theme: agentTheme,
    defaultPortal: false,
    enableFavorites: false,
    inactive: false,
    hidePortalName: true,
})
