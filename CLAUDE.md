# Dev Lab — Plataforma de laboratórios guiados ServiceNow

Plataforma para lançar exercícios de ServiceNow para desenvolvedores, que os executam na
própria PDI, com validação automática e pontuação centralizada.

- **Hub** (`hub/`): app escopado na PDI do Matheus (instrutor). Cadastra trilhas, atividades e
  checks, recebe resultados e mostra o ranking/progresso.
- **Agent** (`agent/`): app escopado instalado UMA vez na PDI de cada dev. Busca atividades no Hub,
  o dev aprova a instalação, o Agent aplica o setup, roda os checks localmente e envia o resultado.
- **Activities** (`activities/`): cada atividade é um JSON (dados, não código). Os arquivos do repositório
  servem de modelo/backup; a publicação acontece DENTRO do Hub (form da atividade ou importação de JSON).

**Tudo roda 100% no ServiceNow.** Nenhum servidor, banco ou serviço externo. O código local existe para
versionar, gerar os **Update Sets XML** dos dois apps e fazer o **deploy direto na PDI do Hub** (`now-sdk install`).

## Princípios inegociáveis

1. **Comunicação sempre Agent → Hub.** O Hub nunca chama as PDIs dos devs e nunca guarda credenciais delas.
2. **Atividades são declarativas.** Setup e checks são JSON interpretados por motores fixos no Agent.
   Proibido `eval`, `GlideScopedEvaluator` ou qualquer execução de script vindo do Hub.
3. **Nada é instalado sem aprovação do dev** (UI Action "Aprovar e instalar").
4. **O Hub é uma PDI e hiberna.** Toda chamada do Agent passa por uma fila (outbox) com retry/backoff.
   Nenhum fluxo pode depender do Hub estar acordado no momento.
5. **Setup só cria dados em tabelas da allowlist.** Nunca cria/altera metadados (sys_script, sys_db_object,
   sys_security_acl etc.) — esses são o que o dev deve construir.

## Stack e ferramentas

- **Deploy direto na PDI do Hub (permitido):** `npm run hub:deploy` (build + `now-sdk install` em `hub/`)
  publica o Hub em `dev400642.service-now.com`. Credenciais **só por variáveis de ambiente** lidas nativamente
  pelo SDK: `SN_SDK_INSTANCE_URL`, `SN_SDK_USER`, `SN_SDK_USER_PWD` (nunca em arquivo, commit, log ou `now-sdk auth`
  salvo no repositório). Restrições:
  - só a PDI do Hub (`dev400642`); conferir `SN_SDK_INSTANCE_URL` antes de instalar;
  - só o app `x_1556735_dlhub` — o Agent **nunca** é instalado por deploy (vai por Update Set para as PDIs dos devs);
  - nunca usar `--reinstall` (apaga dados do Hub: atividades, participantes, resultados);
  - antes do deploy: `npm run check`; subir `version` em `hub/package.json` a cada deploy;
  - depois do deploy: conferir na PDI (Table API) que os registros alterados chegaram e testar a tela afetada;
  - o `now-sdk install` abre sessão de UI: o usuário de `SN_SDK_USER` precisa ter **"Web service access only"
    desmarcado** (senão: "Only interactive users are allowed to access UI"). Enquanto estiver marcado, correção
    pontual vai por `PATCH /api/now/table/<tabela>/<sys_id>` com o conteúdo do registro em `hub/dist/app/update/`
    (mesmo sys_id), conferindo o resultado com `GET` — nunca criar/apagar registros do app por Table API;
  - o Hub é PDI e hiberna: se a instância responder HTML/instância hibernando, acordar pelo developer.servicenow.com
    (o Matheus) e tentar de novo — não insistir em loop.
- **Update Set XML** continua sendo a entrega do Agent e o backup/reinstalação do Hub, importado manualmente:
  System Update Sets → Retrieved Update Sets → Import Update Set from XML → Preview → Commit.
  Depois de cada deploy do Hub, regenerar `dist/DevLab_Hub_v1.xml` na mesma versão.
