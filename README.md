# Dev Lab — laboratórios guiados de ServiceNow

Exercícios de ServiceNow que os devs fazem na própria PDI, com validação automática e pontuação centralizada.
**Tudo roda no ServiceNow**: este repositório só versiona o código-fonte dos dois apps (Fluent / ServiceNow SDK).

| Pasta | O que é |
|---|---|
| `hub/` | App `x_1556735_dlhub`: na PDI do instrutor. Atividades, checks, participantes, API e portal `/devlab_hub` |
| `agent/` | App `x_1556735_dlagent`: na PDI de cada dev. Pull, outbox, setup, motor de checks e portal `/devlab` |
| `activities/` | Atividades em JSON (modelo/backup; a publicação é feita no Hub com "Importar JSON") |
| `schemas/` | `activity.schema.json` |
| `scripts/` | Validação local das atividades e instruções do Update Set do Agent |
| `tests/` | Testes locais das regras puras (validador, pontuação, outbox/backoff, motor) |
| `docs/` | Contrato da API, instalação do Agent, roteiro do teste ponta a ponta |

Especificação completa: [`CLAUDE.md`](CLAUDE.md).

## Comandos

```bash
npm run check
```

O `check` valida `activities/*.json`, roda os testes locais e os builds do Hub e do Agent. Outros comandos:

```bash
npm test
```

```bash
cd hub && npm install && npm run build
```

```bash
cd agent && npm install && npm run build
```

Deploy (`npm run deploy` em cada app) **só quando o instrutor pedir**, com credenciais configuradas via `now-sdk auth`
ou variáveis de ambiente. Nunca commitar credenciais (`.env` está no `.gitignore`).
