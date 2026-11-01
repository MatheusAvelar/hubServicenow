// Processing script da página "Importar JSON". Só orquestra: a regra está no ActivityImportService.
(function () {
    if (!gs.hasRole('x_1556735_dlhub.admin')) {
        gs.addErrorMessage(gs.getMessage('Sem permissão para importar atividades.'));
        response.sendRedirect('x_1556735_dlhub_activity_list.do');
        return;
    }
    var result = new ActivityImportService().importJson(activity_json);
    if (!result.ok) {
        gs.addErrorMessage(gs.getMessage('JSON rejeitado ({0} erro(s)):', [String(result.errors.length)]));
        for (var i = 0; i < result.errors.length && i < 30; i++) gs.addErrorMessage(result.errors[i]);
        response.sendRedirect('x_1556735_dlhub_import.do');
        return;
    }
    gs.addInfoMessage(gs.getMessage(result.created ? 'Atividade {0} criada (versão {1}).' : 'Atividade {0} atualizada para a versão {1}.',
        [result.number, String(result.version)]));
    response.sendRedirect('x_1556735_dlhub_activity.do?sys_id=' + result.sys_id);
})();