- Fonte dos apps em Fluent (`@servicenow/sdk` 4.14.0). `now-sdk build` transforma `src/` em um XML
  `<record_update>` por registro em `<app>/dist/app/` (e o pacote usado pelo `install`).
- `scripts/build-updateset.js` embrulha esses registros em `sys_update_xml` dentro de um `<unload>` com o
  `sys_remote_update_set` e grava em `dist/` (versionado):
  - `npm run updateset:prova` → `dist/DevLab_Prova_v1.xml` (pacote mínimo de prova, subconjunto do Hub com os mesmos sys_ids);
  - `npm run updateset:hub` → `dist/DevLab_Hub_v1.xml`;
  - `npm run updateset:agent` → `dist/DevLab_Agent_v1.xml`.
  Ordem de aplicação: app, roles, tabelas (coleção `_null` antes dos campos), choices, labels, scripts, REST, UI, portal, menu.
  Não entram no update set: `dictionary/` (bootstrap de instalação de app) e `sys_module` (metadados do pacote do SDK).
- Node.js só para compilar, gerar os Update Sets e validar localmente (`scripts/validate-activity.js`, `npm test`).
  A validação de verdade acontece no Hub, no Script Include `ActivityImportService`.
- Distribuição do Agent aos devs: `dist/DevLab_Agent_v1.xml` + repositório Git.
- **Nunca** commitar credenciais; `.env` no `.gitignore`.

## Estrutura do repositório

```
hubServicenow/         # repositório (github.com/MatheusAvelar/hubServicenow)
  CLAUDE.md
  package.json         # npm run check = validate + test + build dos dois apps
  tests/               # testes locais (node:test) dos Script Includes puros
  hub/                 # app Fluent - Dev Lab Hub
  agent/               # app Fluent - Dev Lab Agent
  activities/          # LAB0001.json, LAB0002.json ...
  schemas/activity.schema.json
  scripts/             # build-updateset.js, validate-activity.js
  dist/                # Update Sets XML gerados (DevLab_Prova_v1.xml, DevLab_Hub_v1.xml, DevLab_Agent_v1.xml)
  docs/                # guia de instalação do Agent para os devs, contrato da API
```

## Escopos e convenções

- Prefixo de escopo: usar o vendor prefix da PDI (`x_<prefixo>_`). Hub: `x_<prefixo>_dlhub`; Agent: `x_<prefixo>_dlagent`.
  PDI do Hub: `dev400642.service-now.com`, vendor prefix `1556735` → **`x_1556735_dlhub`** e **`x_1556735_dlagent`**.
  Limites do SDK: escopo ≤ 18 caracteres; nome de tabela ≤ 30 caracteres; toda tabela nova precisa de form padrão.
- SDK: `@servicenow/sdk` 4.14.0 (Fluent), Node ≥ 20.18; `build`/`clean` locais e `install` só no Hub. Documentação local:
  `npx now-sdk explain <tópico>`. (`now-sdk pack` gera pacote de app, não Update Set — não usar.)
- Em `Record({...})` genérico, roles vão como texto (`roles: ['x_1556735_dlhub.admin']`): objeto `Role` vira
  `[object Object]` no XML.
- UI Pages (Jelly): o build reformata atributos para aspas duplas — nunca usar aspas duplas dentro de um
  atributo (ex.: `placeholder='{ "a": 1 }'`), senão o Jelly fica inválido e a página abre em branco.
- Não usar `dynamicTitleStructure` nas páginas do portal (`${portal.title}` aparece literal no título).
- Código, nomes de campos e comentários em inglês; labels, mensagens e textos de UI em português.
- Toda lógica de servidor em Script Includes testáveis; Business Rules/REST/UI Actions só orquestram.
- Versionar: cada atividade tem `version`; o Agent informa `agent_version` em toda chamada.

## Modelo de dados — Hub

