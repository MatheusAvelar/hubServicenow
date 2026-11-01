import '@servicenow/sdk/global'
import { CrossScopePrivilege } from '@servicenow/sdk/core'

/*
 * Cross-scope privileges do Agent — o que o dev aceita ao instalar (lista em docs/instalacao-agent.md).
 * Status 'allowed': pré-autorizados no pacote. Um registro por operação e por tabela.
 *
 * LEITURA (motor de checks): metadados que o dev constrói + tabelas do record_exists.
 * CRIAÇÃO (setup): só a allowlist do SetupEngine — nunca metadados.
 * sys_properties: leitura/gravação apenas das propriedades do próprio Agent (AgentConfig).
 */

// ---- Leitura: metadados avaliados pelos checks
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_script'], status: 'allowed', operation: 'read', targetName: 'sys_script', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_script_include'], status: 'allowed', operation: 'read', targetName: 'sys_script_include', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_script_client'], status: 'allowed', operation: 'read', targetName: 'sys_script_client', targetScope: 'global', targetType: 'sys_db_object' })

// ---- Leitura: tabelas do record_exists (CheckEngine.RECORD_TABLE_ALLOWLIST)
CrossScopePrivilege({ $id: Now.ID['csp_read_incident'], status: 'allowed', operation: 'read', targetName: 'incident', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_problem'], status: 'allowed', operation: 'read', targetName: 'problem', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_change_request'], status: 'allowed', operation: 'read', targetName: 'change_request', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_sc_req_item'], status: 'allowed', operation: 'read', targetName: 'sc_req_item', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_user'], status: 'allowed', operation: 'read', targetName: 'sys_user', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_user_group'], status: 'allowed', operation: 'read', targetName: 'sys_user_group', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_user_grmember'], status: 'allowed', operation: 'read', targetName: 'sys_user_grmember', targetScope: 'global', targetType: 'sys_db_object' })

// ---- Criação: setup (SetupEngine.TABLE_ALLOWLIST)
CrossScopePrivilege({ $id: Now.ID['csp_create_sys_user'], status: 'allowed', operation: 'create', targetName: 'sys_user', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_create_sys_user_group'], status: 'allowed', operation: 'create', targetName: 'sys_user_group', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_create_incident'], status: 'allowed', operation: 'create', targetName: 'incident', targetScope: 'global', targetType: 'sys_db_object' })

// ---- Propriedades do próprio Agent (AgentConfig)
CrossScopePrivilege({ $id: Now.ID['csp_read_sys_properties'], status: 'allowed', operation: 'read', targetName: 'sys_properties', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_write_sys_properties'], status: 'allowed', operation: 'write', targetName: 'sys_properties', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['csp_create_sys_properties'], status: 'allowed', operation: 'create', targetName: 'sys_properties', targetScope: 'global', targetType: 'sys_db_object' })
