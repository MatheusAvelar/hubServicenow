import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

/** Dev que faz as atividades (na PDI de cada dev, normalmente o próprio admin). */
export const userRole = Role({
    $id: Now.ID['role_user'],
    name: 'x_1556735_dlagent.user',
    description: 'Dev Lab Agent — acessa o portal /devlab, aprova, valida e sincroniza atividades.',
})
