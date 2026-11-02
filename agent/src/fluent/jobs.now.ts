import '@servicenow/sdk/global'
import { Record, ScheduledScript, ScriptAction } from '@servicenow/sdk/core'

/* Jobs e evento do Agent. Só orquestram: a lógica está em PullService / OutboxService. */

ScheduledScript({
    $id: Now.ID['job_pull'],
    name: 'Dev Lab Agent — pull de atividades',
    active: true,
    frequency: 'periodically',
    executionInterval: { hours: 0, minutes: 30, seconds: 0 },
    script: `var result = new x_1556735_dlagent.PullService().pull();
if (!result.ok) gs.info('[Dev Lab Agent] Pull adiado: ' + result.message);`,
})

ScheduledScript({
    $id: Now.ID['job_flush'],
    name: 'Dev Lab Agent — envio do outbox',
    active: true,
    frequency: 'periodically',
    executionInterval: { hours: 0, minutes: 15, seconds: 0 },
    script: `var result = new x_1556735_dlagent.OutboxService().flush(false);
if (result.hubDown) gs.info('[Dev Lab Agent] Hub indisponível; ' + result.pending + ' envio(s) na fila.');`,
})

export const syncNowEvent = Record({
    $id: Now.ID['event_sync_now'],
    table: 'sysevent_register',
    data: {
        suffix: 'sync_now',
        event_name: 'x_1556735_dlagent.sync_now',
        description: 'Sincronização do Agent com o Hub (pull + flush do outbox) em segundo plano.',
        fired_by: 'AgentActivityService.requestSync (portal /devlab: Sincronizar, Aprovar, Validar)',
        priority: 100,
    },
})

ScriptAction({
    $id: Now.ID['sa_sync_now'],
    name: 'Dev Lab Agent — sincronizar agora',
    eventName: 'x_1556735_dlagent.sync_now',
    active: true,
    order: 100,
    description: 'Executa pull + flush quando o dev pede (o portal não espera o Hub responder).',
    script: `new x_1556735_dlagent.PullService().syncNow();`,
})
