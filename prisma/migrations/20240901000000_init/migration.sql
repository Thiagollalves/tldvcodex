CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "User" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" text UNIQUE NOT NULL,
  "name" text,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "Team" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" text NOT NULL,
  "retentionDays" integer NOT NULL DEFAULT 365,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TYPE "TeamRole" AS ENUM ('owner', 'admin', 'member', 'viewer');
CREATE TYPE "MeetingStatus" AS ENUM ('received', 'audio_extracted', 'transcribed', 'summarized', 'tasks_extracted', 'ready', 'failed');
CREATE TYPE "SummaryTemplate" AS ENUM ('daily', 'one_on_one', 'sales', 'executive', 'custom');

CREATE TABLE "TeamMember" (
  "teamId" uuid NOT NULL,
  "userId" uuid NOT NULL,
  "role" "TeamRole" NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("teamId", "userId"),
  FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "Meeting" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "teamId" uuid NOT NULL,
  "title" text NOT NULL,
  "startedAt" timestamptz,
  "endedAt" timestamptz,
  "status" "MeetingStatus" NOT NULL DEFAULT 'received',
  "language" text NOT NULL,
  "template" "SummaryTemplate" NOT NULL,
  "tags" text[] NOT NULL DEFAULT ARRAY[]::text[],
  "participants" text[] NOT NULL DEFAULT ARRAY[]::text[],
  "consentRecordedAt" timestamptz,
  "consentTextVersion" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz,
  FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE
);

CREATE TABLE "MediaAsset" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "meetingId" uuid NOT NULL,
  "storageKey" text NOT NULL,
  "mime" text NOT NULL,
  "durationMs" integer,
  "sizeBytes" bigint NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE
);

CREATE TABLE "Transcript" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "meetingId" uuid UNIQUE NOT NULL,
  "fullText" text NOT NULL,
  "segments" jsonb NOT NULL,
  "language" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "tsv" tsvector GENERATED ALWAYS AS (to_tsvector('simple', coalesce("fullText", ''))) STORED,
  FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE
);

CREATE INDEX "Transcript_tsv_idx" ON "Transcript" USING GIN ("tsv");

CREATE TABLE "SummaryVersion" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "meetingId" uuid NOT NULL,
  "version" integer NOT NULL,
  "template" "SummaryTemplate" NOT NULL,
  "model" text NOT NULL,
  "summary" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE
);

CREATE TABLE "Task" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "meetingId" uuid NOT NULL,
  "text" text NOT NULL,
  "owner" text,
  "dueDate" timestamptz,
  "status" text NOT NULL DEFAULT 'open',
  FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE
);

CREATE TABLE "Decision" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "meetingId" uuid NOT NULL,
  "text" text NOT NULL,
  "owner" text,
  FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE
);

CREATE TABLE "AuditLog" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "teamId" uuid NOT NULL,
  "userId" uuid NOT NULL,
  "action" text NOT NULL,
  "metadata" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "IntegrationConfig" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "teamId" uuid NOT NULL,
  "type" text NOT NULL,
  "settings" jsonb NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "IntegrationConfig_teamId_type_key" ON "IntegrationConfig"("teamId", "type");

CREATE TABLE "MagicLink" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" text NOT NULL,
  "tokenHash" text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "RefreshToken" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid NOT NULL,
  "tokenHash" text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);