| Tabela | Campos principais |
|---|---|
| `track` (Trilha) | name, description, order, active |
| `activity` (Atividade) | number (LAB0001), title, track, level (junior/pleno/senior), description (HTML), due_date, state (draft/published/archived), version, setup (JSON), max_attempts, total_points (calculado), published_on (data da publicação — usado em "Aguardando aprovação") |
| `check` | activity, code (id do check no JSON: c1, c2…; único por atividade), order, name, type, params (JSON), points, required, hint, hint_cost |
| `participant` (Dev) | name, email, instance_url, token_hash, active, last_seen, agent_version |
| `enrollment` (Dev × Atividade) | participant, activity, state (available/approved/in_progress/completed/expired), approved_at, completed_at, score, attempts, hints_used |
| `result` (Dev × Check × Tentativa) | enrollment, check, attempt, passed, points, evidence (JSON), evidence_hash, validated_at |
| `api_log` | participant, endpoint, payload_summary, status (HTTP), created (= `sys_created_on`) |

Dashboard: ranking geral, pontuação por trilha, progresso por atividade (heatmap dev × check),
devs inativos (last_seen), atividades com maior taxa de falha por check.

## Modelo de dados — Agent

| Tabela | Uso |
|---|---|
| `activity` | cópia local da atividade (enunciado, setup, checks, versão) + state local |
| `check_result` | resultado local de cada check por tentativa |
| `outbox` | mensagens pendentes para o Hub: endpoint, payload, status, attempts, next_retry |
| Propriedades | hub_url, hub_user, hub_password (password2), participant_token (password2), pull_interval, last_sync (data/hora do último contato com sucesso), score_cache (JSON: points, rank, completed, total — devolvido pelo Hub) |

`hub_user`/`hub_password` são o usuário de integração compartilhado do Hub (Basic Auth). Se `gs.getProperty` não
devolver o valor decifrado de uma password2 no escopo, o plano B é um Basic Auth Profile preenchido pelo dev.
Também `pull_since` (server_time do último GET /activities). Só `hub_url`, `hub_user` e `pull_interval` vêm no
Update Set; as demais são privadas (criadas pelo `AgentConfig` na tela "Configurar Agent" do portal), para que
atualizar o Agent não apague a configuração do dev.

Campos extras das tabelas do Agent: `activity` também guarda checks (JSON), hub_state, approved_at, attempts, score,
best_score (do Hub) e setup_log; `outbox` também guarda kind, method, last_status, last_error, response, dedupe_key e activity.

Allowlists fixas no build (iguais no Hub e no Agent; teste em `tests/agent-rules.test.js`):
- setup `create_record`: `sys_user`, `sys_user_group`, `incident`;
- `record_exists`: `incident`, `problem`, `change_request`, `sc_req_item`, `sys_user`, `sys_user_group`, `sys_user_grmember`;
- `script_*`: `sys_script`, `sys_script_include`, `sys_script_client`.
Nova tabela = nova versão do Agent (novo cross-scope privilege) + atualizar o `ActivityValidator` do Hub.

Pull e ping são leituras periódicas (se o Hub dorme, o próximo job tenta de novo). Toda escrita no Hub
(approve, results) passa pelo outbox.

Jobs: pull de atividades (30 min), flush do outbox (15 min, backoff exponencial até 12h).
"Sincronizar agora" é assíncrono: o widget só dispara o evento `x_1556735_dlagent.sync_now`; uma Script Action
executa pull + flush. O portal nunca espera o Hub responder.
A interface do dev é o portal `/devlab` (seção Interface); as ações Aprovar e instalar, Validar e Ver dica
ficam nele, não em UI Actions de form.

## Autenticação

- Hub tem um usuário de integração compartilhado com role `x_<prefixo>_dlhub.agent` (Basic Auth),
  com acesso SOMENTE aos endpoints do Dev Lab.
- Cada dev recebe um token individual (gerado no cadastro do participant). O Hub guarda só o hash (SHA-256)
  e identifica o dev pelo header `X-DevLab-Token`.
- Token inválido/inativo → 401, registrado em `api_log`.

## Contrato da API do Hub

