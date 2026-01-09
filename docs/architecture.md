# Arquitetura Técnica (Diagrama textual)

```
[Cliente Web - Next.js]
   |-- Upload / gravação no navegador
   |-- Dashboard / reuniões / chat
   |-- Auth (Google OAuth + Magic Link)

[API Gateway / Server Actions]
   |-- /api/meetings
   |-- /api/upload
   |-- /api/chat
   |-- /api/export

[Workers assíncronos]
   |-- Ingestão + extração de áudio
   |-- Transcrição (Whisper)
   |-- Diarização + detecção de participantes
   |-- Resumo e extração (LLM JSON)
   |-- Indexação para busca + chat

[PostgreSQL]
   |-- users
   |-- teams
   |-- meetings
   |-- participants
   |-- transcripts
   |-- summaries
   |-- tasks
   |-- decisions
   |-- exports
   |-- audit_logs

[Storage S3 compatível]
   |-- Arquivos de áudio/vídeo
   |-- Artefatos de exportação

[Observabilidade]
   |-- Logs + métricas
   |-- Retry automático
   |-- Painel admin
```

## Fluxo de dados (MVP)
1. Usuário faz upload ou gravação no navegador.
2. API registra reunião (status: queued) e envia arquivo ao storage.
3. Worker extrai áudio e roda transcrição + diarização.
4. Worker cria resumo estruturado, tarefas e decisões.
5. API atualiza status para ready e indexa para busca + chat.
