# Contrato da API do Hub — v1

Base: `https://<hub>.service-now.com/api/x_1556735_dlhub/devlab/v1`

Quem chama é **só o Agent** (Agent → Hub). O Hub nunca chama as PDIs dos devs.

## Autenticação

| Camada | Como |
|---|---|
| Instância | Basic Auth do usuário de integração compartilhado (role `x_1556735_dlhub.agent`). A ACL `x_1556735_dlhub.devlab_api` libera só essa role (e admin). |
| Dev | Header `X-DevLab-Token: <token individual>`. O Hub guarda só o SHA-256 (`participant.token_hash`). |
| Versão | Header `X-DevLab-Agent-Version: <versão>` em toda chamada (gravado em `participant.agent_version`). |

Token ausente, inválido ou de participante inativo → **401**, registrado em `api_log`.
Toda chamada (com sucesso ou não) atualiza `api_log`. As que têm token válido também atualizam `participant.last_seen`.

## Respostas

- Sempre `Content-Type: application/json`.
- Erro: `{ "error": { "code": "<código>", "message": "<mensagem em português>" } }`.
- **Hub hibernando**: a PDI responde HTML (página de "instância hibernando") ou um redirect. O Agent trata
  qualquer resposta que **não seja JSON** (ou status 5xx/0) como falha transitória e mantém a mensagem no outbox.
  4xx com JSON de erro é falha definitiva (não adianta reenviar), exceto 401 (pode ser token trocado: fica no outbox com aviso).

| Status | code | Quando |
|---|---|---|
| 400 | `invalid_body`, `invalid_since` | JSON malformado / parâmetro inválido |
| 401 | `invalid_token` | token inválido ou participante inativo |
| 404 | `activity_not_found` | atividade inexistente ou não publicada |
| 409 | `not_approved` | resultado enviado antes do approve |
| 422 | `invalid_attempt` | tentativa < 1, não inteira ou acima de `max_attempts` |
| 500 | `internal_error` | erro inesperado no Hub |

Datas: ISO 8601 em UTC, `2026-11-01T14:00:00Z`.

---

## GET `/ping`

Health check. Devolve o resumo de pontuação do dev (o Agent guarda em `score_cache`).

```json
{
  "ok": true,
  "server_time": "2026-11-01T14:00:00Z",
  "participant": { "name": "Ana Souza" },
  "score": { "points": 180, "rank": 2, "participants": 7, "completed": 2, "total": 3 }
}
```

## GET `/activities?since=<ISO>`

Atividades `published` ou `archived` alteradas depois de `since` (sem `since`: todas). Cada item tem o mesmo
formato de `activities/*.json`, mais `state`, `total_points`, `updated_at` e a matrícula do dev:

```json
{
  "server_time": "2026-11-01T14:00:00Z",
  "activities": [
    {
      "number": "LAB0001", "version": 1, "track": "Business Rules", "title": "…", "level": "junior",
      "description": "<p>…</p>", "due_date": "2026-11-15", "max_attempts": 5,
      "setup": [ { "action": "create_record", "table": "sys_user", "key": ["user_name"], "values": { "user_name": "lab.vip" } } ],
      "checks": [ { "id": "c1", "name": "…", "type": "business_rule", "params": { "table": "incident" }, "points": 30, "required": true } ],
      "state": "published", "total_points": 100, "updated_at": "2026-11-01 13:58:10",
      "enrollment": { "state": "approved", "approved_at": "2026-11-01T14:01:00Z", "completed_at": null, "score": 0, "attempts": 0 }
    }
  ]
}
```

O Agent guarda o `server_time` e usa como próximo `since`. Uma atividade `archived` sai da lista do dev.

## POST `/activities/{number}/approve`

O dev aprovou a instalação. Cria ou atualiza a matrícula. É **idempotente**: o `approved_at` fica com o valor da
primeira chamada (o Agent usa esse valor no anti-trapaça).

Corpo: `{}` (opcional: `{ "approved_at": "<ISO>" }` local, só informativo).

```json
{ "number": "LAB0001", "state": "approved", "approved_at": "2026-11-01T14:01:00Z" }
```

## POST `/activities/{number}/results`

Envia uma tentativa. O Hub **recalcula os pontos** a partir dos checks dele. Qualquer `points` enviado é ignorado,
e só `passed === true` conta.

```json
{
  "activity_version": 1,
  "attempt": 2,
  "validated_at": "2026-11-01T14:00:00Z",
  "checks": [
    { "check_id": "c1", "passed": true, "evidence": { "sys_id": "…", "sys_created_on": "…" }, "message": "…" }
  ]
}
```

Regras:
- `attempt` é a chave de idempotência. Se o Hub já tem a tentativa N dessa matrícula, devolve o resultado guardado
  com `"duplicate": true` e não conta de novo (o outbox pode reenviar).
- `attempt` > `max_attempts` → 422.
- Check do Hub que não veio no payload conta como reprovado; `check_id` desconhecido é ignorado (`ignored_checks`).
- Pontuação da matrícula = **melhor** tentativa. Concluída quando todos os checks obrigatórios passam.
- A evidência é guardada (até 8 KB) junto com o SHA-256 dela (`evidence_hash`).

```json
{
  "number": "LAB0001", "attempt": 2, "score": 80, "best_score": 80, "max": 100, "completed": false,
  "checks": [ { "check_id": "c1", "passed": true, "points": 30, "max": 30, "sent": true } ],
  "ignored_checks": [], "version_mismatch": false,
  "score_summary": { "points": 180, "rank": 2, "participants": 7, "completed": 2, "total": 3 }
}
```

## POST `/activities/{number}/hint` — Fase 2

Ainda não implementado (o custo de dicas entra junto com prazo/expiração).
