import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { AuditModule } from "./audit/audit.module";
import { ChatModule } from "./chat/chat.module";
import { HealthModule } from "./health/health.module";
import { IntegrationsModule } from "./integrations/integrations.module";
import { JobsModule } from "./jobs/jobs.module";
import { MeetingsModule } from "./meetings/meetings.module";
import { SearchModule } from "./search/search.module";
import { StorageModule } from "./storage/storage.module";
import { TeamsModule } from "./teams/teams.module";
import { TranscriptsModule } from "./transcripts/transcripts.module";
import { PrismaModule } from "./common/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AuditModule,
    TeamsModule,
    MeetingsModule,
    TranscriptsModule,
    SearchModule,
    ChatModule,
    IntegrationsModule,
    StorageModule,
    JobsModule,
    HealthModule
  ]
})
export class AppModule {}
