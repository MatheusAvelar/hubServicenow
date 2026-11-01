# Importar os Update Sets na PDI

Os pacotes ficam em `dist/` (baixe direto do GitHub: abra o arquivo → **Download raw file**).

| Arquivo | O que instala | Onde |
|---|---|---|
| `DevLab_Prova_v1.xml` | Prova do formato: app `x_1556735_dlhub`, roles, tabela Trilha com form, Script Include `ScoringRules`, menu "Dev Lab Hub → Trilhas" | PDI do Hub |
| `DevLab_Hub_v1.xml` | Hub completo (mesmos sys_ids da prova: só complementa) | PDI do Hub |
| `DevLab_Agent_v1.xml` | Agent completo | PDI de cada dev |

## Passo a passo

1. **System Update Sets → Retrieved Update Sets**.
2. Em *Related Links*: **Import Update Set from XML** → escolha o arquivo → **Upload**.
3. Abra o update set carregado (ex.: "Dev Lab — pacote de prova") → **Preview Update Set**.
4. Confira o resultado do Preview:
   - **sem problemas** → **Commit Update Set**;
   - **com problemas** → não faça o commit. Na related list *Update Set Preview Problems*, anote para cada linha
     o *Type*, a *Description* e o *Update* (nome do registro) e me envie.
5. Depois do commit, recarregue o navegador para o menu novo aparecer.

## Como conferir o pacote de prova

- **System Applications → My Company Applications**: aparece "Dev Lab Hub" (escopo `x_1556735_dlhub`).
- Application Navigator, filtro "Dev Lab Hub": módulo **Trilhas** → lista vazia de Trilha → **New** →
  o form tem Nome, Ordem, Ativa e Descrição → salve uma trilha de teste.
- `x_1556735_dlhub_track.list`: a trilha aparece. **System Definition → Tables**: a tabela "Trilha" existe.
- **System Definition → Script Includes**, filtro `ScoringRules`: existe, escopo Dev Lab Hub.
- **User Administration → Roles**: `x_1556735_dlhub.admin` e `x_1556735_dlhub.agent`.
- **System Security → Access Control (ACL)**, filtro `x_1556735_dlhub_track`: se as ACLs da tabela foram
  criadas automaticamente (create/read/write/delete para a role admin). Isso confirma se o
  `create_access_controls` funciona via update set.
- Teste rápido do Script Include (Scripts - Background, escopo **x_1556735_dlhub**):

```javascript
var r = new x_1556735_dlhub.ScoringRules();
gs.info(JSON.stringify(r.scoreAttempt([{ code: 'c1', points: 30, required: true }], [{ check_id: 'c1', passed: true }], 0)));
```

Esperado: `{"score":30,"max":30,"completed":true,...}`.

## Depois do Hub completo (`DevLab_Hub_v1.xml`)

Pode importar por cima da prova (mesmos sys_ids). Conferir:
- menu **Dev Lab Hub**: Painel, Atividades, Importar JSON, Trilhas, Participantes, Matrículas, Log da API;
- **Importar JSON** com `activities/LAB0001.json` → atividade em rascunho → **Publicar**;
- `https://dev400642.service-now.com/x_1556735_dlhub_devlab.do` abre a página do Hub (Painel, Atividades, Importar JSON, Trilhas, Participantes);
- **System Web Services → Scripted REST APIs → Dev Lab**: 4 recursos em `/api/x_1556735_dlhub/devlab/v1/...`;
- ACLs das tabelas `x_1556735_dlhub_*` (se não foram criadas sozinhas, me avise: incluo ACLs explícitas).

## Agent (`DevLab_Agent_v1.xml`) — na PDI de teste

Mesmo passo a passo. Depois: **System Applications → Application Cross-Scope Access**, filtro
`x_1556735_dlagent`: 16 privilégios, todos *Allowed*. Abrir `/devlab` e seguir `docs/teste-ponta-a-ponta.md`.

Se precisar desfazer: **System Applications → My Company Applications → Dev Lab Hub → Delete** (remove o app e
a tabela), ou *Back Out* no update set em **Retrieved Update Sets**.
