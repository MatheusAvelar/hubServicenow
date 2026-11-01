import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acl_page_devlab: {
                        table: 'sys_security_acl'
                        id: 'd68a73bb1b2048b8a5bbd503add2695c'
                    }
                    acl_page_import: {
                        table: 'sys_security_acl'
                        id: 'df8ad84ade024f578513ba80d0380ee5'
                        deleted: true
                    }
                    acl_rest_console: {
                        table: 'sys_security_acl'
                        id: '3c76a191fa314e23bda9473a5e166c4d'
                    }
                    acl_rest_devlab: {
                        table: 'sys_security_acl'
                        id: 'b64b8dc683f840d1bdbb5e264b102724'
                    }
                    ann_setup: {
                        table: 'sys_ui_annotation'
                        id: 'eafc4075167b430cb34ea9410fbcb85b'
                    }
                    ann_token: {
                        table: 'sys_ui_annotation'
                        id: '06d17c929d1349b8a4af603fd45176e1'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '164cabbc4bc449b1a21c223da5505232'
                    }
                    br_check_published_guard: {
                        table: 'sys_script'
                        id: '0ecca07d12ba4da29afbdd9b5c729960'
                    }
                    br_check_total: {
                        table: 'sys_script'
                        id: '80f532c941cf4b58b44a38077aaeef8a'
                    }
                    br_participant_token: {
                        table: 'sys_script'
                        id: '4c3aaf7146e7443c9036c63e29efc322'
                    }
                    hdr_token_activities: {
                        table: 'sys_ws_header'
                        id: '57810b18a47948b880d62f87d290a908'
                    }
                    hdr_token_approve: {
                        table: 'sys_ws_header'
                        id: '1bafd7fe3ede4d3bb799ea8e3e3f5a6d'
                    }
                    hdr_token_ping: {
                        table: 'sys_ws_header'
                        id: 'cea734e1cac344eeb048ff51bdd79e3b'
                    }
                    hdr_token_results: {
                        table: 'sys_ws_header'
                        id: 'cea59cfd2bbc4aaba8b29ce9b024efdb'
                    }
                    menu_hub: {
                        table: 'sys_app_application'
                        id: 'c2f3a4971c2147ba878016e27b1756fe'
                    }
                    mod_activities: {
                        table: 'sys_app_module'
                        id: 'ffb5ace10489454ba76f1808e30993df'
                        deleted: true
                    }
                    mod_api_log: {
                        table: 'sys_app_module'
                        id: '542f5b6a82114186b536bb8c8e392c53'
                    }
                    mod_dashboard: {
                        table: 'sys_app_module'
                        id: 'a5ddf0c55dd242b39f197a871ebf4c3c'
                    }
                    mod_enrollments: {
                        table: 'sys_app_module'
                        id: '956e2f595c5f40838fe235f2abeba99b'
                    }
                    mod_import: {
                        table: 'sys_app_module'
                        id: '3e0edf5992b0472483b3d9b628645065'
                        deleted: true
                    }
                    mod_participants: {
                        table: 'sys_app_module'
                        id: 'dfc40a045b2a481099008ffbb00b862d'
                        deleted: true
                    }
                    mod_tracks: {
                        table: 'sys_app_module'
                        id: '229f330f74b346868f38f5ca33efbf0a'
                        deleted: true
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'c3dfed26447e43afab8e66c7ded513b5'
                    }
                    param_since: {
                        table: 'sys_ws_query_parameter'
                        id: '0daa4b5c4a7c4d7f90f1785d728867be'
                    }
                    rest_console: {
                        table: 'sys_ws_definition'
                        id: 'afdfd3e34898459cbf09f772d91c9d2d'
                    }
                    rest_devlab: {
                        table: 'sys_ws_definition'
                        id: '956b2fd7e2e344f1abd422fa4747dc72'
                    }
                    route_activities: {
                        table: 'sys_ws_operation'
                        id: 'e16731716ffd47f7a7ef10ee166aa5f2'
                    }
                    route_approve: {
                        table: 'sys_ws_operation'
                        id: '6e117c8d6a4a43419bf747384586cd3b'
                    }
                    route_console_run: {
                        table: 'sys_ws_operation'
                        id: '601a748466a643839be05ab5a08535ae'
                    }
                    route_ping: {
                        table: 'sys_ws_operation'
                        id: 'ca8fea3b1555476582d50ec9140222be'
                    }
                    route_results: {
                        table: 'sys_ws_operation'
                        id: 'd58b9e900367457abe86fd76d7c4b8a0'
                    }
                    si_activity_import_service: {
                        table: 'sys_script_include'
                        id: '9f1c8867a84543e0a56e577b8d75ecc2'
                    }
                    si_activity_validator: {
                        table: 'sys_script_include'
                        id: '4d2422c6d5044246929872b0d0f811bf'
                    }
                    si_api_log_service: {
                        table: 'sys_script_include'
                        id: '1f010fe7506048ebbdb3014e2ace1868'
                    }
                    si_devlab_api: {
                        table: 'sys_script_include'
                        id: 'b9251b74b02f4d0d944cade61352bcd4'
                    }
                    si_hub_console_service: {
                        table: 'sys_script_include'
                        id: 'b3acf65ded2e42659402ce706a4704bf'
                    }
                    si_hub_dashboard_service: {
                        table: 'sys_script_include'
                        id: '100c65778f73499aa36c10224c4ee7f7'
                    }
                    si_scoring_rules: {
                        table: 'sys_script_include'
                        id: 'f7b82beafbc64cd9850638da99ebb356'
                    }
                    si_token_service: {
                        table: 'sys_script_include'
                        id: '36967198a5af4c84a71d5955a29f19b7'
                    }
                    'src_server_script-includes_ActivityImportService_server_js': {
                        table: 'sys_module'
                        id: '291bdda5e1d0426bb969aec67437bd28'
                    }
                    'src_server_script-includes_ActivityValidator_server_js': {
                        table: 'sys_module'
                        id: '3bf24f1fa5a245008f08b21ce4e67aa8'
                    }
                    'src_server_script-includes_ApiLogService_server_js': {
                        table: 'sys_module'
                        id: 'd58a5de29c544178ac2fcdf6b2194cac'
                    }
                    'src_server_script-includes_DevLabApi_server_js': {
                        table: 'sys_module'
                        id: 'b18816ccf2f14f8fb1d7a9852f2fc952'
                    }
                    'src_server_script-includes_HubConsoleService_server_js': {
                        table: 'sys_module'
                        id: 'c770748e25f1432ab785a16e84e9c46a'
                    }
                    'src_server_script-includes_HubDashboardService_server_js': {
                        table: 'sys_module'
                        id: '1e39a120b5cf48c6bd921451f5dfefac'
                    }
                    'src_server_script-includes_ScoringRules_server_js': {
                        table: 'sys_module'
                        id: 'a45fa677c5dd44d59d1510348d28848f'
                    }
                    'src_server_script-includes_TokenService_server_js': {
                        table: 'sys_module'
                        id: 'e570553cc4f74349b6e58e2b33c0898a'
                    }
                    'src_server_ui-pages_devlab_client_js': {
                        table: 'sys_module'
                        id: 'd733cc45c9814e6198641e4051e76bdc'
                    }
                    'src_server_ui-pages_import_processing_server_js': {
                        table: 'sys_module'
                        id: '6470942253694c68ac15ecfde5204f05'
                        deleted: true
                    }
                    ua_archive: {
                        table: 'sys_ui_action'
                        id: 'cbf23a2f4c874f19a0a8b23354aa5021'
                    }
                    ua_import_json: {
                        table: 'sys_ui_action'
                        id: '0f57f431a03043e4b2c84b607ed50f69'
                    }
                    ua_new_token: {
                        table: 'sys_ui_action'
                        id: 'f08ba2a58aab49c2b0c14cbc39cd5914'
                    }
                    ua_publish: {
                        table: 'sys_ui_action'
                        id: '6939bf3f338a4e468db42e51b922bccd'
                    }
                    x_1556735_dlhub_header: {
                        table: 'sp_header_footer'
                        id: '418098e7b1314754a23261f5402db92d'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_c1: {
                        table: 'sp_container'
                        id: '6218121edad24f2faec9d9d5e2c10e51'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_i_awaiting: {
                        table: 'sp_instance'
                        id: '0a35e8938dbd4a948918e11644912e40'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_i_kpis: {
                        table: 'sp_instance'
                        id: '4b58e538d6794dba8685af8951dac061'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_i_ranking: {
                        table: 'sp_instance'
                        id: 'c537f7b4d7a24c2c9f70ec029df9b33d'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_r1: {
                        table: 'sp_row'
                        id: 'f232b6e2a8274ea48cf4e10c714890c1'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_r1c1: {
                        table: 'sp_column'
                        id: 'e5b437770f364768b9f9a75b0ea51681'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_r2: {
                        table: 'sp_row'
                        id: '6c8fead959b84484a702117d1a5c8f5c'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_r2c1: {
                        table: 'sp_column'
                        id: 'dfeec1dfe131460c8d1f848894a9efdb'
                        deleted: true
                    }
                    x_1556735_dlhub_painel_r2c2: {
                        table: 'sp_column'
                        id: 'ef7eade3153e4e68972bd3eff19a0804'
                        deleted: true
                    }
                    x_1556735_dlhub_portal: {
                        table: 'sp_portal'
                        id: 'ebae5439822647e290bbaf754b32fc1f'
                        deleted: true
                    }
                    x_1556735_dlhub_theme: {
                        table: 'sp_theme'
                        id: '801e16e189094d62ab34f5f90d120322'
                        deleted: true
                    }
                    x_1556735_dlhub_w_awaiting: {
                        table: 'sp_widget'
                        id: 'd64787a4128e466f99068af59b85789d'
                        deleted: true
                    }
                    x_1556735_dlhub_w_kpis: {
                        table: 'sp_widget'
                        id: 'eaec0994717e40af9634bf34dc9f8bbf'
                        deleted: true
                    }
                    x_1556735_dlhub_w_ranking: {
                        table: 'sp_widget'
                        id: 'e53335d94c0b45b4a1ea58398708cca9'
                        deleted: true
                    }
                }
                composite: [
                    {
                        table: 'sys_db_object'
                        id: '004ef81c76514a37aec7d5da3e104517'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0050e5159742486fa91e5acedee9f4dc'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            element: 'evidence_hash'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0094c95251a047c7922d5448f933ff61'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '019d489758e54f01a278e4640bcad53f'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'code'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '01b8373643c54d169a15f403897bb77e'
                        key: {
                            sys_ui_form: {
                                id: '360cdc4d1bae49aeba1792f6ea40381b'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                                id: 'e864bc02ba304b60ad7df80dd83e9275'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Setup'
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
                        table: 'ua_table_licensing_config'
                        id: '02814d4f50da4d178e4dd7142071d3eb'
                        key: {
                            name: 'x_1556735_dlhub_track'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '03084259ec67484bb1607a3456a74e94'
                        key: {
                            sys_security_acl: 'b64b8dc683f840d1bdbb5e264b102724'
                            sys_user_role: {
                                id: '5f2c1b35a7ac4c2596a0d709550b4279'
                                key: {
                                    name: 'x_1556735_dlhub.agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '03dad41776e34757b0876c86b9ce42ae'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '03ed2df861804bc3897eb22ab89818e1'
                        key: {
                            name: 'x_1556735_dlhub.admin'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0407fb9d509542eb857df1d8caf50e54'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'state'
                            value: 'published'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0464a0c683554fc0b7bd2dcfd6f4ff59'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '06e28b00e2844e129eceefc189921cf9'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
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
                        id: '08fcfdc85fd746b2b7e80cf86c84990f'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0a7066572cad4052bd80e3890536bceb'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                            value: 'in_progress'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a81d6d4a53c4943baef4ddf92b897a1'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'payload_summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d3d3f1e0de7436cb7bc3a306a0760e0'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'order'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0d912101eac148928a5a72ef2ef1910a'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                        table: 'sys_ui_form_section'
                        id: '0e6025a94cb64695ad3fde26678c0bf9'
                        key: {
                            sys_ui_form: {
                                id: '244f62d515c74c939213a4132c4977a3'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
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
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                        table: 'sys_choice'
                        id: '0ff19a7c580b4e67a0cc2a5d47ee263f'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'type'
                            value: 'script_not_contains'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '116385f1c3fc471a8e1bdfb4541a1446'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'last_seen'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '11692ed6dc504152b976915eec3ffba7'
                        key: {
                            sys_ui_form: {
                                id: 'a59f3a8b97a641e095fbd9d672641569'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
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
                                id: '9cd5fcb3bfaa46d2aac488d8d574b771'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Matrículas'
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
                        table: 'sys_dictionary'
                        id: '1312fcfbae9c4102949a7ff3c9f515bc'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'payload_summary'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '14ac4d52e5c44f8590b406aad7176b97'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'type'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '14f433fd68f449baa1f5bf8cbe1379fe'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'instance_url'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '14f8f9523eda40dc9766a963c296ecfd'
                        key: {
                            sys_security_acl: 'd68a73bb1b2048b8a5bbd503add2695c'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '185af8c480544289a1087f45444bc34b'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '186f91fde222467283a3d19c32f73e9b'
                        key: {
                            sys_ui_form: {
                                id: 'a59f3a8b97a641e095fbd9d672641569'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
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
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
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
                        id: '191f7dca68014b609843c2861f856f69'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1cdc6dd14af5445f9695704bca3cb848'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'published_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1d8144f7fadf47388be57caf3d9706af'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '1dea2996be344d05ac39e7d1bde0a924'
                        key: {
                            name: 'x_1556735_dlhub_track'
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
                        id: '1f6da49ff9ef43b0b3e4cb6422f6ebba'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_seen'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1fa0eb9afd3541ef8fd4e8a5f4067a89'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'instance_url'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '20049a10abb4465782e07b42a0897a28'
                        key: {
                            name: 'x_1556735_dlhub_result'
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
                        id: '208ca3ab0cbc4defbaff831c1261537f'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'order'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '2098f05e477f4e45ad0b8cc8d1eb1787'
                        key: {
                            endpoint: 'x_1556735_dlhub_devlab.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '209bb7e373ea491095ccccd0426bad30'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'level'
                            value: 'senior'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '20f2fd1e45334d079698ae32a7bd0261'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '225896fa0eb54b4a9942f0d56d1e9319'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '236c3899a9a24264a1dd5b2f9eda27ba'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '23eae3a6c2a94b6eb157e6b8f93ddc48'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                        table: 'sys_ui_element'
                        id: '24048d48f89f4ca7beefc0c535bb7a4d'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'agent_version'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '244f62d515c74c939213a4132c4977a3'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
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
                        id: '246bc138a4c24590967b6dc15096df38'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'order'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2487029587e44ef8aab1912746e62b83'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'evidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '24c9f9523fe64acea21453e890c96109'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '16'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '25de68df663c4eb485604956fbf2ef8f'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'agent_version'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '25f47f58e75a494294751295b18169c7'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
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
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2678719ccf234987909d7fe19c9a0df3'
                        key: {
                            sys_security_acl: '3c76a191fa314e23bda9473a5e166c4d'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '28c1d96840f34a77921edf158f58af8e'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                        table: 'sys_ui_element'
                        id: '29ee0972a80c42bc8975c1fe91fd0e65'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2be974f24dba462fa37a8b7dac00e9ec'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c334f12943b4c5a92ae90b6a355bf7f'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'due_date'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '2d223ae5feb743d99bd6deba95ab8fd3'
                        key: {
                            logical_table_name: 'x_1556735_dlhub_activity'
                            col_name_string: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2e9bd9be1c014e3c90ed8e844bbfe0a6'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2ea676894c664267921f7d309f6bb249'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
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
                        id: '2f0c3e54a9b048799f111c8bd0756671'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f4c8293341a4d2e81c5a28575cb9f07'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'passed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '305d5c9263ce4372a4be9f3d749c16f1'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'total_points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '308dca4c3dd54dad81632f86c4de9d97'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '31ab7feef32d4180acdecc7227a9f101'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'type'
                            value: 'record_exists'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33f355d3d91542dd8ac64c63208de379'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '346c3e6b79cc4cb0a3866172a8c9fc2d'
                        key: {
                            sys_ui_action: 'cbf23a2f4c874f19a0a8b23354aa5021'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '34d4f1e2291f4ca0a535fe9666da9eb5'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35b07feb1b914c8dba3d58a518073b71'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'attempt'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '360cdc4d1bae49aeba1792f6ea40381b'
                        key: {
                            name: 'x_1556735_dlhub_activity'
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
                        id: '3817c00ad4584f3dbe67d03cc5824044'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3906ba8a192d4cbba3402fc0b58767cf'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'endpoint'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3921af6cf66a459692f227a13fcf2ff8'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c38f60cc12c40cfafa5bb35e2353985'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '3cb3d94740704b2d8c1c2eb93627c48f'
                        key: {
                            name: 'x_1556735_dlhub_activity'
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
                        id: '3d5940bef2064b1381005bb845ddc56e'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3dcb46d26df048d8ba624fc50e9cacfa'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ws_query_parameter_map'
                        id: '3e101627363f43ac8f64d998d7cad0c1'
                        key: {
                            web_service_operation: 'e16731716ffd47f7a7ef10ee166aa5f2'
                            web_service_query_parameter: '0daa4b5c4a7c4d7f90f1785d728867be'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3ec562523cf54f8a88bc28ae3f19dd49'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '41e0675242e24106be4fca043dcb38df'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'state'
                            value: 'archived'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4267d09b19664a4ea5559e142245a7f3'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '428ba9e419474aeb855f602b5eb64b9c'
                        key: {
                            sys_ui_section: {
                                id: 'e864bc02ba304b60ad7df80dd83e9275'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Setup'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'eafc4075167b430cb34ea9410fbcb85b'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '42a6e35986444fb7a420c0f38f15c7c5'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
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
                        table: 'sys_ui_element'
                        id: '42acb6de50634f89bf87ba81644f28ce'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                        table: 'sys_ui_section'
                        id: '42acffa4084944789373f499640a1628'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            caption: 'Chamada'
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
                        id: '43cc336b7a2f49348a4d09096b33477f'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '43f0d374d9944f539ae93f7934ff10d5'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'evidence'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '440e39ecbdc54314b45c828180880a03'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'token_hash'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4450c6b4d58a4a5c839a9c426ee11960'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'track'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '45c14ff44fa3480e80dbc90ae8d9982d'
                        key: {
                            sys_ui_form: {
                                id: '360cdc4d1bae49aeba1792f6ea40381b'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                                id: 'b1d17f81c0cb4ef3ab14591f36d2995b'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Matrículas'
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
                        table: 'sys_dictionary'
                        id: '46dcf47aae4748eb939d2d28c0a440d3'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'required'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '470ae8d230e4419ca92726b8a63f6250'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hint'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '47a43330f9e84590af35ac4c1efb4000'
                        deleted: true
                        key: {
                            sys_security_acl: 'df8ad84ade024f578513ba80d0380ee5'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '499c27dfe6b74d9d8476c8a566eeabbc'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'endpoint'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4a5c18b4fd1f4bdba51ce3d8850b8bb0'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4ab196f6614e4bca9b985ca1d01f18a7'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4ca5056aa3e04a6bb91fde6c22115ec1'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                        table: 'sys_dictionary'
                        id: '4d488208528f4e49aedb5b3401047b98'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'params'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ebf72bd5e134582b198f5efd7701152'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'check'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f74f70728674b529314eaacee08722e'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'attempts'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4fda46255542427b8859d9aec44d878b'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5088fd850d6940f9b3dd2711eca604b8'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                        table: 'sys_ui_element'
                        id: '50adf35acf34437b8871077d5e93bfe5'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '510cde37d4c24e739145707b8747384d'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '53faff78e8574372a2e11e0bacb667fc'
                        key: {
                            sys_ui_form: {
                                id: '1dea2996be344d05ac39e7d1bde0a924'
                                key: {
                                    name: 'x_1556735_dlhub_track'
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
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
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
                        id: '5431fefd50bb4af796a30250dfa1ca3f'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'code'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54c09f0c1f354114bb242397229d86ef'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '551b757076c943ada67d91f5d284865d'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '554a357bd20d4de1b955aacc2d5bed4c'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '55f50cdf6418444191e1408724c01dc1'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            caption: 'Matrícula'
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
                        id: '583442586f2541d0b2f2ce054986e809'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'level'
                            value: 'pleno'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a25428851b14a0eb073c1023b04bfbb'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a5a8b4401b549b39a93b2b861379740'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5adf4ddf31d547c197eff6c6a47252ae'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5aeb4d97cd564642bb99d5f73f1f32f5'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'setup'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bd73a77404845fb8b76035ba99a6e50'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5e9d1cc459174e5691d9004039fbf903'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                        table: 'sys_user_role'
                        id: '5f2c1b35a7ac4c2596a0d709550b4279'
                        key: {
                            name: 'x_1556735_dlhub.agent'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5f6dacf029d04799886c44f1f295b2fa'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'hint_cost'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6132fb3bc7124a9397a9c595a68a9df3'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
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
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '636cc72b9ce249858085993445bf6a52'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                        table: 'sys_ui_form_section'
                        id: '63908f711dbd430982f65e9806deebce'
                        key: {
                            sys_ui_form: {
                                id: '360cdc4d1bae49aeba1792f6ea40381b'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                                id: 'fa40b8c281ec4a4b9dff75da4d9e63a4'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Checks'
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
                        id: '65178caf4d7945ecb0f78fa38e4bfcfc'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '6618359843204d7e9abb139d527a64df'
                        key: {
                            sys_ui_form: {
                                id: '20049a10abb4465782e07b42a0897a28'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                        table: 'sys_ui_page'
                        id: '667dbd67e8294b399bd33a9fb5fbf248'
                        deleted: true
                        key: {
                            endpoint: 'x_1556735_dlhub_import.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66d4606344e64224872c6575808c51bb'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'validated_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6798216dcf54427987041ddb23ef7c0e'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_ws_header_map'
                        id: '68711f11bcb24aab980ae22d2756d0ea'
                        key: {
                            web_service_operation: 'e16731716ffd47f7a7ef10ee166aa5f2'
                            web_service_header: '57810b18a47948b880d62f87d290a908'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '688952e43f7a45a2a1cfc6bd202542b8'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'level'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '688f1294fbd044a9abcf9df52a329e43'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'points'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '69dcd938900249b0a6d138573a41455e'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'track'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6b3bf1cd9c234fada16e133c8872e7eb'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'score'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6da8415a668e43b5961dc739459ece08'
                        key: {
                            name: 'x_1556735_dlhub_result'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6daf9ddb7f184cec913a5bf9b759efa2'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6e01094c606740bcbba4677cb123a96a'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'email'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e63086961ca4edfa0ebb118f9bcf8a6'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '6ee528e179e245e2bbf25751389c4811'
                        key: {
                            sys_ui_form: {
                                id: '360cdc4d1bae49aeba1792f6ea40381b'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                        id: '6fb03386edea4432ae50675e9b94d76a'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'due_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '70f2fc4766c7486092e27647382a700a'
                        key: {
                            sys_ui_action: '0f57f431a03043e4b2c84b607ed50f69'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75890f2336db448eab86de0dfab4437c'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'instance_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77d7c5c0f7d544baa059a44a00e33d29'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7861667d84474fb184b1881474008351'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'level'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '797bc70b272240168e717696ac3eb918'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            caption: 'Trilha'
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
                        id: '799f7f1d83444c2ba36bab37704f1d9c'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7a0b941e643945af9b9153515cc23104'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'level'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b48ff6e451e425bac2bd6922b01c624'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '7b80e585fad440ef94906573402e4eb6'
                        key: {
                            name: 'x_1556735_dlhub_check'
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
                        id: '7b8f7bff6579406cad9c36b0e4a9f14a'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7bfecae665654b569e94a9a40ff77468'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c08e0da491f454abf03a15c84fd60c5'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: '7d44ae164ee84d2dbbe342613550009a'
                        deleted: true
                        key: {
                            id: 'x_1556735_dlhub_painel'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d52d81249d74aba807394f9a6475b32'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'validated_at'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7de2223c1eb64988b01c4124a00dfb5a'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7f1015b188a74f3a9471c6e3a36dd482'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '8083e96a1a2f4fefbdb5ddca6ca835f8'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '821d76820ec8463e9fe8c8a4f4b557c1'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '83372f6744af40b489328d298cb1cf0c'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
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
                        table: 'sys_index'
                        id: '850cc95bf2524cf5bba8ad244412be94'
                        key: {
                            logical_table_name: 'x_1556735_dlhub_check'
                            col_name_string: 'activity,code'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '85ebfdf564e74b3198005f4136d5390b'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'total_points'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8744d2d0ea1c483b98accd195bb1ce56'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
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
                            position: '1'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '894a21a7493e480a9eca17a371c6f2cb'
                        key: {
                            name: 'x_1556735_dlhub_check'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8ae5748cbce54fa98e9a2f8189f8ddae'
                        key: {
                            sys_ui_section: {
                                id: 'e864bc02ba304b60ad7df80dd83e9275'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Setup'
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
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '8c6e8f81911543828b7cdf6a0187d8bd'
                        key: {
                            logical_table_name: 'x_1556735_dlhub_participant'
                            col_name_string: 'token_hash'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '8e1aed01796e4349bc1890cc91788d1c'
                        key: {
                            logical_table_name: 'x_1556735_dlhub_result'
                            col_name_string: 'enrollment,attempt'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8e2a224ba37e40d481f840d84598e48e'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                        id: '8ec899f40a6d40c482c2762031151aff'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'participant'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8edf79f42c4f44f1bef7b188747b4963'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8f2ef974a7254c4583ade48ded73e1da'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                        id: '8f65cc2cece94dbd86adc4972ad57d6e'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8f86f90d6aa147d9ae14cad060ff22ed'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hints_used'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9113703a050347ac8a1fe7af4a06a021'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'approved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91609f626554404d9f872e1b210fe053'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'max_attempts'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '92ae03f851b84ca1a0b9411fccb2af34'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '932c2205d2644b81a419c864f924b9c6'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'activity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94085fa70add44ee92dcb8614f30a823'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'points'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '96547c829d7c4ef1b0654b72911dcca6'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            caption: 'Check'
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
                        id: '967b94efbc3e420cbb4939b8e081b822'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                        table: 'sys_ui_element'
                        id: '97e727010d7a476eb56c13957bdca5b7'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
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
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '984de0d66bc04e3db3566de5bbfe1953'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a8416542a104a9193d172aadcf83514'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'published_on'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9b53def084bc405e8e730023e8b9aa6a'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '9cd5fcb3bfaa46d2aac488d8d574b771'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            caption: 'Matrículas'
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
                        id: '9e7c4c45695146febae3f376f6818eff'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'evidence_hash'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9f6b87e604e343d880113dd5bdfc1131'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                        table: 'sys_ui_element'
                        id: '9fdc9c8e5b7842cfbb562a31aa8989bc'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
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
                        table: 'sys_ui_form_section'
                        id: 'a1f31e34b884496393ae7a4421d6449e'
                        key: {
                            sys_ui_form: {
                                id: 'a37d977ef81f44dbb958b1a34383c0fe'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
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
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
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
                        id: 'a3453f5a66bf4da1af93aa3894ed376e'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'sys_created_on'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'a37d977ef81f44dbb958b1a34383c0fe'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
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
                        id: 'a3efa0dcd8434ae5b309ab99293d1b46'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a495c73417da4a87aa32854663593fa7'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a49c8ffd93ef4e1eb599a1093aec4503'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'enrollment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'a59f3a8b97a641e095fbd9d672641569'
                        key: {
                            name: 'x_1556735_dlhub_participant'
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
                        table: 'sys_db_object'
                        id: 'a5af30f03e934d45b5b25d3317cecf56'
                        key: {
                            name: 'x_1556735_dlhub_check'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5f5f3d135464a189365a39be734dffa'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'completed_at'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a67a0a119f624157b1dd9b4fc39ff53c'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                        table: 'sys_choice'
                        id: 'a6b7607789ab42b1bc2bf14e348db136'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'level'
                            value: 'junior'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'a890f2194d684e2d8cf35bebea6666f1'
                        key: {
                            sys_ui_form: {
                                id: '244f62d515c74c939213a4132c4977a3'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
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
                                id: '42a6e35986444fb7a420c0f38f15c7c5'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
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
                        id: 'a8a1494f8de0447f98c8d33f1b2b8a03'
                        key: {
                            sys_ui_section: {
                                id: '42a6e35986444fb7a420c0f38f15c7c5'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
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
                            element: '12M.x_1556735_dlhub_enrollment.x_1556735_dlhub_result.enrollment'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a8dfe704c2e24b139946833a1f73f2d7'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hint_cost'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a9b42c5ed1b14b769dcaf8577ff4df8c'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a9e8327167f04e55ad594a4b1ede1f03'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ab45e86bc7f2425989a717fe1c414276'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            element: 'check'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ac5e2b3521814288bd0788922dfc6784'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'acc633b76c9947118fa69078aab3b93b'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '06d17c929d1349b8a4af603fd45176e1'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae5b9ede8ce644b1888bd7fd9555ceba'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'check'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'af20a78d3050455d818f1e82eebcb75c'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'hints_used'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'af50443d2a4244929ebbe0757914e9b9'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
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
                        table: 'sys_ui_action_role'
                        id: 'b046afdf1de5424eb36e4e3ffcb7967d'
                        key: {
                            sys_ui_action: 'f08ba2a58aab49c2b0c14cbc39cd5914'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'b1d17f81c0cb4ef3ab14591f36d2995b'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            caption: 'Matrículas'
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
                        id: 'b1dc29cc544d49679b95b70f1dd88a8f'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'setup'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1e1f982fb434890b0713967ff2842d4'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'order'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b255908f56474b879bc2b191ec1f59a3'
                        key: {
                            sys_ui_section: {
                                id: 'c8117563832b4b25b9fad466f0574b73'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Participante'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2b2ac89e3204167b317152169946c9d'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'evidence_hash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b360c083c9504b07888aa6649860dbf0'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '14'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b73a06389dca49f28dcd1fb1544bc5c6'
                        key: {
                            sys_ui_section: {
                                id: '9cd5fcb3bfaa46d2aac488d8d574b771'
                                key: {
                                    name: 'x_1556735_dlhub_participant'
                                    caption: 'Matrículas'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_1556735_dlhub_participant.x_1556735_dlhub_enrollment.participant'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b9512cbf6bbb441d844ebdb7407917d5'
                        key: {
                            sys_ui_section: {
                                id: 'b1d17f81c0cb4ef3ab14591f36d2995b'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Matrículas'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_1556735_dlhub_activity.x_1556735_dlhub_enrollment.activity'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba0f268e204d468ab00cd8bf9a43e7b0'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ws_header_map'
                        id: 'ba19a45fbfaa45d0acf1832dedc55852'
                        key: {
                            web_service_operation: 'ca8fea3b1555476582d50ec9140222be'
                            web_service_header: 'cea734e1cac344eeb048ff51bdd79e3b'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bc64ba8ac6294607b9691a143d1333c4'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            element: 'published_on'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bcb4fe459222457eb1277cbd7c7dd828'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bd69d22e551f48f582cbf6de27699ad6'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdd747ad944345c1918009508becd16a'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be8e4c5ce0e44e09b3bb9f14a673dcde'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'token_hash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c08317b98bf24db1b1f4475ca6151ded'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'points'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c292ce6a3993410c8c33b3d8cdb92397'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c57fb0b6bb6047faaf44f076cd08039c'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c5b51b9172c1499699d44a0bbfb3d349'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'completed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c5ddc4b14da2460f8a07b980e6bf0243'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'hints_used'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'c618d2bb8f144c418f1e3eb188196ca3'
                        key: {
                            logical_table_name: 'x_1556735_dlhub_track'
                            col_name_string: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c6415448bd574366821bde7e37d9e089'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            element: 'enrollment'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c69f874de3d6467193bd06c2848cea64'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'activity'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'c7559795000041fcacdfe723b48970e4'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c787e931ee644d1f92b581359c3129a7'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'hint'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'c8117563832b4b25b9fad466f0574b73'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            caption: 'Participante'
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
                        table: 'sys_ws_header_map'
                        id: 'c97541a7f4444bf5b1eb30a5dfb29239'
                        key: {
                            web_service_operation: '6e117c8d6a4a43419bf747384586cd3b'
                            web_service_header: '1bafd7fe3ede4d3bb799ea8e3e3f5a6d'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ca9343fc5ee2428cb0d076996e01da38'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                        table: 'sys_ui_element'
                        id: 'cba013db1e134f078f90af91d380913f'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc2de63a8ca44f349bd3f4655728203a'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ws_header_map'
                        id: 'cc542c559c5b4ba7a43870c98eb8f4b2'
                        key: {
                            web_service_operation: 'd58b9e900367457abe86fd76d7c4b8a0'
                            web_service_header: 'cea59cfd2bbc4aaba8b29ce9b024efdb'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ccf064c3f27643d093f2d82912721392'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'participant'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cd7c779204ea45928898b164739a71d9'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'required'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cf3c81cf424b45a08ebf3f889c826601'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cf71e572a39d439bbe2eea2a5dfd301e'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'payload_summary'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'cf73718bf4844f7daaa3e808828fa54c'
                        key: {
                            name: 'x_1556735_dlhub_result'
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
                        table: 'sys_ui_action_role'
                        id: 'd365f4ea8c7e4eb7838d44ba3ad6ac0f'
                        key: {
                            sys_ui_action: '6939bf3f338a4e468db42e51b922bccd'
                            sys_user_role: {
                                id: '03ed2df861804bc3897eb22ab89818e1'
                                key: {
                                    name: 'x_1556735_dlhub.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd3d8004e2eb94c19a3e8d0563432f0eb'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                        id: 'd3e904299fdb44bda5041c9e5939faf4'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'attempt'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5a04eecd02945dbb34536ad3fec237f'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd64531c75fcf4d82984ce133df102c53'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'hint'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd693a855abf04573b2dd9928881ec76e'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'params'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd8983618e4b5497bb23951a5c8272f7f'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'required'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd8c5fdde6cd342528f27943d7d45aaad'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'last_seen'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'da035be456dd48ca999071d879414fee'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                        table: 'sys_dictionary'
                        id: 'dad98c62c4fe4843802dd79b94ba6b8d'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db8727261e354959b7e848de7eb66232'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'approved_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dc4e8773af664b5588a11b1c9e24d506'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'dc9d5535f08f4819a66acfa411b5d82e'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de56c79698e1485fa2d9c3f2048a3c3e'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'agent_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'dea5e84ff62943a29be8e24d6f9211f7'
                        key: {
                            sys_ui_section: {
                                id: '55f50cdf6418444191e1408724c01dc1'
                                key: {
                                    name: 'x_1556735_dlhub_enrollment'
                                    caption: 'Matrícula'
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
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df7b7fbfdc384648910bffac7241bf77'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e0ef25b0709e4911aad1f9668718ba62'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'type'
                            value: 'business_rule'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e1f90e8cccd548cb8e971dd35b52e090'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'enrollment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e21483414a9b4e2cb1162bd322effff8'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'max_attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e28d14f43cb84fe08a06e5157a3f8d1e'
                        key: {
                            name: 'x_1556735_dlhub_api_log'
                            element: 'participant'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e2e7baba8b4d404f9eb3fc94b20f8cc6'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e39530580e834323b607aae3bab62f85'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e4eae36f45dd4e14b17c8e0e42ed4761'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
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
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e4f701edb338453f8986f4b8b21e50c4'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'version'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e55d6a8d3da84c71b0f2173e8935a893'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e56c9201ff604a70850efe5bd44ec09a'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e5a1051c7c1c45b9824c06270f5a21c9'
                        key: {
                            name: 'x_1556735_dlhub_track'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e5d7d94c2a0540b2b066559912dcd317'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e63565de690248a28e3e1d6b39d50e9c'
                        key: {
                            sys_ui_section: {
                                id: 'cf73718bf4844f7daaa3e808828fa54c'
                                key: {
                                    name: 'x_1556735_dlhub_result'
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
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e6a14dee793240cf80a76544e5317ff0'
                        key: {
                            sys_ui_section: {
                                id: '42acffa4084944789373f499640a1628'
                                key: {
                                    name: 'x_1556735_dlhub_api_log'
                                    caption: 'Chamada'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'participant'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e78d817401d64b18aa3f1a237c5b2c3b'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'e864bc02ba304b60ad7df80dd83e9275'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            caption: 'Setup'
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
                        id: 'e958a637fb4b49b0b04010afb14d3264'
                        key: {
                            name: 'x_1556735_dlhub_track'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'e9f11bc6588445c3bb96c25d7e5be89e'
                        key: {
                            logical_table_name: 'x_1556735_dlhub_enrollment'
                            col_name_string: 'participant,activity'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'eaf96a7d74dc4953a591c185dd666b64'
                        key: {
                            sys_ui_form: {
                                id: '7b80e585fad440ef94906573402e4eb6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
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
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
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
                        table: 'sys_dictionary'
                        id: 'ec92881777474a17becca9be55bd8bbb'
                        key: {
                            name: 'x_1556735_dlhub_result'
                            element: 'passed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee2ea8d80e134cafb5b42ad4342b586d'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef386e62d8e44ee4b99b8680545c04ca'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                            value: 'expired'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0453ca5f30342f79f784fd35bfbdf5a'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'hint_cost'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f3057db7d5cf4ed5a956c102ea040dbf'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                        id: 'f578c4941f6a4f9c890e6255921fee73'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                            value: 'available'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f5c88badac794b8aaed893c2aa4d461c'
                        key: {
                            sys_ui_section: {
                                id: '96547c829d7c4ef1b0654b72911dcca6'
                                key: {
                                    name: 'x_1556735_dlhub_check'
                                    caption: 'Check'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'params'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f64ab313cdd445f8851da3d9ddbf2e78'
                        key: {
                            sys_ui_section: {
                                id: '3cb3d94740704b2d8c1c2eb93627c48f'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
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
                            position: '15'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f72f54e500bf499091e95bf667d2e2c6'
                        key: {
                            name: 'x_1556735_dlhub_result'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f73199cb9e464369a683beaa35f50fc8'
                        key: {
                            name: 'x_1556735_dlhub_participant'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f8e94bf4e3ae46069e1302f5f57eefc1'
                        key: {
                            sys_ui_section: {
                                id: '797bc70b272240168e717696ac3eb918'
                                key: {
                                    name: 'x_1556735_dlhub_track'
                                    caption: 'Trilha'
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
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f977baf017f44006a7d1fa8f206ed53b'
                        key: {
                            sys_ui_section: {
                                id: 'fa40b8c281ec4a4b9dff75da4d9e63a4'
                                key: {
                                    name: 'x_1556735_dlhub_activity'
                                    caption: 'Checks'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_1556735_dlhub_activity.x_1556735_dlhub_check.activity'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'fa40b8c281ec4a4b9dff75da4d9e63a4'
                        key: {
                            name: 'x_1556735_dlhub_activity'
                            caption: 'Checks'
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
                        id: 'fa915e6249fc4a32a9f7532fd014d29d'
                        key: {
                            name: 'x_1556735_dlhub_check'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc1d9e049b04483e91652d953855ea45'
                        key: {
                            name: 'x_1556735_dlhub_enrollment'
                            element: 'state'
                        }
                    },
                ]
            }
        }
    }
}
