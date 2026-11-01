(function () {
    data.rows = [];
    data.csv = '';
    data.error = '';
    var service = new x_1556735_dlhub.HubDashboardService();
    try {
        if (input && input.action === 'export_csv') {
            data.csv = service.getRankingCsv();
            return;
        }
        data.rows = service.getRanking();
    } catch (e) {
        gs.error('[Dev Lab] Ranking: ' + e.message);
        data.error = gs.getMessage('Não foi possível carregar o ranking.');
    }
})();
