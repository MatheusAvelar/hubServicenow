# Dev Lab — laboratórios guiados de ServiceNow

Exercícios de ServiceNow que os devs fazem na própria PDI, com validação automática e pontuação centralizada.
**Tudo roda no ServiceNow.** A entrega é feita **só por Update Set XML** (`dist/`), importado manualmente na PDI.
Nenhum script deste repositório fala com uma instância.

| Pasta | O que é |
|---|---|
| `dist/` | Update Sets prontos para importar (ver [`docs/importar-updateset.md`](docs/importar-updateset.md)) |
| `hub/` | Fonte do app `x_1556735_dlhub` (PDI do instrutor): atividades, checks, participantes, API, página única `x_1556735_dlhub_devlab.do` |
| `agent/` | Fonte do app `x_1556735_dlagent` (PDI de cada dev): pull, outbox, setup, motor de checks, portal `/devlab` |
| `activities/` | Atividades em JSON (a publicação é feita no Hub com "Importar JSON") |
| `schemas/` | `activity.schema.json` |
| `scripts/` | `build-updateset.js` (gera os Update Sets) e `validate-activity.js` |
| `tests/` | Testes locais das regras puras e do gerador |
| `docs/` | Importação, contrato da API, instalação do Agent, roteiro do teste ponta a ponta |

Especificação completa: [`CLAUDE.md`](CLAUDE.md).

## Gerar os Update Sets

```bash
npm install --prefix hub && npm install --prefix agent
```

```bash
npm run updateset:prova
```

```bash
npm run updateset:hub
```

```bash
npm run updateset:agent
```

Cada comando compila o app localmente (compilador Fluent do ServiceNow SDK, offline) e grava o XML em `dist/`.

## Antes de commitar

```bash
npm run check
```

Valida `activities/*.json`, roda os testes locais e compila os dois apps.
