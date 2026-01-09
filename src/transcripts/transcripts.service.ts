import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/prisma.service";

@Injectable()
export class TranscriptsService {
  constructor(private prisma: PrismaService) {}

  async saveTranscript(meetingId: string, fullText: string, segments: unknown, language: string) {
    return this.prisma.transcript.upsert({
      where: { meetingId },
      update: { fullText, segments, language },
      create: { meetingId, fullText, segments, language }
    });
  }
}
