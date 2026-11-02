import '@servicenow/sdk/global'
import { UiAction } from '@servicenow/sdk/core'
import { adminRole } from './roles.now'

UiAction({
    $id: Now.ID['ua_publish'],
    table: 'x_1556735_dlhub_activity',
    name: 'Publicar',
    actionName: 'x_1556735_dlhub_publish',
    hint: 'Valida a atividade e os checks e publica para os devs',
    condition: "current.state == 'draft' || current.state == 'archived'",
    showUpdate: true,
    showInsert: false,
    roles: [adminRole],
    order: 100,
    form: { showButton: true, style: 'primary' },
    script: `var result = new ActivityImportService().publish(current);
if (result.ok) {
    gs.addInfoMessage(gs.getMessage('Atividade {0} publicada.', [current.getValue('number')]));
} else {
    gs.addErrorMessage(gs.getMessage('Não foi possível publicar: {0}', [result.errors.join(' | ')]));
}
action.setRedirectURL(current);`,
})

UiAction({
    $id: Now.ID['ua_archive'],
    table: 'x_1556735_dlhub_activity',
    name: 'Arquivar',
    actionName: 'x_1556735_dlhub_archive',
    hint: 'Tira a atividade da lista dos devs (resultados são mantidos)',
    condition: "current.state == 'published'",
    showUpdate: true,
    showInsert: false,
    roles: [adminRole],
    order: 200,
    form: { showButton: true, style: 'destructive' },
    script: `current.setValue('state', 'archived');
current.update();
gs.addInfoMessage(gs.getMessage('Atividade {0} arquivada.', [current.getValue('number')]));
action.setRedirectURL(current);`,
})

UiAction({
    $id: Now.ID['ua_import_json'],
    table: 'x_1556735_dlhub_activity',
    name: 'Importar JSON',
    actionName: 'x_1556735_dlhub_import_json',
    hint: 'Cole o JSON de uma atividade (activities/*.json) para criar ou atualizar',
    roles: [adminRole],
    order: 100,
    list: { showBannerButton: true, style: 'primary' },
    script: `action.setRedirectURL('x_1556735_dlhub_devlab.do#importar');`,
})

UiAction({
    $id: Now.ID['ua_new_token'],
    table: 'x_1556735_dlhub_participant',
    name: 'Gerar novo token',
    actionName: 'x_1556735_dlhub_new_token',
    hint: 'Invalida o token atual e gera outro (o Agent do dev precisa ser reconfigurado)',
    showUpdate: true,
    showInsert: false,
    roles: [adminRole],
    order: 100,
    form: { showButton: true, style: 'destructive' },
    script: `var token = new TokenService().issue(current, false);
gs.addInfoMessage(gs.getMessage('Novo token (copie agora, ele não será exibido de novo): {0}', [token]));
action.setRedirectURL(current);`,
})
