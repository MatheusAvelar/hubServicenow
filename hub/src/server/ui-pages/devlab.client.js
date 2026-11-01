/* eslint-disable no-restricted-globals, no-unsupported-node-builtins -- roda no navegador (UI Page), não no servidor */
/*
 * Dev Lab Hub — página única do instrutor. Só desenha a tela; toda regra fica no HubConsoleService,
 * chamado por POST /api/x_1556735_dlhub/console/v1/run com a sessão do usuário (X-UserToken = g_ck).
 * ES5 e DOM puro: textos sempre por textContent (nunca innerHTML com dados).
 */
(function () {
    var API = '/api/x_1556735_dlhub/console/v1/run';
    var TABS = ['painel', 'atividades', 'importar', 'trilhas', 'participantes'];
    var loaded = {};
    var validatedText = null;

    function $(id) {
        return document.getElementById(id);
    }

    /** Cria um elemento. attrs: class, text, on<evento>, demais atributos; filhos: nós ou textos. */
    function el(tag, attrs, children) {
        var node = document.createElement(tag);
        var key;
        attrs = attrs || {};
        for (key in attrs) {
            if (!attrs.hasOwnProperty(key) || attrs[key] === null || attrs[key] === undefined || attrs[key] === false) continue;
            if (key === 'class') node.className = attrs[key];
            else if (key === 'text') node.textContent = String(attrs[key]);
            else if (key.indexOf('on') === 0) node.addEventListener(key.substring(2), attrs[key]);
            else if (key === 'style') node.setAttribute('style', attrs[key]);
            else node.setAttribute(key, attrs[key] === true ? key : attrs[key]);
        }
        children = children || [];
        for (var i = 0; i < children.length; i++) {
            var c = children[i];
            if (c === null || c === undefined || c === false) continue;
            node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
        }
        return node;
    }

    function fill(container, nodes) {
        while (container.firstChild) container.removeChild(container.firstChild);
        nodes = nodes instanceof Array ? nodes : [nodes];
        for (var i = 0; i < nodes.length; i++) if (nodes[i]) container.appendChild(nodes[i]);
    }

    function api(action, params) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', API);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'application/json');
            if (window.g_ck) xhr.setRequestHeader('X-UserToken', window.g_ck);
            xhr.onload = function () {
                var data = null;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (e) {
                    data = null;
                }
                // Scripted REST embrulha o corpo em { result: ... }.
                if (data && data.result && typeof data.result === 'object' && !data.hasOwnProperty('ok')) data = data.result;
                if (xhr.status >= 200 && xhr.status < 300 && data && data.ok) resolve(data);
                else if (data && data.error) reject(data);
                else if (xhr.status === 401) reject({ error: 'Sessão expirada. Recarregue a página e entre de novo.' });
                else reject({ error: 'O Hub não respondeu como esperado (HTTP ' + xhr.status + ').' });
            };
            xhr.onerror = function () {
                reject({ error: 'Sem conexão com o Hub.' });
            };
            xhr.send(JSON.stringify({ action: action, params: params || {} }));
        });
    }

    function message(kind, text, errors) {
        var list = null;
        if (errors && errors.length) {
            list = el('ul', {}, errors.slice(0, 30).map(function (e) {
                return el('li', { text: e });
            }));
        }
        return el('div', { class: 'dl-msg ' + kind, role: kind === 'err' ? 'alert' : 'status' }, [el('strong', { text: text }), list]);
    }

    var toastTimer = null;
    function toast(kind, text, errors) {
        var box = $('dl-toast');
        fill(box, message(kind, text, errors));
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            fill(box, []);
        }, errors && errors.length ? 12000 : 5000);
    }

    function fail(err) {
        toast('err', (err && err.error) || 'Erro inesperado.', err && err.errors);
    }

    function loading(container) {
        fill(container, el('p', { class: 'dl-empty', text: 'Carregando…' }));
    }

    function busy(button, on, label) {
        if (on) {
            button.setAttribute('data-label', button.textContent);
            button.textContent = label || 'Aguarde…';
            button.disabled = true;
        } else {
            button.textContent = button.getAttribute('data-label') || button.textContent;
            button.disabled = false;
        }
    }

    function table(headers, rows) {
        return el('div', { class: 'dl-scroll' }, [
            el('table', {}, [
                el('thead', {}, [el('tr', {}, headers.map(function (h) {
                    return el('th', { scope: 'col', text: h });
                }))]),
                el('tbody', {}, rows),
            ]),
        ]);
    }

    function stateBadge(state, label) {
        var icon = state === 'published' ? '✓ ' : state === 'archived' ? '■ ' : '– ';
        return el('span', { class: 'dl-badge ' + state, text: icon + (label || state) });
    }

    // ------------------------------------------------------------------ abas

    function showTab(name, force) {
        if (TABS.indexOf(name) < 0) name = 'painel';
        for (var i = 0; i < TABS.length; i++) {
            var on = TABS[i] === name;
            $('tab-' + TABS[i]).setAttribute('aria-selected', on ? 'true' : 'false');
            $('tab-' + TABS[i]).setAttribute('tabindex', on ? '0' : '-1');
            $('panel-' + TABS[i]).hidden = !on;
        }
        if (window.location.hash !== '#' + name) {
            try {
                history.replaceState(null, '', '#' + name);
            } catch (e) {
                window.location.hash = name;
            }
        }
        if (!loaded[name] || force) {
            loaded[name] = true;
            if (LOADERS[name]) LOADERS[name]();
        }
    }

    // ----------------------------------------------------------------- painel

    function loadPainel() {
        loading($('dl-ranking'));
        api('overview').then(function (data) {
            var k = data.kpis;
            fill($('dl-kpis'), [
                kpi('Devs ativos', k.active_devs, k.inactive_devs + ' sem sincronizar há mais de 3 dias'),
                kpi('Atividades publicadas', k.published, 'em ' + k.tracks + (k.tracks === 1 ? ' trilha' : ' trilhas')),
                kpi('Conclusão média', k.completion_avg + '%', 'das atividades publicadas'),
                kpi('Aguardando aprovação', k.awaiting, k.awaiting_activity ? 'em ' + k.awaiting_activity.number : 'nenhuma publicada'),
            ]);
            renderRanking(data.ranking);
            renderAwaiting(data.awaiting);
        }, function (err) {
            fill($('dl-ranking'), message('err', err.error || 'Não foi possível carregar o painel.'));
        });
    }

    function kpi(label, value, sub) {
        return el('div', { class: 'dl-kpi' }, [
            el('div', { class: 'dl-kpi-label', text: label }),
            el('div', { class: 'dl-kpi-value', text: value }),
            el('div', { class: 'dl-kpi-sub', text: sub }),
        ]);
    }

    function renderRanking(rows) {
        if (!rows.length) {
            fill($('dl-ranking'), el('p', { class: 'dl-empty', text: 'Nenhum participante ativo ainda. Cadastre na aba Participantes.' }));
            return;
        }
        fill($('dl-ranking'), table(['#', 'Dev', 'Pontos', 'Concluídas', 'Progresso', 'Última sincronização'], rows.map(function (r) {
            return el('tr', {}, [
                el('td', { class: 'mono', text: r.position + 'º' }),
                el('td', {}, [el('span', { class: 'dl-who' }, [el('span', { class: 'dl-avatar', 'aria-hidden': 'true', text: r.initials }), r.name])]),
                el('td', { class: 'mono', text: r.points }),
                el('td', { class: 'mono', text: r.completed + ' de ' + r.total }),
                el('td', {}, [el('div', { class: 'dl-bar', role: 'img', 'aria-label': r.progress + '% concluído' }, [
                    el('span', { style: 'width: ' + r.progress + '%' }),
                ])]),
                el('td', {}, [r.last_seen_label, ' ', r.inactive ? el('span', { class: 'dl-badge warn', text: '! Inativo' }) : null]),
            ]);
        })));
    }

    function renderAwaiting(data) {
        if (!data.activity) {
            $('dl-awaiting-sub').textContent = 'Nenhuma atividade publicada.';
            fill($('dl-awaiting'), []);
            return;
        }
        $('dl-awaiting-sub').textContent = data.activity.number + ' · ' + data.activity.title +
            (data.activity.published_label ? ' — publicada ' + data.activity.published_label : '');
        if (!data.devs.length) {
            fill($('dl-awaiting'), el('p', { class: 'dl-empty', text: '✓ Todos os devs ativos já aprovaram.' }));
            return;
        }
        fill($('dl-awaiting'), el('ul', { class: 'dl-list' }, data.devs.map(function (d) {
            return el('li', {}, [
                el('span', { class: 'dl-who' }, [el('span', { class: 'dl-avatar', 'aria-hidden': 'true', text: d.initials }), d.name]),
                el('span', { class: 'dl-muted', text: 'sincronizou ' + d.last_seen_label }),
            ]);
        })));
    }

    function exportCsv() {
        var button = $('dl-csv');
        busy(button, true, 'Gerando…');
        api('ranking_csv').then(function (data) {
            busy(button, false);
            var blob = new Blob(['﻿' + data.csv], { type: 'text/csv;charset=utf-8' });
            var link = el('a', { href: URL.createObjectURL(blob), download: 'devlab-ranking.csv' });
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    // ------------------------------------------------------------- atividades

    function loadAtividades() {
        loading($('dl-activities'));
        api('activities').then(function (data) {
            if (!data.activities.length) {
                fill($('dl-activities'), el('p', { class: 'dl-empty', text: 'Nenhuma atividade ainda. Use "Nova atividade (JSON)".' }));
                return;
            }
            fill($('dl-activities'), table(['Código', 'Título', 'Trilha', 'Nível', 'Estado', 'Versão', 'Checks', 'Pontos', 'Ações'],
                data.activities.map(activityRow)));
        }, function (err) {
            fill($('dl-activities'), message('err', err.error || 'Não foi possível carregar as atividades.'));
        });
    }

    function activityRow(a) {
        var actions = [];
        if (a.state === 'published') {
            actions.push(el('button', { type: 'button', class: 'dl-btn danger small', onclick: function (ev) {
                activityAction(ev.target, 'archive', a, 'Arquivar ' + a.number + '? Ela some da lista dos devs (os resultados ficam).');
            }, text: 'Arquivar' }));
        } else {
            actions.push(el('button', { type: 'button', class: 'dl-btn small', onclick: function (ev) {
                activityAction(ev.target, 'publish', a, 'Publicar ' + a.number + ' para todos os devs?');
            }, text: 'Publicar' }));
        }
        actions.push(el('button', { type: 'button', class: 'dl-btn sec small', onclick: function (ev) {
            editJson(ev.target, a.number);
        }, text: 'Editar JSON' }));
        actions.push(el('a', { class: 'dl-btn sec small', href: 'x_1556735_dlhub_activity.do?sys_id=' + a.sys_id, target: '_blank', rel: 'noopener', text: 'Abrir registro' }));
        return el('tr', {}, [
            el('td', { class: 'mono', text: a.number }),
            el('td', { text: a.title }),
            el('td', { text: a.track }),
            el('td', { text: a.level_label }),
            el('td', {}, [stateBadge(a.state, a.state_label)]),
            el('td', { class: 'mono', text: 'v' + a.version }),
            el('td', { class: 'mono', text: a.checks }),
            el('td', { class: 'mono', text: a.total_points }),
            el('td', {}, [el('div', { class: 'dl-actions' }, actions)]),
        ]);
    }

    function activityAction(button, action, a, question) {
        if (!window.confirm(question)) return;
        busy(button, true);
        api(action, { number: a.number }).then(function () {
            toast('ok', action === 'publish' ? a.number + ' publicada.' : a.number + ' arquivada.');
            loaded.painel = false;
            loadAtividades();
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    function editJson(button, number) {
        busy(button, true);
        api('activity_json', { number: number }).then(function (data) {
            busy(button, false);
            $('dl-json').value = data.json;
            resetValidation();
            showTab('importar');
            $('dl-json').focus();
            toast('ok', 'JSON de ' + number + ' carregado. Edite, valide e importe para gerar a nova versão.');
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    // ---------------------------------------------------------------- importar

    function resetValidation() {
        validatedText = null;
        $('dl-import-draft').disabled = true;
        $('dl-import-publish').disabled = true;
        fill($('dl-validation'), []);
    }

    function validateJson() {
        var text = $('dl-json').value;
        if (!text.trim()) {
            fill($('dl-validation'), message('err', 'Cole o JSON da atividade ou escolha um arquivo.'));
            return;
        }
        var button = $('dl-validate');
        busy(button, true, 'Validando…');
        api('validate', { json: text }).then(function (data) {
            busy(button, false);
            if (!data.valid) {
                validatedText = null;
                $('dl-import-draft').disabled = true;
                $('dl-import-publish').disabled = true;
                fill($('dl-validation'), message('err', '✕ JSON com ' + data.errors.length + ' problema(s):', data.errors));
                return;
            }
            var s = data.summary;
            validatedText = text;
            $('dl-import-draft').disabled = false;
            $('dl-import-publish').disabled = false;
            var what = s.exists
                ? 'Atualiza ' + s.number + ' (hoje ' + s.current_state + ') para a versão ' + s.next_version + '.'
                : 'Cria ' + s.number + ' na versão ' + s.next_version + '.';
            fill($('dl-validation'), el('div', { class: 'dl-msg ok', role: 'status' }, [
                el('strong', { text: '✓ JSON válido. ' + what }),
                el('div', { class: 'dl-summary' }, [
                    summaryItem('Título', s.title),
                    summaryItem('Trilha', s.track),
                    summaryItem('Nível', s.level),
                    summaryItem('Checks · pontos', s.checks + ' · ' + s.points + ' pts'),
                ]),
            ]));
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    function summaryItem(label, value) {
        return el('div', {}, [el('span', { text: label }), value]);
    }

    function importJson(publish) {
        var text = $('dl-json').value;
        if (text !== validatedText) {
            resetValidation();
            fill($('dl-validation'), message('err', 'O JSON mudou depois da validação. Valide de novo.'));
            return;
        }
        var button = publish ? $('dl-import-publish') : $('dl-import-draft');
        busy(button, true, 'Importando…');
        api('import', { json: text, publish: publish }).then(function (data) {
            busy(button, false);
            resetValidation();
            var base = 'Atividade ' + data.number + (data.created ? ' criada' : ' atualizada') + ' (versão ' + data.version + ')';
            if (publish && !data.published) {
                fill($('dl-validation'), message('err', base + ', mas não foi publicada:', data.publish_errors));
            } else {
                fill($('dl-validation'), message('ok', base + (publish ? ' e publicada.' : ' como rascunho.')));
                $('dl-json').value = '';
            }
            loaded.atividades = false;
            loaded.painel = false;
            loaded.trilhas = false;
        }, function (err) {
            busy(button, false);
            fill($('dl-validation'), message('err', err.error || 'Não foi possível importar.', err.errors));
        });
    }

    function readFile(ev) {
        var file = ev.target.files && ev.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
            $('dl-json').value = String(reader.result || '');
            ev.target.value = '';
            validateJson();
        };
        reader.onerror = function () {
            fill($('dl-validation'), message('err', 'Não foi possível ler o arquivo.'));
        };
        reader.readAsText(file, 'utf-8');
    }

    // ----------------------------------------------------------------- trilhas

    function loadTrilhas() {
        loading($('dl-tracks'));
        api('tracks').then(function (data) {
            if (!data.tracks.length) {
                fill($('dl-tracks'), el('p', { class: 'dl-empty', text: 'Nenhuma trilha cadastrada.' }));
                return;
            }
            fill($('dl-tracks'), table(['Ordem', 'Nome', 'Atividades', 'Situação', 'Ações'], data.tracks.map(function (t) {
                return el('tr', {}, [
                    el('td', { class: 'mono', text: t.order }),
                    el('td', { text: t.name }),
                    el('td', { class: 'mono', text: t.activities }),
                    el('td', {}, [t.active ? el('span', { class: 'dl-badge published', text: '✓ Ativa' }) : el('span', { class: 'dl-badge draft', text: '– Inativa' })]),
                    el('td', {}, [el('div', { class: 'dl-actions' }, [
                        el('button', { type: 'button', class: 'dl-btn sec small', text: 'Renomear', onclick: function (ev) {
                            var name = window.prompt('Novo nome da trilha:', t.name);
                            if (name === null || !name.trim() || name.trim() === t.name) return;
                            saveTrack(ev.target, { sys_id: t.sys_id, name: name.trim() }, 'Trilha renomeada.');
                        } }),
                        el('button', { type: 'button', class: 'dl-btn sec small', text: t.active ? 'Desativar' : 'Ativar', onclick: function (ev) {
                            saveTrack(ev.target, { sys_id: t.sys_id, active: !t.active }, t.active ? 'Trilha desativada.' : 'Trilha ativada.');
                        } }),
                    ])]),
                ]);
            })));
        }, function (err) {
            fill($('dl-tracks'), message('err', err.error || 'Não foi possível carregar as trilhas.'));
        });
    }

    function saveTrack(button, params, okText) {
        busy(button, true);
        api('save_track', params).then(function () {
            busy(button, false);
            toast('ok', okText);
            loaded.atividades = false;
            loadTrilhas();
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    function submitTrack(ev) {
        ev.preventDefault();
        var name = $('dl-track-name').value.trim();
        if (!name) {
            toast('err', 'Informe o nome da trilha.');
            $('dl-track-name').focus();
            return;
        }
        var button = ev.target.querySelector('button[type=submit]');
        saveTrack(button, { name: name, order: parseInt($('dl-track-order').value, 10) || 0 }, 'Trilha "' + name + '" criada.');
        $('dl-track-name').value = '';
    }

    // ----------------------------------------------------------- participantes

    function loadParticipantes() {
        loading($('dl-participants'));
        api('participants').then(function (data) {
            if (!data.participants.length) {
                fill($('dl-participants'), el('p', { class: 'dl-empty', text: 'Nenhum participante cadastrado.' }));
                return;
            }
            fill($('dl-participants'), table(['Dev', 'E-mail', 'PDI', 'Agent', 'Última sincronização', 'Situação', 'Ações'],
                data.participants.map(function (p) {
                    return el('tr', {}, [
                        el('td', {}, [el('span', { class: 'dl-who' }, [el('span', { class: 'dl-avatar', 'aria-hidden': 'true', text: p.initials }), p.name])]),
                        el('td', { text: p.email || '—' }),
                        el('td', { class: 'mono', text: p.instance_url || '—' }),
                        el('td', { class: 'mono', text: p.agent_version || '—' }),
                        el('td', { text: p.last_seen_label }),
                        el('td', {}, [p.active ? el('span', { class: 'dl-badge published', text: '✓ Ativo' }) : el('span', { class: 'dl-badge draft', text: '– Inativo' })]),
                        el('td', {}, [el('div', { class: 'dl-actions' }, [
                            el('button', { type: 'button', class: 'dl-btn sec small', text: 'Novo token', onclick: function (ev) {
                                newToken(ev.target, p);
                            } }),
                            el('button', { type: 'button', class: 'dl-btn sec small', text: p.active ? 'Desativar' : 'Ativar', onclick: function (ev) {
                                toggleParticipant(ev.target, p);
                            } }),
                        ])]),
                    ]);
                })));
        }, function (err) {
            fill($('dl-participants'), message('err', err.error || 'Não foi possível carregar os participantes.'));
        });
    }

    function showToken(name, token) {
        var code = el('code', { class: 'mono', text: token });
        var copy = el('button', { type: 'button', class: 'dl-btn small', text: 'Copiar token', onclick: function (ev) {
            var done = function () {
                ev.target.textContent = '✓ Copiado';
            };
            if (navigator.clipboard) navigator.clipboard.writeText(token).then(done, function () {
                window.prompt('Copie o token:', token);
            });
            else window.prompt('Copie o token:', token);
        } });
        fill($('dl-token-box'), el('div', { class: 'dl-msg ok', role: 'status' }, [
            el('strong', { text: 'Token de ' + name + ' — copie agora, ele não será exibido de novo:' }),
            el('div', { class: 'dl-token' }, [code, copy]),
        ]));
        $('dl-token-box').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function submitParticipant(ev) {
        ev.preventDefault();
        var name = $('dl-part-name').value.trim();
        if (!name) {
            toast('err', 'Informe o nome do participante.');
            $('dl-part-name').focus();
            return;
        }
        var button = ev.target.querySelector('button[type=submit]');
        busy(button, true, 'Cadastrando…');
        api('save_participant', { name: name, email: $('dl-part-email').value, instance_url: $('dl-part-url').value }).then(function (data) {
            busy(button, false);
            $('dl-part-name').value = '';
            $('dl-part-email').value = '';
            $('dl-part-url').value = '';
            showToken(name, data.token);
            loaded.painel = false;
            loadParticipantes();
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    function newToken(button, p) {
        if (!window.confirm('Gerar novo token para ' + p.name + '? O token atual para de funcionar e o Agent dele precisa ser reconfigurado.')) return;
        busy(button, true);
        api('new_token', { sys_id: p.sys_id }).then(function (data) {
            busy(button, false);
            showToken(p.name, data.token);
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    function toggleParticipant(button, p) {
        if (p.active && !window.confirm('Desativar ' + p.name + '? O Agent dele deixa de conseguir falar com o Hub.')) return;
        busy(button, true);
        api('save_participant', { sys_id: p.sys_id, active: !p.active }).then(function () {
            toast('ok', p.name + (p.active ? ' desativado.' : ' ativado.'));
            loaded.painel = false;
            loadParticipantes();
        }, function (err) {
            busy(button, false);
            fail(err);
        });
    }

    // ------------------------------------------------------------------ início

    var LOADERS = {
        painel: loadPainel,
        atividades: loadAtividades,
        trilhas: loadTrilhas,
        participantes: loadParticipantes,
    };

    function start() {
        if (!$('dl-app')) return;
        var tabs = document.querySelectorAll('[data-tab]');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function (ev) {
                showTab(ev.currentTarget.getAttribute('data-tab'), true);
            });
            tabs[i].addEventListener('keydown', function (ev) {
                var idx = TABS.indexOf(ev.currentTarget.getAttribute('data-tab'));
                if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
                    var next = TABS[(idx + (ev.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
                    showTab(next);
                    $('tab-' + next).focus();
                }
            });
        }
        var gos = document.querySelectorAll('[data-go]');
        for (var j = 0; j < gos.length; j++) {
            gos[j].addEventListener('click', function (ev) {
                showTab(ev.currentTarget.getAttribute('data-go'));
            });
        }
        $('dl-csv').addEventListener('click', exportCsv);
        $('dl-validate').addEventListener('click', validateJson);
        $('dl-import-draft').addEventListener('click', function () {
            importJson(false);
        });
        $('dl-import-publish').addEventListener('click', function () {
            if (window.confirm('Importar e publicar para todos os devs?')) importJson(true);
        });
        $('dl-clear').addEventListener('click', function () {
            $('dl-json').value = '';
            resetValidation();
        });
        $('dl-json').addEventListener('input', function () {
            if (validatedText !== null && $('dl-json').value !== validatedText) resetValidation();
        });
        $('dl-file').addEventListener('change', readFile);
        $('dl-track-form').addEventListener('submit', submitTrack);
        $('dl-part-form').addEventListener('submit', submitParticipant);
        showTab((window.location.hash || '').replace('#', ''));
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
