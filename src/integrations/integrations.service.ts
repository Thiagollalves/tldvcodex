import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma.service";

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  list(teamId: string) {
    return this.prisma.integrationConfig.findMany({ where: { teamId } });
  }

  upsert(teamId: string, type: string, settings: Record<string, unknown>) {
    return this.prisma.integrationConfig.upsert({
      where: { teamId_type: { teamId, type } },
      update: { settings },
      create: { teamId, type, settings }
    });
  }

  async sendEmail(_teamId: string, _payload: Record<string, unknown>) {
    return { status: "queued" };
  }
}
