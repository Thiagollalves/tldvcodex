import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma.service";

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(teamId: string, query: string, filters: {
    from?: string;
    to?: string;
    participant?: string;
    tag?: string;
  }) {
    const params: unknown[] = [teamId, query];
    let whereSql = "m.\"teamId\" = $1 AND m.\"deletedAt\" IS NULL";

    if (filters.from) {
      params.push(filters.from);
      whereSql += ` AND m."createdAt" >= $${params.length}`;
    }
    if (filters.to) {
      params.push(filters.to);
      whereSql += ` AND m."createdAt" <= $${params.length}`;
    }
    if (filters.participant) {
      params.push(filters.participant);
      whereSql += ` AND $${params.length} = ANY(m."participants")`;
    }
    if (filters.tag) {
      params.push(filters.tag);
      whereSql += ` AND $${params.length} = ANY(m."tags")`;
    }

    const results = await this.prisma.$queryRawUnsafe(
      `SELECT m.*, t."fullText"
       FROM "Meeting" m
       LEFT JOIN "Transcript" t ON t."meetingId" = m.id
       WHERE ${whereSql}
       AND t.tsv @@ plainto_tsquery('simple', $2)
       ORDER BY m."createdAt" DESC
       LIMIT 50`,
      ...params
    );

    return results;
  }
}