Base: `/api/x_<prefixo>_dlhub/devlab/v1` — todas as respostas em JSON, com `X-DevLab-Token`.
(Implementação: `RestApi` com `serviceId: 'devlab'` sem versionamento do SDK e rotas `/v1/...`, para manter
exatamente essa URL. O versionamento nativo geraria `/api/<escopo>/v1/devlab/...`.) Contrato completo em `docs/api-contract.md`.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/ping` | health check + atualiza last_seen/agent_version |
| GET | `/activities?since=<timestamp>` | atividades publicadas disponíveis para o dev |
| POST | `/activities/{number}/approve` | dev aprovou; cria/atualiza enrollment (approved_at) |
| POST | `/activities/{number}/results` | envia tentativa: lista de checks com passed/evidence |
| POST | `/activities/{number}/hint` | registra uso de dica (desconta pontos) |

Payload de resultado:
```json
{
  "activity_version": 1,
  "attempt": 2,
  "validated_at": "2026-11-01T14:00:00Z",
  "checks": [
    { "check_id": "c1", "passed": true, "evidence": { "sys_id": "...", "sys_created_on": "..." } }
  ]
}
```
O **Hub recalcula os pontos** (nunca confia em pontos enviados pelo Agent), aplica max_attempts,
prazo e custo de dicas.

## Formato da atividade (activities/*.json)

```json
{
  "number": "LAB0001",
  "version": 1,
  "track": "Business Rules",
  "title": "Prioridade automática em incidentes VIP",
  "level": "junior",
  "description": "<p>Crie uma Business Rule before insert/update ...</p>",
  "due_date": "2026-11-15",
  "max_attempts": 5,
  "setup": [
    { "action": "create_record", "table": "sys_user", "values": { "user_name": "lab.vip", "vip": true } }
  ],
  "checks": [
    { "id": "c1", "name": "BR criada na tabela incident", "type": "business_rule",
      "params": { "table": "incident", "when": "before", "active": true }, "points": 30 },
    { "id": "c2", "name": "Script usa current, sem current.update()", "type": "script_not_contains",
      "params": { "source_table": "sys_script", "filter": "collection=incident", "text": "current.update()" }, "points": 20 },
    { "id": "c3", "name": "Comportamento validado", "type": "record_exists",
      "params": { "table": "incident", "query": "caller_id.user_name=lab.vip^priority=1" }, "points": 50,
      "hint": "Verifique a condição do caller.", "hint_cost": 10 }
  ]
}
```
Publicação no Hub, sem nada fora do ServiceNow:
- **Form da atividade**: cadastro manual com a related list de checks; a UI Action "Publicar" valida e muda
  o state para published.
- **Importar JSON**: UI Action/página no Hub onde o instrutor cola o JSON da atividade.
  `ActivityImportService` valida o formato (mesmas regras de `schemas/activity.schema.json`), cria ou
  atualiza a activity e os checks e incrementa `version` se a atividade já existir.
- Nenhuma atividade publicada pode ter check de tipo desconhecido para o motor, ou setup em tabela fora da allowlist.

## Motor de checks (Agent) — tipos da v1

`table_exists`, `field_exists` (com tipo opcional), `record_exists`, `record_count` (min/max),
`business_rule`, `script_include_exists`, `client_script_exists`, `script_contains`,
`script_not_contains`, `acl_exists`, `flow_published`, `property_value`.
Fase 2: `atf_passed` (pesquisar a API oficial para executar teste/suite ATF por script server-side antes
de implementar; restringir a steps server-side).

Regras do motor:
- Cada tipo é uma função isolada num Script Include (`CheckEngine`), com params validados.
- Anti-trapaça básica: registros/metadados avaliados devem ter `sys_created_on` (ou `sys_updated_on`)
  posterior ao `approved_at`. A evidência inclui sys_id + timestamps; o Hub guarda hash da evidência.
- Erro em um check = check reprovado com mensagem, nunca derruba a validação inteira.

## Armadilha conhecida: acesso cross-scope

O Agent (escopado) precisa LER tabelas de outros escopos (sys_script, sys_db_object, sys_dictionary,
sys_security_acl, sys_hub_flow, sys_properties etc.) e CRIAR registros do setup. Declarar os
**cross-scope privileges** necessários no app e documentar em `docs/` o que o dev aceita na instalação.
Testar cedo (Fase 1) a leitura de cada tabela usada pelos checks.

## Hibernação das PDIs

- Hub hibernando: chamadas do Agent falham ou retornam página HTML → tratar como falha transitória,
  manter no outbox, aplicar retry. Detectar resposta não-JSON explicitamente.
- O instrutor acorda o Hub antes de rodadas de exercícios; docs devem explicar isso.
- PDI do dev só sincroniza quando acordada (comportamento esperado).

## Interface

Service Portal nos dois lados. Os forms clássicos ficam só para o cadastro administrativo
(trilhas, atividades, checks, participantes) no Hub.

### Identidade visual (igual nos dois portais)
- Fontes: IBM Plex Sans (texto) e IBM Plex Mono (números, códigos LAB0001, pontos). Fallback: system-ui / monospace.
- Cores: fundo `#F4F6F4`; cards `#FFFFFF`, borda `#E1E6E3`, raio 12px; texto `#16201C`; texto secundário `#56625D`;
  accent `#1F6F5C` (hover `#164F42`); accent suave `#E3F1EC`; header do Hub `#16201C`.
