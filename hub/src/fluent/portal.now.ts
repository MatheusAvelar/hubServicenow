import '@servicenow/sdk/global'
import { SPHeaderFooter, SPPage, SPTheme, SPWidget, ServicePortal } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

/*
 * Portal do Hub — /devlab_hub (só para x_1556735_dlhub.admin).
 * Widgets só chamam HubDashboardService. Ids únicos prefixados com o escopo; o sufixo de URL
 * `devlab_hub` segue o CLAUDE.md (verificar no deploy que está livre em sp_portal).
 */

const emptyController = `api.controller = function () {
    var c = this;
};`

export const hubHeader = SPHeaderFooter({
    $id: Now.ID['x_1556735_dlhub_header'],
    id: 'x_1556735_dlhub_header',
    name: 'Dev Lab Hub — Header',
    static: false,
    category: 'custom',
    description: 'Header escuro do Hub: logo, selo "Hub · Instrutor", navegação e "Nova atividade".',
    htmlTemplate: Now.include('../portal/header/template.html'),
    serverScript: Now.include('../portal/header/server_script.js'),
    clientScript: emptyController,
    customCss: Now.include('../portal/header/styles.scss'),
})

export const hubTheme = SPTheme({
    $id: Now.ID['x_1556735_dlhub_theme'],
    name: 'Dev Lab Hub',
    header: hubHeader,
    fixedHeader: true,
    fixedFooter: false,
    customCss: Now.include('../portal/theme.scss'),
})

export const kpisWidget = SPWidget({
    $id: Now.ID['x_1556735_dlhub_w_kpis'],
    id: 'x_1556735_dlhub_w_kpis',
    name: 'Dev Lab Hub — KPIs',
    description: 'Devs ativos, atividades publicadas, conclusão média e aguardando aprovação.',
    htmlTemplate: Now.include('../portal/widgets/kpis/template.html'),
    serverScript: Now.include('../portal/widgets/kpis/server_script.js'),
    clientScript: emptyController,
    customCss: Now.include('../portal/widgets/kpis/styles.scss'),
})

export const rankingWidget = SPWidget({
    $id: Now.ID['x_1556735_dlhub_w_ranking'],
    id: 'x_1556735_dlhub_w_ranking',
    name: 'Dev Lab Hub — Ranking',
    description: 'Ranking geral com progresso, última sincronização e exportação CSV.',
    htmlTemplate: Now.include('../portal/widgets/ranking/template.html'),
    serverScript: Now.include('../portal/widgets/ranking/server_script.js'),
    clientScript: Now.include('../portal/widgets/ranking/client_script.js'),
    customCss: Now.include('../portal/widgets/ranking/styles.scss'),
})

export const awaitingWidget = SPWidget({
    $id: Now.ID['x_1556735_dlhub_w_awaiting'],
    id: 'x_1556735_dlhub_w_awaiting',
    name: 'Dev Lab Hub — Aguardando aprovação',
    description: 'Devs que não aprovaram a última atividade publicada.',
    htmlTemplate: Now.include('../portal/widgets/awaiting/template.html'),
    serverScript: Now.include('../portal/widgets/awaiting/server_script.js'),
    clientScript: emptyController,
    customCss: Now.include('../portal/widgets/awaiting/styles.scss'),
})

export const painelPage = SPPage({
    pageId: 'x_1556735_dlhub_painel',
    title: 'Painel',
    public: false,
    draft: false,
    roles: [adminRole],
    containers: [
        {
            $id: Now.ID['x_1556735_dlhub_painel_c1'],
            name: 'Painel',
            width: 'container-fluid',
            order: 100,
            cssClass: 'dl-page',
            rows: [
                {
                    $id: Now.ID['x_1556735_dlhub_painel_r1'],
                    order: 100,
                    columns: [
                        {
                            $id: Now.ID['x_1556735_dlhub_painel_r1c1'],
                            size: 12,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['x_1556735_dlhub_painel_i_kpis'],
                                    widget: kpisWidget,
                                    order: 100,
                                    active: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    $id: Now.ID['x_1556735_dlhub_painel_r2'],
                    order: 200,
                    columns: [
                        {
                            $id: Now.ID['x_1556735_dlhub_painel_r2c1'],
                            size: 8,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 100,
                            instances: [
                                {
                                    $id: Now.ID['x_1556735_dlhub_painel_i_ranking'],
                                    widget: rankingWidget,
                                    order: 100,
                                    active: true,
                                },
                            ],
                        },
                        {
                            $id: Now.ID['x_1556735_dlhub_painel_r2c2'],
                            size: 4,
                            sizeSm: 12,
                            sizeXs: 12,
                            order: 200,
                            instances: [
                                {
                                    $id: Now.ID['x_1556735_dlhub_painel_i_awaiting'],
                                    widget: awaitingWidget,
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

export const hubPortal = ServicePortal({
    $id: Now.ID['x_1556735_dlhub_portal'],
    title: 'Dev Lab Hub',
    urlSuffix: 'devlab_hub',
    homePage: painelPage,
    theme: hubTheme,
    defaultPortal: false,
    enableFavorites: false,
    inactive: false,
    hidePortalName: true,
})
