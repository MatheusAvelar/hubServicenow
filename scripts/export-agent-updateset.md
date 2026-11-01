# Gerar o Update Set do Agent

O Agent é distribuído aos devs como **Update Set XML** (e pelo repositório Git, para quem usa Source Control).

## Pelo SDK (sem instância)

```bash
cd agent
npm run build
npx now-sdk pack
```

O `pack` gera em `agent/target/` um ZIP com o XML do update set e o `package_inventory.csv` (manifesto SHA-256).
Envie aos devs só o XML. O ZIP e a pasta `target/` não são versionados (`.gitignore`).

## Pela instância (alternativa)

1. Instale o Agent numa PDI de referência (`npm run deploy` dentro de `agent/`, **só quando o instrutor pedir**).
2. **System Applications → Studio / App Engine Studio →** Dev Lab Agent → **Publish to Update Set**.
3. Exporte o update set gerado para XML.

## Antes de publicar uma versão nova

1. Suba `AgentRules.AGENT_VERSION` (agent/src/server/script-includes/AgentRules.server.js) e a versão em `agent/now.config.json`.
2. `npm run check` na raiz (valida atividades, testes locais e builds).
3. Confira que **nenhuma** propriedade com segredo ganhou valor (`hub_password` e `participant_token` são privadas e
   criadas na PDI do dev).
