# Teste ponta a ponta — Fase 1

Hub: `dev400642.service-now.com` (PDI do instrutor). Dev de teste: uma segunda PDI.
**Nenhum deploy é feito sem o instrutor pedir.**

## 0. Pré-checagens (antes do primeiro deploy)

Com `now-sdk auth` configurado para o Hub (credenciais fora do repositório):

```bash
npx now-sdk query sp_portal -q 'url_suffix=devlab_hub' -f 'sys_id' -o json
npx now-sdk query sp_page -q 'idSTARTSWITHx_1556735_' -f 'sys_id,id' -o json
npx now-sdk query sys_scope -q 'scope=x_1556735_dlhub^ORscope=x_1556735_dlagent' -f 'sys_id,scope' -o json
```

Todas devem voltar vazias. Na PDI de teste, repetir para `url_suffix=devlab`.

## 1. Hub

1. `cd hub && npm run build && npm run deploy`.
2. Criar o usuário de integração (ex.: `devlab.agent`), marcar **Web service access only**, dar a role
   `x_1556735_dlhub.agent` e definir a senha.
3. Dar `x_1556735_dlhub.admin` ao instrutor.
4. **Dev Lab Hub → Participantes → Novo**: nome/e-mail do dev de teste → salvar → **copiar o token** (aparece uma vez).
5. **Importar JSON**: colar `activities/LAB0001.json` e depois `LAB0002.json` → abrir cada uma → **Publicar**.
6. Abrir `/devlab_hub`: KPIs com 2 publicadas, ranking com o dev (0 pts, "nunca"), "Aguardando aprovação" com o dev.

## 2. Agent na PDI de teste

1. `cd agent && npm run build && npm run deploy` (com `auth` apontando para a PDI de teste), ou importar o Update Set.
2. Conferir em **Application Cross-Scope Access** que os privilégios estão **Allowed**.
3. Abrir `/devlab` → **Configurar Agent** (usuário/senha de integração + token) → salvar.
4. Em segundos: header "Hub sincronizado agora · nenhum envio na fila", LAB0001 e LAB0002 como **Nova**.

## 3. Aceite 1 — aprovar, validar, ver critérios com motivo

1. LAB0001 → **Aprovar e instalar** → o confirm lista `sys_user (user_name=lab.vip)`.
   Esperado: usuário `lab.vip` criado; a atividade fica "Em andamento"; o Hub mostra a matrícula aprovada.
2. **Validar** sem fazer nada → c1 ✕ ("Nenhuma Business Rule criada após a aprovação…"), c2 ✕ ("Nenhum script seu…"),
   c3 ✕ → 0 de 100 pts.
3. Criar uma BR before em `incident` **com** `current.update()` → Validar → c1 ✓, c2 ✕
   "Encontrado current.update() na linha N de Business Rule "…" — remova em BR before."
4. Remover o `current.update()`, criar um incidente com caller `lab.vip` → Validar novamente → c1 ✓ c2 ✓ c3 ✓ → Concluída.

## 4. Aceite 2 — pontuação no ranking do Hub

- `/devlab_hub`: o dev com 100 pts, "1 de 2" concluídas, última sincronização "agora".
- Hub: **Matrículas** → LAB0001 com score 100, attempts 3, state completed. **Log da API** com as chamadas (200).
- Agent: card de pontuação com 100 pts e posição 1º (vindos do Hub).

## 5. Aceite 3 — Hub hibernado não perde resultado

O ideal é hibernar o Hub de verdade (Developer Portal → instância → Hibernate). Para simular sem esperar, mude
temporariamente `x_1556735_dlagent.hub_url` na PDI de teste para outra instância (ex.: a URL da própria PDI de teste):
a resposta não será o JSON do Dev Lab e deve cair no mesmo caminho de falha transitória.

1. LAB0002 → Aprovar e instalar → construir a solução → Validar.
2. Esperado no portal: "Hub indisponível no momento — resultado salvo e será enviado automaticamente";
   header com "2 envios na fila". **Outbox**: status Pendente, tentativas 1, próximo envio +15 min, último erro
   "Hub respondeu sem JSON…".
3. **Sincronizar agora** de novo → tentativas 2, próximo envio +30 min (backoff).
4. Restaurar o `hub_url` (ou acordar o Hub) → **Sincronizar agora** → outbox "Enviada"; o ranking do Hub soma os pontos
   da LAB0002.
5. Reenvio idempotente: na lista do Outbox, mudar uma mensagem enviada de volta para Pendente e sincronizar.
   O Hub responde `duplicate: true` e não conta de novo.

## 6. Negativos

- Token errado no Agent → outbox com "Token recusado pelo Hub (401)"; o Hub registra 401 no `api_log`.
- Importar JSON com `"table": "sys_script"` no setup, ou com um check `"type": "atf_passed"` → rejeitado com a mensagem.
- Participante desativado no Hub → 401.
- Atividade arquivada no Hub → some do `/devlab` no próximo pull.

## 7. Itens que este teste confirma (dúvidas abertas da Fase 1)

- [ ] `gs.getProperty` devolve o valor decifrado de propriedade password2 no escopo (senão: plano B do CLAUDE.md).
- [ ] Leitura de `sys_script`, `sys_script_include` e `sys_script_client` a partir do escopo do Agent.
- [ ] Criação em `sys_user` / `sys_user_group` pelo setup.
- [ ] Criação de `sys_properties` privadas do Agent pela tela de configuração.
- [ ] `GlideSecureRandomUtil` disponível no escopo do Hub (senão o token usa só GUIDs + SHA-256).
- [ ] A página de hibernação real é classificada como transitória.
