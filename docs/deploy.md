# Instruções de Deploy

## Requisitos
- Node.js 20+
- PostgreSQL 14+
- Storage S3 compatível (AWS S3, MinIO, Supabase Storage)

## Variáveis de ambiente
Crie `.env.local` a partir de `.env.example`.

## Local
```bash
npm install
npm run dev
```

## Produção (exemplo)
```bash
npm install
npm run build
npm run start
```

## Workers
- Configure workers em um serviço separado (ex: Cloud Run, ECS).
- Use fila (SQS, RabbitMQ, Redis) para processar jobs.

## Observabilidade
- Configure logs estruturados.
- Envie métricas para Datadog, Grafana ou equivalente.
