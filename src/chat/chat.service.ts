import { Injectable, NotFoundException } from "@nestjs/common";

import { chatResponseSchema } from "../common/schemas";
import { PrismaService } from "../common/prisma.service";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async answer(teamId: string, meetingId: string, question: string) {
    const meeting = await this.prisma.meeting.findFirst({
      where: { id: meetingId, teamId, deletedAt: null },
      include: { transcript: true }
    });
    if (!meeting?.transcript) {
      throw new NotFoundException("Transcript not found");
    }

    const segments = meeting.transcript.segments as Array<{
      start_ms: number;
      end_ms: number;
      speaker: string;
      text: string;
    }>;

    const relevant = segments.filter((segment) =>
      segment.text.toLowerCase().includes(question.toLowerCase())
    );

    if (relevant.length === 0) {
      return chatResponseSchema.parse({
        answer: "Não encontrei na reunião.",
        citations: []
      });
    }

    return chatResponseSchema.parse({
      answer: `Encontrei ${relevant.length} trecho(s) relacionados à pergunta.`,
      citations: relevant.slice(0, 3).map((segment) => ({
        start_ms: segment.start_ms,
        end_ms: segment.end_ms,
        text: segment.text
      }))
    });
  }
}
