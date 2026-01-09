# Especificação Funcional Completa

## Visão geral
O tl;dv Codex é um SaaS para gravação, transcrição e resumo inteligente de reuniões. O produto oferece captura via upload e gravação no navegador no MVP, com arquitetura preparada para bots de reunião, extensão de navegador e aplicativo desktop.

## Objetivos de negócio
- Reduzir tempo gasto em atas e follow-ups.
- Centralizar conhecimento de reuniões por time e cliente.
- Aumentar visibilidade de tarefas, decisões e riscos.

## Escopo funcional

### 1) Captura e ingestão
- **Upload de arquivos**: suporta mp3, mp4, wav, m4a.
- **Gravação no navegador**: captura áudio do sistema + microfone (com consentimento).
- **Arquitetura preparada**:
  - Bot que entra na reunião (Meet/Zoom/Teams).
  - Extensão de navegador (captura de aba + áudio).
  - App desktop/web (captura de áudio do sistema + microfone).

### 2) Autenticação e multi-tenant
- Login com Google OAuth e e-mail (magic link).
- Times multi-tenant com papéis: Admin, Editor, Viewer.
- Isolamento de dados por time + auditoria.

### 3) Pipeline de processamento
- Extração de áudio (ffmpeg).
- Transcrição com timestamps e diarização.
- Detecção e enriquecimento de participantes.
- Resumo estruturado por template.
- Extração automática de tarefas, responsáveis, prazos, decisões e riscos.
- Reprocessamento sob demanda.

### 4) Interface do usuário
- **Dashboard**: KPIs, status do processamento e fila de jobs.
- **Lista de reuniões**: filtros por data, participante, tipo, tags e busca textual.
- **Página de reunião**:
  - Player de áudio/vídeo.
  - Transcrição sincronizada.
  - Destaques/clipes.
  - Resumo estruturado.
  - Checklist de tarefas e decisões.
- **Ações**: Copiar resumo para WhatsApp, exportar PDF/Markdown, enviar para Notion/Slack/e-mail.

### 5) Busca avançada
- Busca por palavras-chave em transcrições.
- Filtros combinados (data, participante, tipo, tags).

### 6) Chat com a reunião
- Interface de chat com base exclusivamente no conteúdo da reunião.
- Permite perguntas sobre decisões, tarefas, participantes e contexto.

### 7) Privacidade e LGPD
- Consentimento explícito de gravação.
- Aviso automático para participantes.
- Exclusão total de dados sob demanda.
- Controle de retenção de dados.
- Logs de acesso.
- Criptografia em repouso e em trânsito.

### 8) Observabilidade
- Status de processamento em tempo real.
- Logs de erro e alertas.
- Retry automático.
- Painel admin.

## Requisitos não-funcionais
- Escalabilidade horizontal para workers de IA.
- Latência baixa para chat e busca.
- Multi-idiomas (PT-BR e EN com arquitetura para expansão).

## MVP (prioridades)
- Upload de arquivos.
- Gravação no navegador.
- Transcrição + resumo + extração de tarefas.
- Dashboard e página de reunião.

## Fora do MVP (planejado)
- Bots em reuniões.
- Extensão de navegador.
- Aplicativo desktop.
