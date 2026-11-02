import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '7713dccb8cf348cfbe08792645f0afad'
                    }
                    csp_create_incident: {
                        table: 'sys_scope_privilege'
                        id: '74240546d2cd4dcdb88561c1c44ca44f'
                    }
                    csp_create_sys_properties: {
                        table: 'sys_scope_privilege'
                        id: 'e59758c4819941ce9fa51b480c2f6d47'
                        deleted: true
                    }
                    csp_create_sys_user: {
                        table: 'sys_scope_privilege'
                        id: 'ec7c03bd49a54c868b72ba193c9c0f4f'
                    }
                    csp_create_sys_user_group: {
                        table: 'sys_scope_privilege'
                        id: 'cb6f5c047bff430881ee9ba76dc486d3'
                    }
                    csp_read_change_request: {
                        table: 'sys_scope_privilege'
                        id: '2a9b4a0eb25d43c1b29fc5fb30c729c7'
                    }
                    csp_read_incident: {
                        table: 'sys_scope_privilege'
                        id: '9a33837b52a244dfbaf1bc0438d47ba6'
                    }
                    csp_read_problem: {
                        table: 'sys_scope_privilege'
                        id: '4e71287ef26d4dec9cb08eb24cd71ce2'
                    }
                    csp_read_sc_req_item: {
                        table: 'sys_scope_privilege'
                        id: '991271e639a445868b7c247013b10edb'
                    }
                    csp_read_sys_properties: {
                        table: 'sys_scope_privilege'
                        id: 'a575bb801c4b40e69c8144671bfcf8ed'
                    }
                    csp_read_sys_script: {
                        table: 'sys_scope_privilege'
                        id: 'd7c295ea85b14ee0aa282115d37e697b'
                    }
                    csp_read_sys_script_client: {
                        table: 'sys_scope_privilege'
                        id: 'ede5e039206d4d46b1da5992729169bc'
                    }
                    csp_read_sys_script_include: {
                        table: 'sys_scope_privilege'
                        id: '3e1b3d7f29814c7bbcfb5e07ad9c66f2'
                    }
                    csp_read_sys_user: {
                        table: 'sys_scope_privilege'
                        id: 'ead18351248f48f48562cefa930bdb71'
                    }
                    csp_read_sys_user_grmember: {
                        table: 'sys_scope_privilege'
                        id: 'd6a0690fc448464182c633001d545e59'
                    }
                    csp_read_sys_user_group: {
                        table: 'sys_scope_privilege'
                        id: '15b48648ff5f46558a071a4614d7c169'
                    }
                    csp_write_sys_properties: {
                        table: 'sys_scope_privilege'
                        id: '46ad2cf05873479ea1b2696cd771b235'
                        deleted: true
                    }
                    event_sync_now: {
                        table: 'sysevent_register'
                        id: 'c7d4905c46dd4050b91b683f5c76b568'
                    }
                    job_flush: {
                        table: 'sysauto_script'
                        id: '07e56603d5224843af325007c45438aa'
                    }
                    job_pull: {
                        table: 'sysauto_script'
                        id: '70340674c81f487989de5ff4887e7e18'
                    }
                    menu_agent: {
                        table: 'sys_app_application'
                        id: '752ab6186eab4973936bde6d00fd8071'
                    }
                    mod_activities: {
                        table: 'sys_app_module'
                        id: '09fe9e4b80c746078e0c66a386676125'
                    }
                    mod_outbox: {
                        table: 'sys_app_module'
                        id: 'b6474ec3238e4c36b6395cbb15edcb7f'
                    }
                    mod_portal: {
                        table: 'sys_app_module'
                        id: '52ff49af2c374064a3fedfdb4e211596'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '7df1d3fc42df40e18cd7ed13081f6813'
                    }
                    prop_hub_url: {
                        table: 'sys_properties'
                        id: '59134ae17de544c0a26a34fb4a4f6f6d'
                    }
                    prop_hub_user: {
                        table: 'sys_properties'
                        id: '4f350069e6d9491b9931170c61a77594'
                    }
                    prop_pull_interval: {
                        table: 'sys_properties'
                        id: '0b916144f3cc4f49b2edfaef2debe5f3'
                    }
                    sa_sync_now: {
                        table: 'sysevent_script_action'
                        id: '5202f542b0fc4b1c9dbba729fd7b4062'
                    }
                    si_agent_activity_service: {
                        table: 'sys_script_include'
                        id: '063de155c11147b6911f65d99237d804'
                    }
                    si_agent_config: {
                        table: 'sys_script_include'
                        id: 'd6c108021d9b4294b54146428093bbd3'
                    }
                    si_agent_rules: {
                        table: 'sys_script_include'
                        id: '52e83752f6414914a288bf4dfee15c08'
                    }
                    si_check_engine: {
                        table: 'sys_script_include'
                        id: '8f1053184fbc42b49ac8b7412f661d00'
                    }
                    si_hub_client: {
                        table: 'sys_script_include'
                        id: '98d7bb74cd1a495fba8d5beea6b43f26'
                    }
                    si_outbox_service: {
                        table: 'sys_script_include'
                        id: 'ba4b905c0ea7425c86ff1a5f2538f7d1'
                    }
                    si_pull_service: {
                        table: 'sys_script_include'
                        id: '4af0054d2f1d40d7883cc0c6f28a1e13'
                    }
                    si_setup_engine: {
                        table: 'sys_script_include'
                        id: '7654ad0e031947e8bcaf186890f13100'
                    }
                    'src_server_script-includes_AgentActivityService_server_js': {
                        table: 'sys_module'
                        id: 'c9c95c6c15b24b3eb500fb74d7bbfd29'
                    }
                    'src_server_script-includes_AgentConfig_server_js': {
                        table: 'sys_module'
                        id: '7110eee876224fe5a91618c6a69c48b6'
                    }
                    'src_server_script-includes_AgentRules_server_js': {
                        table: 'sys_module'
                        id: '21e3dca91f804fa69525310ca6f0e59f'
                    }
                    'src_server_script-includes_CheckEngine_server_js': {
                        table: 'sys_module'
                        id: '3253819c6ba743c7a519e668c936990b'
                    }
                    'src_server_script-includes_HubClient_server_js': {
                        table: 'sys_module'
                        id: '3f57fc3afddb4b66b156df814d287594'
                    }
                    'src_server_script-includes_OutboxService_server_js': {
                        table: 'sys_module'
                        id: 'ea18a513632e4ff8954a51a814b002e1'
                    }
                    'src_server_script-includes_PullService_server_js': {
                        table: 'sys_module'
                        id: 'a47ea519f31c43a1b7afe4c1eadcc2aa'
                    }
                    'src_server_script-includes_SetupEngine_server_js': {
                        table: 'sys_module'
                        id: 'e926ab4208a944a6bfd3ab9ce70e9d99'
                    }
                    x_1556735_dlagent_home_c1: {
                        table: 'sp_container'
                        id: 'a5036bffc4cb48e687b497be85aef050'
                    }
                    x_1556735_dlagent_home_i_home: {
                        table: 'sp_instance'
                        id: 'f1ef00cbd36542b8af9f79283c14a9ff'
                    }
                    x_1556735_dlagent_home_r1: {
                        table: 'sp_row'
                        id: '93b4af7e8be342e29dc2cf2d3ebbc7f2'
                    }
                    x_1556735_dlagent_home_r1c1: {
                        table: 'sp_column'
                        id: '044e9f07564d412f9b3b33d5c2fe0e53'
                    }
                    x_1556735_dlagent_portal: {
                        table: 'sp_portal'
                        id: 'edc2bdad862949fe8f33aa29cfd57700'
                    }
                    x_1556735_dlagent_theme: {
                        table: 'sp_theme'
                        id: '71994796432d4704af93253fbeb98799'
                    }
                    x_1556735_dlagent_w_home: {
                        table: 'sp_widget'
                        id: '1e333279132e478c853939ff358294fd'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice'
                        id: '005877c500034bcaab786eadc9bb5ea7'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'level'
                            value: 'junior'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02bed63260ab4010a104e222923f5f1d'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '03ea645c53b145a59a4cd447dedc341f'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'state'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '041f092e15424d7aa4fa5c28627982dd'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'attempts'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '04fa758da9f94a0abd39af7576d8dab9'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'kind'
                            value: 'approve'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '06171247cfa14073aa928010c81fa785'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'setup'
                            position: '22'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '06e0dfdb22544173ac23bc0c4f21c707'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '21'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0aed5a5ab91b4bf3ae972439e57fa08f'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'total_points'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '0b7cda0d77744218b792475dcf241461'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0c74ef1a69e1493eafd2e88ec54e4153'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'status'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0e9da12c39954580bc7b16667e9f5ef7'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'evidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0f07cdce757b4e6e947d7e0005705f20'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'hub_url'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '103dc863d63f469d8f76d0fca82eafee'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'response'
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11639588d6754a1ca07798cec975999f'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'validated_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '118b756097134141ad22b664d536403f'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '125f8ade562c49f39cad96f621b72326'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_status'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '12daa5b9832441e3a5c45c89b544d394'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '139b4d51cc6d4353bbf469ea83e8f1e3'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'setup_log'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13f5df0c1bd9480ab9bd6d109406480f'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1774f978e8a8482c831f25f9369f7b7d'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'attempts'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '17d2d78591b6478380957dd61a699f9d'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'score'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1a0abf807d374b3783eb6b8aef314afa'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'version'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a4d52bd843e4f29b0a1b14fe8f61db3'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c4d1c3315dc4fdda5e279e043e4f471'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'level'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ed82937f84748d8b8b6e42446d80120'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'activity'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1efd63c267ac49bd80a5244d172b9357'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'kind'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '217f72cc3c5d40ebb501204138e61cb9'
                        key: {
                            logical_table_name: 'x_1556735_dlagent_outbox'
                            col_name_string: 'status,next_retry'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '23f5bbaeebae488f9ae2547278d206dc'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2415b39c82684ce98595500bcbd679e1'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'payload'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2a8586b2a32543fb90e7a2f1ac3a7588'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'next_retry'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e70d5ed544a4be3a0d80102ea8cc2c8'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'hub_state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2e79c8f05357441a894edbb30fb0ffe9'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2ea97bcfe81a4b539056b6e8042fb63a'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '315c778a47f14375b41eb42c59b20259'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'kind'
                            value: 'results'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34344909c9eb47119fa35d68c740b1c8'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '345b9f3fa29c4ca2918a548a9a883e39'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'response'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '352467bcb5084c2885df2caf2a02e5d7'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35e9a43987624a9f97d064ae464acacd'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'max_attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '36447ccc240f4020b8063d7005b82aa1'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hub_user'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36bdb2c1e0194d88812186a7e30431ad'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: '370b3a4500444a56a840bbf71fa692a6'
                        key: {
                            id: 'x_1556735_dlagent_home'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '37c555ef95a842a78dfeda0ac713dbe3'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'kind'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '38b2ff0d802c4deba76cfb621844a7d4'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '393b5f3cc4364190a35f4bd3c70163ca'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hub_password'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '39f3f5a4f55444818377d6a784090c8d'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'completed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '39f917d86e9d4dd48fb4a2e96fd3b42d'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a4043d3ba2c475aab43d73e8c6fc10d'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'track'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3b2a99087f0b44a29e63f985bd3e90d8'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'level'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3b4fc10224d54285a9460df95c44a156'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'evidence'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3bee48635fbf4fbeb55d34b7af52869e'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'message'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '3dffb62e31174ac2908d0c0eb6ed2059'
                        key: {
                            sys_ui_form: {
                                id: '39f917d86e9d4dd48fb4a2e96fd3b42d'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4140416e8b1545b1855951f5c109e594'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '41fff55e08f54ffc85f0ac968c8c6a3e'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'hub_password'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4295a95d6efd41beab589e5c3aea8d7a'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'pull_since'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4360729f523645a4a1105812488d72f5'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4501fb2d82d94dbb9652b62b7a7d142a'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '45761a51b0bf4d94a45bac0fa6924041'
                        key: {
                            name: 'x_1556735_dlagent_config'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45a06aa509394992a6dce9731665a915'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'hub_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '473aed7cdbc449aea32d2f2bd54f9557'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                            value: 'archived'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '48103f4457db4eafb55302772b1a7db8'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '49292448c69147979f1c9db48e985c96'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '49a227fc78b54d98aecce08a3ad5a72f'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'next_retry'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '49d11fa1125246478748de0d31df120f'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'endpoint'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '4b1160db2a384a8aa81d4f230d033b08'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'hub_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b351bd800a34d2993db8d95b72c07be'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'evidence'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d66cc471f894d23b1f497256c469996'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'last_error'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '4eddebb9851d4f45816a0f518aa1636d'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            caption: 'Resultado'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '50915418503346ddadf71d93cd800d99'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'setup'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50bf1fb85fff47b5a4eb6473e9652419'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '515677ede6b0486aa2e3e1e7eed1cfab'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'total_points'
                            position: '19'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5349dcf23e02429ebca8bf725162ddeb'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '534e8dbc40a5412bb08799a8be001dc6'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'max_points'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '54602a21ade847eeb80181fdd9219cc1'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '568eac82bb13447ca017f80425ac4731'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'best_score'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '592e85bfc2994ec893225c74f05d5877'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a405d1249684dd89bcd808b2bc05ead'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'validated_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b95ce01efae45988127d6fb78547fc6'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'passed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c3a248ca321476fa277ebac85ec4ebd'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ca680a50fd140b4bd372e111c534c5e'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'hub_user'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5d9b2af8a04e43a5b82df44b52f61022'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_error'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5e2281c65c5b45fc83e734e21e2d8475'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'max_attempts'
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5ec1550b224046c093a293470a10c9ac'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hub_url'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f522ebb96f4456eb227384c95ab8d4c'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5f8c0a8d79c14a97975b70355941402a'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'approved_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '644cceb7a62a40e68c09864f6c569d02'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                            value: 'in_progress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67f762e595f74cabba27231de863c3a0'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6945542d48f949cc9a8eefd21e8b1494'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'hub_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a0e133085cb495b86172a355cc66950'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6b31c5e63c654b369dd6ff7fd2762760'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'approved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '709e1776ff49418a9731c450423dcedc'
                        key: {
                            logical_table_name: 'x_1556735_dlagent_check_result'
                            col_name_string: 'activity,attempt'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '72352d5000d443eb961f7669162753bf'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'participant_token'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '739c190c8cf8452aa6d3ae83007c8263'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '73f327056d574b05abc806905d00923f'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'score'
                            position: '16'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '74c90240957646d5823d4cd2c303d805'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'track'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '755ecc2d8e1d49d8a06fe0014d432609'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '14'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75720027a5fc49048bca6975b4d4dbdb'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'checks'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7589eabfcae649d1a3e27d10c20ebfd6'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'score_cache'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '761f0ad744a04d16a6aeba127a595ee2'
                        key: {
                            sys_ui_section: {
                                id: 'd54f9047db3b430282a51b9bee2ea1e7'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Resultados'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_1556735_dlagent_activity.x_1556735_dlagent_check_result.activity'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '764b5828adf949ef83bcee4f83205b07'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '774e13e9ba2044f09f86863591d9a154'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                            value: 'new'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7a29cb5b9d6b41a096a4069968d27209'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e314ab8a8584e4bbc6d320e87a6d5cd'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7e5d36cd86de49edbb3e4354b79ab0f7'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80a9f38eec4e4c2792f0b9a18b8941b2'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80d3e87e73fa4973973d3782e21436c8'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'setup_log'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80f60293b3e14fd0a0118f9b6acdb684'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '811eee38a2cf49aab217188c4fb9e949'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'response'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '817cf40afda34110bbe42d7b4d89c24c'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '81d3c397c05842ee86b6213ca5e061ec'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'next_retry'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '851030681a1c41ae85797b003ccfb610'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'pull_since'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '86971b3a41d9468e870528c78c0c03a6'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'check_id'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '88109fb1063a4f149d20b4b0cc144b65'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '15'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8972f2b1271c487885166163d5c8eb7b'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'track'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8be0cf8d416a453287727018580681c7'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'attempts'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d3f10ebcb0f49af815ab4180b591017'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8e60cc86bf1d4a2c814a34eb597ac70b'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'attempt'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f6ddfbe972b4b77968bb33ac99241ae'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'hub_password'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '911dc2a0248f4d3899044ea3bb45762d'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'total_points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '922add739cf24053b635b8efbf60d605'
                        key: {
                            logical_table_name: 'x_1556735_dlagent_activity'
                            col_name_string: 'number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '93a2bcb8453d4505a16dfaae6a226039'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94c7bfd69927466a9437c98b3687b79a'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'last_sync'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96bdedd4252d45bdadba1c9769403d9b'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'payload'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9793deaadc6b4761a15fe6bfbee0bb0e'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'status'
                            value: 'sent'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '98bbd84df4324a2d84ddd1879296519f'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '98cb7c9dc92c45e8a2a66caf9e7785f2'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'max_attempts'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '99087954bd64465b9c4d297e5adefd88'
                        key: {
                            name: 'x_1556735_dlagent_config'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '9ba03ca7290c4ef9875f520bcda25937'
                        key: {
                            sys_ui_form: {
                                id: 'fb836c5c650446f39bd9023c604758e0'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9e61a613dcaa4c63891796746315fbcb'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_sync'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a100ff67ae2744a6a0b196b53dfaae91'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'last_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a1449bf26fd9469bb195e79963a362b7'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'attempt'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a31faf8cc12044e3bf8e817790246e20'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'completed_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a354078a6212414988b9ead8cabb2c01'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'participant_token'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a3f263e607f047e8b35fc80f61d2e900'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'hub_state'
                            value: 'published'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a627be4f2c8143ecb676c95df60a6326'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a7008dd036ee44398b693389a2be142a'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a7124dcd078a4d00a3cc1e05745e2a0c'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'points'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a776eb5bbf854d0198594d9e41a112cd'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'passed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a82cfd17f2a4487c92692018dccf86f2'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a85781152c794e2298190773395131bc'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'last_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a8d55980af484b17be7b662a0ba5d205'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa98a66ac85f4425875da870a695af0a'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'checks'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'abd2c1ee24e84a49989cb44035ed8f88'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'approved_at'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ac6fbcaed0d143088119ff6f0f0018a4'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae9b084ec30a491a91ee608d0b792b17'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'score_cache'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aec919f9594b4fc79b2e31c1efdc8ee7'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'due_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aefb2031ce964bc39a8378d15c570e9b'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'method'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b106e717ac354d01a074d0e9f2a25e9b'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'setup_log'
                            position: '24'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'b161e3d5ec7441a2ae54a68ddd3ecfdc'
                        key: {
                            sys_ui_form: {
                                id: '0b7cda0d77744218b792475dcf241461'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'd54f9047db3b430282a51b9bee2ea1e7'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Resultados'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b1c072cbd8be407e8a5b1df5d6eb3ca1'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'title'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b67e7e62c5964e9b86d15c98f1cdcb81'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'level'
                            value: 'pleno'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b683c6be1121419aa6d3f549c7872e21'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'participant_token'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b7356be2158540f38332becb7694393b'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'attempt'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'b8e18a0eade549b792d7081f062dbd47'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            caption: 'Configuração'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'baa97d8725d945f38d5fb62382cbea1d'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'level'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'babde0f493c14bd38207fb8cbaee742d'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bb937c2697f54e639e988f576d701acd'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'best_score'
                            position: '17'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bbe611d6ad16415f8d1d1f7372224c61'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'bd277a00a740457597fc14679c6dac2a'
                        key: {
                            sys_ui_form: {
                                id: 'e7f733ea63944366b2f9829efba0d8fb'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bda48208238c4cd482da19d00dfd9cd6'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'checks'
                            position: '23'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'be199a98d90e4186af12fa18c98cdc1e'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'status'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf79a2bb975245c68ebcd5657e039135'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c0f5ca70b81340038738cdadb3cac2c8'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'check_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c2a7e958af1f4a2f93b7f0fe07574a0b'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'best_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c4e5b91e00ba4c9fac5edb643e7fe679'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'hub_state'
                            value: 'archived'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c673c6bb0bc549ed8fc2761bd42360d9'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'setup'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c6ce1d5fefb14a6580a6d8316f2c9fc9'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c7e57d8baea6445bb2b6b834225f47d9'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc74dc3fbfae46e591c129759b88d363'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd191f7c6fc6840a89795431d01d6bf0c'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'kind'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd2ad6ccad2014215ab99e0e8551a312f'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd4bc43ed72eb444d84e8e67bc75c59e6'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'level'
                            value: 'senior'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd4e1f4ff51434d0e93cefd4254fd9571'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd51013c7ea7c418ba36e7156de411a75'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'dedupe_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'd54f9047db3b430282a51b9bee2ea1e7'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            caption: 'Resultados'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd7c1224878ad46eb86bf5ee94d3dff67'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'hub_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd897438d648c40acadeb7ff82023bf2b'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'max_points'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd9eb035207bc43108f402fb9d3d91a6d'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'validated_at'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            caption: 'Atividade'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'dd50958bd6924e70ae3449d63c321afc'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'points'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'de451cc0929a4f18b69304a003767e64'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '20'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'deffb5529f654548880cd24fa1148579'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'dedupe_key'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'df97fe48a5854b5bb68d7e996249e649'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            caption: 'Envio'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e003ab6fece943f486fed45898c883d7'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e0d428e59b2b427bb65986dab3e4315e'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e2036674968c42cf921d2dec21f8551d'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'endpoint'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e2a46a6ddacc4e30920f47ecc6886e83'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'check_id'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e2b7f5f6e1a040cb9702c993f327cf43'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'due_date'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e2d4c22b2fc647c5af8bb8db97c47f7e'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'last_sync'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e460219c53cb4cd59c848bc6ecceaeed'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5aa8bfa8441416baf7b78a2992c14af'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'max_points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'e7f733ea63944366b2f9829efba0d8fb'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e884c7fb48334b76ac0b8a3e3e6efa8f'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '18'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e8f2fb71e65a4f439d6622f466918e43'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'due_date'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'e9283d68663447b1b94c1bb516729f1d'
                        key: {
                            name: 'x_1556735_dlagent.user'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ea0054c2d01c4cfba158049c02e1e3e3'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'eadf2f8ac08647fcbf9a05c8495fc2c8'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hub_state'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb788f7632974a96b11f58516d1574b5'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'dedupe_key'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'eda86668af2b450a81f991393893558e'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'completed_at'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ee0333a7a8124fc7ac0de6220f558d00'
                        key: {
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'version'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ee410919deea45beb377b24d00fbc04f'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'passed'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ee75fd01ebf0438ca04fbbab5258d1de'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'endpoint'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ef4f1f07aa6e4bcfa04f7031d6d36dde'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'score_cache'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f0772c8e6a594eed9bf237ec9ecb3afe'
                        key: {
                            sys_ui_section: {
                                id: 'b8e18a0eade549b792d7081f062dbd47'
                                key: {
                                    name: 'x_1556735_dlagent_config'
                                    caption: 'Configuração'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f31ce27b49af41b8a9f53e1f0f79681b'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'activity'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f3e15a7b4e10446eab1a15f64b47c182'
                        key: {
                            sys_ui_section: {
                                id: 'df97fe48a5854b5bb68d7e996249e649'
                                key: {
                                    name: 'x_1556735_dlagent_outbox'
                                    caption: 'Envio'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'attempts'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'f453c94ac5c143bb9f1eb2e341d14329'
                        key: {
                            sys_ui_form: {
                                id: '0b7cda0d77744218b792475dcf241461'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'dc7556ae31564d328bcf6b6ee8b12ab6'
                                key: {
                                    name: 'x_1556735_dlagent_activity'
                                    caption: 'Atividade'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f5dc2cb9bd44425290be5c1fa3eb7d8c'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'last_error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6be1c79ceaf4bfc9029cdd3ec111ee6'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f72db073e5274c65a4085334f70440e6'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fb45922622484fe5a45a5ce50587b76d'
                        key: {
                            name: 'x_1556735_dlagent_config'
                            element: 'pull_since'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'fb836c5c650446f39bd9023c604758e0'
                        key: {
                            name: 'x_1556735_dlagent_check_result'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ff10e78eb9ae4864befc38c673bcdb6e'
                        key: {
                            sys_ui_section: {
                                id: '4eddebb9851d4f45816a0f518aa1636d'
                                key: {
                                    name: 'x_1556735_dlagent_check_result'
                                    caption: 'Resultado'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ff1fd03741f24de0b3ddb1bbc8afe086'
                        key: {
                            name: 'x_1556735_dlagent_activity'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ff376128fdb345f6930fdb2a11946145'
                        key: {
                            name: 'x_1556735_dlagent_outbox'
                            element: 'kind'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
