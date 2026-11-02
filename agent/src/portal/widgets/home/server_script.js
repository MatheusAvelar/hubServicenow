(function () {
    // Widget "Minhas Atividades". Só orquestra: toda regra está no AgentActivityService / AgentConfig.
    var service = new x_1556735_dlagent.AgentActivityService();
    data.notice = null;

    if (input && input.action) {
        var r;
        try {
            if (input.action === 'approve') r = service.approveAndInstall(input.number);
            else if (input.action === 'validate') r = service.validate(input.number);
            else if (input.action === 'sync') r = service.requestSync();
            else if (input.action === 'configure') {
                r = new x_1556735_dlagent.AgentConfig().saveConfig(input.config);
                if (r.ok) service.requestSync();
            } else if (input.action !== 'refresh') r = { ok: false, message: 'Ação desconhecida.' };
        } catch (e) {
            gs.error('[Dev Lab Agent] Ação ' + input.action + ': ' + e.message);
            r = { ok: false, message: 'Erro inesperado. Tente de novo; se persistir, avise o instrutor.' };
        }
        data.notice = r || null;
    }

    data.status = service.getStatus();
    data.activities = service.list();
    var selected = (input && input.selected) || $sp.getParameter('lab') || '';
    if (!selected && data.activities.length) selected = data.activities[0].number;
    data.selected = selected;
    data.detail = selected ? service.detail(selected) : null;
})();
