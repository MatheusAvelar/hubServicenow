import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

/* Business Rules só orquestram: a lógica está nos Script Includes. */

BusinessRule({
    $id: Now.ID['br_participant_token'],
    name: 'Gerar token do participante',
    table: 'x_1556735_dlhub_participant',
    when: 'before',
    action: ['insert'],
    order: 100,
    active: true,
    description: 'Gera o token individual no cadastro. Só o hash fica gravado; o token aparece uma vez para o instrutor.',
    script: `(function executeRule(current, previous) {
    var token = new TokenService().issue(current, true);
    gs.addInfoMessage(gs.getMessage('Token do participante (copie agora, ele não será exibido de novo): {0}', [token]));
})(current, previous);`,
})

BusinessRule({
    $id: Now.ID['br_check_total'],
    name: 'Recalcular total de pontos da atividade',
    table: 'x_1556735_dlhub_check',
    when: 'after',
    action: ['insert', 'update', 'delete'],
    order: 100,
    active: true,
    description: 'Mantém activity.total_points igual à soma dos pontos dos checks.',
    script: `(function executeRule(current, previous) {
    new ActivityImportService().recalcTotal(current.getValue('activity'));
})(current, previous);`,
})

BusinessRule({
    $id: Now.ID['br_check_published_guard'],
    name: 'Bloquear tipo inválido em atividade publicada',
    table: 'x_1556735_dlhub_check',
    when: 'before',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    description: 'Checks de atividade publicada também passam pelo ActivityValidator.',
    script: `(function executeRule(current, previous) {
    if (current.activity.state.toString() !== 'published') return;
    var params = null;
    try { params = JSON.parse(current.getValue('params') || '{}'); } catch (e) { params = null; }
    var errors = new ActivityValidator().validateCheck(current.getValue('type'), params, 'check ' + current.getValue('code'));
    if (errors.length) {
        gs.addErrorMessage(errors.join(' '));
        current.setAbortAction(true);
    }
})(current, previous);`,
})