- Status:
  - aprovado: `#1F6F5C` sólido, ícone ✓;
  - reprovado: fundo `#F6D9D5`, borda e ícone `#A12A1F`, ícone ✕;
  - não enviado: fundo `#EEF1EF`, borda tracejada `#A5AFAA`, "–";
  - alerta/inativo: texto `#9A3A0B` em fundo `#FDEEDD`;
  - "Nova": texto `#1E3A8A` em fundo `#E0E8FB`;
  - "Em andamento": texto `#8A3A08` em fundo `#FDEEDD`;
  - "Concluída": texto `#164F42` em fundo `#E3F1EC`.
- Status nunca só por cor: sempre com ícone ou texto. Botões com no mínimo 44px de altura. Contraste de texto ≥ 4.5:1.
- Responsivo: colunas empilham em tela estreita; tabelas largas rolam horizontalmente dentro do card.
- Sem emojis e sem gradientes; ícones em SVG inline de traço. Todos os textos de UI em português.
- CSS em tema / CSS include compartilhado por portal, com as cores como variáveis CSS.

### Portal do Hub — URL `/devlab_hub`, acesso só para a role `x_<prefixo>_dlhub.admin`
Página **Painel**:
- **Header** escuro com o logo "Dev Lab", o selo "Hub · Instrutor", a navegação (Painel, Atividades, Trilhas,
  Participantes) e o botão "Nova atividade" (abre o form clássico de activity).
- **Filtro de trilha** (select), que filtra os widgets abaixo.
- **KPIs** (4 cards):
  - Devs ativos (sub: "N sem sincronizar há mais de 3 dias");
  - Atividades publicadas (sub: "em N trilhas");
  - Conclusão média (%);
  - Aguardando aprovação (na última atividade publicada).
- **Ranking**: tabela com posição, avatar de iniciais + nome, pontos, concluídas "X de Y", barra de progresso e
  última sincronização ("há 12 min"). Badge de alerta para quem está há mais de 3 dias sem sincronizar.
  Botão "Exportar CSV".
- **Checks com mais falhas**: top 3 com código da atividade, nome do check, % de reprovação e barra.
- **Aguardando aprovação**: devs que não aprovaram a última atividade publicada, com há quanto tempo foi publicada.
- **Mapa de calor da atividade selecionada**:
  - linhas = devs; colunas = checks (cabeçalho "c1 · nome (pontos)"); coluna final com o total;
  - célula = status do check na última tentativa;
  - trocar a atividade pela lista de atividades.

