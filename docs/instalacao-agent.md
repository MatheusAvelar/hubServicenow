# Instalação do Dev Lab Agent (para os devs)

O Agent é um app escopado (`x_1556735_dlagent`) instalado **uma vez** na sua PDI. Ele busca as atividades no Hub,
instala o setup **só depois que você aprova** e valida o seu trabalho localmente. O Hub nunca acessa a sua PDI:
quem fala com o Hub é sempre o Agent.

## 1. Importar o Update Set

1. Na sua PDI: **System Update Sets → Retrieved Update Sets → Import Update Set from XML**.
2. Escolha o arquivo `devlab-agent-<versão>.xml` que o instrutor enviou.
3. Abra o update set importado → **Preview Update Set** → **Commit Update Set**.

## 2. Privilégios que você aceita (cross-scope)

O Agent pede só o mínimo para ler o que você constrói e criar os dados de exemplo das atividades:

| Operação | Tabelas | Para quê |
|---|---|---|
| Ler | `sys_script`, `sys_script_include`, `sys_script_client` | Avaliar as suas Business Rules, Script Includes e Client Scripts |
| Ler | `incident`, `problem`, `change_request`, `sc_req_item`, `sys_user`, `sys_user_group`, `sys_user_grmember` | Check `record_exists` (ex.: "existe incidente do VIP com prioridade 1") |
| Criar | `sys_user`, `sys_user_group`, `incident` | Setup das atividades (ex.: usuário `lab.vip`), sempre depois do seu "Aprovar e instalar" |
| Ler/gravar/criar | `sys_properties` | Somente as propriedades do próprio Agent (`x_1556735_dlagent.*`) |

O Agent **nunca** cria nem altera metadados (Business Rules, tabelas, ACLs etc.): isso é o que você constrói.
Também **não executa scripts vindos do Hub**: setup e checks são JSON interpretados por motores fixos.

Se a sua instância mostrar privilégios como "Requested", vá em **System Applications → Application Cross-Scope Access**
e mude para **Allowed** os registros do escopo `x_1556735_dlagent`.

## 3. Role

Dê a role `x_1556735_dlagent.user` ao seu usuário (o admin já tem acesso).

## 4. Configurar

1. Abra `https://<sua-pdi>.service-now.com/devlab`.
2. No card **Configurar Agent**, preencha o que o instrutor enviou:
   - URL do Hub (já vem preenchida: `https://dev400642.service-now.com`);
   - usuário e senha de integração;
   - **seu token** (64 caracteres, individual: não compartilhe).
3. **Salvar configuração**. O Agent sincroniza em segundo plano; em alguns segundos as atividades aparecem.

A senha e o token ficam em propriedades `password2` (cifradas) e não viajam em Update Sets. Atualizar o Agent não apaga
a sua configuração.

## 5. Fazendo uma atividade

1. Atividade **Nova** → leia o enunciado e o que o setup vai criar → **Aprovar e instalar**.
2. Construa a solução na sua PDI.
3. **Validar**: os critérios aparecem com ✓ / ✕ e o motivo (ex.: "Encontrado current.update() na linha 6…").
4. Corrija e **Validar novamente** (respeitando o limite de tentativas).

Só contam registros e scripts **criados depois** da aprovação.

## Hub hibernando

O Hub também é uma PDI e hiberna. Se ele estiver dormindo, aparece
"Hub indisponível no momento — resultado salvo e será enviado automaticamente". Nada se perde: o resultado fica no
**outbox** e é reenviado sozinho (a cada 15 min, com intervalos maiores depois de várias falhas, até 12 h).
O instrutor acorda o Hub antes das rodadas. A sua PDI só sincroniza quando está acordada (é o esperado).

## Problemas comuns

| Sintoma | O que fazer |
|---|---|
| "Token recusado pelo Hub (401)" | Token digitado errado, ou o instrutor gerou um novo. Configure de novo. |
| Nada aparece depois de sincronizar | Confira URL/usuário/senha. Menu **Dev Lab → Outbox** mostra o último erro. |
| Setup falhou | O detalhe da atividade mostra o motivo de cada passo. Avise o instrutor. |
| Check reprovado "criado antes da aprovação" | Crie um registro novo (os antigos não contam). |
