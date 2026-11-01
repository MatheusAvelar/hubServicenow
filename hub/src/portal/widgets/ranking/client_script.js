api.controller = function () {
    var c = this;
    c.exporting = false;
    c.message = '';

    c.exportCsv = function () {
        c.exporting = true;
        c.message = '';
        c.data.action = 'export_csv';
        c.server.update().then(function () {
            c.exporting = false;
            c.data.action = null;
            if (!c.data.csv) {
                c.message = 'Não foi possível gerar o CSV.';
                return;
            }
            // BOM para o Excel reconhecer UTF-8 (acentos).
            var blob = new Blob(['﻿' + c.data.csv], { type: 'text/csv;charset=utf-8' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'devlab-ranking.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            c.data.csv = '';
        }, function () {
            c.exporting = false;
            c.message = 'Não foi possível gerar o CSV.';
        });
    };
};