### Portal do Agent (PDI do dev) — URL `/devlab`
Página **Minhas Atividades**:
- **Header** claro com o logo e o selo "Minhas Atividades", o status de sincronização ("Hub sincronizado há X min ·
  N envios na fila", vindo de last_sync e do outbox) e o botão "Sincronizar agora" (executa pull + flush do outbox).
- Coluna esquerda:
  - **Card de pontuação** (fundo escuro): pontos, posição no ranking, concluídas X/Y. O Hub devolve esses
    valores nas respostas de `/ping` e `/results`, e o Agent os guarda localmente.
  - **Lista de atividades** em cards: código · trilha, título, badge de estado, meta-informação (prazo,
    tentativa X de Y, data de conclusão) e uma ação por estado:
    - Nova → botão "Aprovar e instalar";
    - Em andamento → pontuação parcial;
    - Concluída → pontuação final.
    Clicar no card abre o detalhe.
- Coluna direita — **Detalhe da atividade**:
  - Cabeçalho com código · trilha · nível, título, prazo, tentativas X de Y, data de aprovação,
    "N de M pts" e barra de progresso.
  - **Enunciado** em HTML sanitizado.
  - **Critérios avaliados**: um item por check, com ícone de status, nome, mensagem do motor (o motivo da
    reprovação, ex.: "Encontrado current.update() na linha 6 — remova em BR before.") e pontos "obtidos/máximo".
  - Botões "Validar" (ou "Validar novamente") e "Ver dica (−N pts)". A dica pede confirmação antes de descontar.
  - Atividade Nova: mostra o enunciado e os critérios sem status, com o botão "Aprovar e instalar".

### Regras de implementação da UI
- Widgets (HTML, CSS, client e server script) versionados no repositório. Verificar se a versão do SDK/Fluent em uso
  tem suporte nativo a `sp_portal`, `sp_page`, `sp_widget` e `sp_instance`; se não tiver, declarar esses registros
  pelo mecanismo genérico de registros do Fluent (Record). Confirmar na documentação oficial; não presumir.
- Server scripts dos widgets só chamam Script Includes (ex.: `HubDashboardService`, `AgentActivityService`,
  `CheckEngine`, `OutboxService`). Nenhuma regra de negócio dentro do widget.
- Ações (aprovar, validar, dica, sincronizar) via `c.server.get` / `c.server.update`, com mensagens de
  sucesso/erro em português.
- Hub hibernando: mostrar "Hub indisponível no momento — resultado salvo e será enviado automaticamente"
  (a mensagem fica no outbox).

## Roadmap

**Fase 1 — MVP**
- Hub: tabelas, roles, API (`ping`, `activities`, `approve`, `results`), cálculo de pontos.
- Portal do Hub: KPIs, ranking e "Aguardando aprovação".
- Agent: propriedades, pull, outbox com retry, motor com `record_exists`, `business_rule`, `script_not_contains`.
- Portal do Agent completo: card de pontuação, lista, detalhe, "Aprovar e instalar", "Validar", "Sincronizar agora".
- Publicação no Hub: UI Action "Publicar" + "Importar JSON" (`ActivityImportService`) + 2 atividades piloto
  (JSON em `activities/`, importados pelo Hub).
- Aceite:
  - um dev de teste aprova LAB0001 pelo portal, valida, e vê os critérios com status e motivo;
  - a pontuação aparece no ranking do Hub;
  - com o Hub hibernado, o resultado não se perde.

**Fase 2**
- Demais tipos de check, `atf_passed`, dicas com custo, prazo/expiração, max_attempts, notificações por e-mail.
- Portal do Hub: mapa de calor dev × check, checks com mais falhas, filtro de trilha, exportar CSV.

**Fase 3**
- Trilhas completas, níveis/badges, relatório individual por dev (para 1:1).

## Como trabalhar neste repositório

- Implementar fase a fase; mudanças no Hub podem ir direto para a PDI do Hub com `npm run hub:deploy` (regras acima).
  Ao fim de cada fase, gerar os Update Sets em `dist/`; o Matheus importa o Agent na PDI de dev de teste e faz o
  teste ponta a ponta (`docs/teste-ponta-a-ponta.md`).
- Antes de concluir: `npm run check` (valida atividades, testes locais, builds dos dois apps).
- Antes de criar tabela/campo novo, atualizar este arquivo (modelo de dados) e o contrato da API.
- Nunca alterar a semântica de um tipo de check existente; criar um tipo novo ou versionar.
