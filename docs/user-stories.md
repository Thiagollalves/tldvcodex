# User Stories + Critérios de Aceite

## Autenticação
**Como** usuário novo
**Quero** entrar com Google OAuth ou magic link
**Para** acessar rapidamente as reuniões do meu time.

**Critérios de aceite**
- Exibir botões de login Google e magic link.
- Criar usuário e associar ao time ao primeiro login.
- Redirecionar para dashboard após login.

## Upload de reunião
**Como** usuário
**Quero** enviar arquivos de áudio/vídeo
**Para** obter transcrição e resumo.

**Critérios de aceite**
- Aceitar mp3, mp4, wav, m4a.
- Enfileirar processamento.
- Exibir status de processamento.

## Gravação no navegador
**Como** usuário
**Quero** gravar áudio no navegador
**Para** registrar reuniões externas e presenciais.

**Critérios de aceite**
- Solicitar consentimento explícito.
- Capturar áudio de sistema + microfone.
- Salvar arquivo e iniciar pipeline.

## Lista de reuniões
**Como** usuário
**Quero** filtrar e buscar reuniões
**Para** encontrar rapidamente informações relevantes.

**Critérios de aceite**
- Filtros por data, participante e tipo.
- Busca por palavras-chave.
- Exibir status, duração e tags.

## Página de reunião
**Como** usuário
**Quero** visualizar transcrição, resumo e tarefas
**Para** acompanhar decisões e próximos passos.

**Critérios de aceite**
- Player de áudio/vídeo com transcrição sincronizada.
- Resumo estruturado por template.
- Lista de tarefas com responsáveis e prazos.
- Ações de exportação (PDF/Markdown/Notion/Slack/e-mail).

## Chat com a reunião
**Como** usuário
**Quero** perguntar sobre a reunião
**Para** obter respostas rápidas baseadas na gravação.

**Critérios de aceite**
- Respostas somente com dados da reunião.
- Destacar decisões e tarefas nas respostas.
- Mostrar fonte (timestamp) em versões futuras.

## LGPD
**Como** administrador
**Quero** controlar retenção e exclusão de dados
**Para** cumprir exigências legais.

**Critérios de aceite**
- Configurar retenção por time.
- Exclusão total sob demanda.
- Logs de acesso disponíveis.
