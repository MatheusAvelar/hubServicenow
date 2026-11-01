(function () {
    data.result = { activity: null, devs: [] };
    data.error = '';
    try {
        data.result = new x_1556735_dlhub.HubDashboardService().getAwaitingApproval();
    } catch (e) {
        gs.error('[Dev Lab] Aguardando aprovação: ' + e.message);
        data.error = gs.getMessage('Não foi possível carregar a lista.');
    }
})();
