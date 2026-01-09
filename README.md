# tl;dv Backend

Backend SaaS para gravação, transcrição e resumo inteligente de reuniões.

## Requisitos
- Node.js 20+
- PostgreSQL
- Redis
- Storage S3 compatível (MinIO, AWS S3, Supabase Storage)

## Configuração
```bash
cp .env.example .env
npm install
```

## Migrations
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Rodar API
```bash
npm run dev
```

## Rodar Worker
```bash
npm run build
npm run start:worker
```

## Documentação
- Swagger: `http://localhost:3001/docs`
- Health check: `http://localhost:3001/health`
