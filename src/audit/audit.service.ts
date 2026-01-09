import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma.service";

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(teamId: string, userId: string, action: string, metadata: Record<string, unknown>) {
    return this.prisma.auditLog.create({
      data: {
        teamId,
        userId,
        action,
        metadata
      }
    });
  }
}
