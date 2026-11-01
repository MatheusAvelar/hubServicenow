(function () {
    data.kpis = null;
    data.error = '';
    try {
        data.kpis = new x_1556735_dlhub.HubDashboardService().getKpis();
    } catch (e) {
        gs.error('[Dev Lab] KPIs: ' + e.message);
        data.error = gs.getMessage('Não foi possível carregar os indicadores.');
    }
})();
