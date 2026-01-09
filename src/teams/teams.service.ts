import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma.service";

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  listTeams(userId: string) {
    return this.prisma.team.findMany({
      where: { members: { some: { userId } } }
    });
  }

  createTeam(name: string, userId: string) {
    return this.prisma.team.create({
      data: {
        name,
        members: { create: { userId, role: "owner" } }
      }
    });
  }

  async addMember(teamId: string, email: string, role: "owner" | "admin" | "member" | "viewer") {
    const user = await this.prisma.user.upsert({
      where: { email },
      update: {},
      create: { email }
    });

    return this.prisma.teamMember.upsert({
      where: { teamId_userId: { teamId, userId: user.id } },
      update: { role },
      create: { teamId, userId: user.id, role }
    });
  }

  updateRetention(teamId: string, retentionDays: number) {
    return this.prisma.team.update({ where: { id: teamId }, data: { retentionDays } });
  }
}
