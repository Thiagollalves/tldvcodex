import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuditService } from "../audit/audit.service";
import { PrismaService } from "../common/prisma.service";
import { JobsService } from "../jobs/jobs.service";
import { StorageService } from "../storage/storage.service";

const ALLOWED_MIME = ["audio/mpeg", "audio/wav", "audio/x-m4a", "video/mp4"];

@Injectable()
export class MeetingsService {
  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
    private jobsService: JobsService,
    private auditService: AuditService,
    private configService: ConfigService
  ) {}

  async createMeeting(teamId: string, userId: string, input: {
    title: string;
    language: string;
    template: "daily" | "one_on_one" | "sales" | "executive" | "custom";
    tags?: string[];
  }) {
    const meeting = await this.prisma.meeting.create({
      data: {
        teamId,
        title: input.title,
        language: input.language,
        template: input.template,
        tags: input.tags ?? []
      }
    });

    await this.auditService.log(teamId, userId, "meeting.create", { meetingId: meeting.id });
    return meeting;
  }

  async listMeetings(teamId: string, filters: {
    status?: string;
    from?: string;
    to?: string;
    template?: string;
    tag?: string;
    participant?: string;
  }) {
    const where: Record<string, unknown> = { teamId, deletedAt: null };
    if (filters.status) where.status = filters.status;
    if (filters.template) where.template = filters.template;
    if (filters.tag) where.tags = { has: filters.tag };
    if (filters.from || filters.to) {
      where.createdAt = {
        gte: filters.from ? new Date(filters.from) : undefined,
        lte: filters.to ? new Date(filters.to) : undefined
      };
    }
    if (filters.participant) {
      where.participants = { has: filters.participant };
    }

    return this.prisma.meeting.findMany({ where, orderBy: { createdAt: "desc" } });
  }

  async getMeeting(teamId: string, id: string) {
    const meeting = await this.prisma.meeting.findFirst({
      where: { id, teamId },
      include: {
        mediaAssets: true,
        transcript: true,
        summaries: { orderBy: { version: "desc" } },
        tasks: true,
        decisions: true
      }
    });
    if (!meeting) {
      throw new NotFoundException("Meeting not found");
    }
    return meeting;
  }

  async createUploadUrl(teamId: string, meetingId: string, mime: string, sizeBytes: number) {
    if (!ALLOWED_MIME.includes(mime)) {
      throw new BadRequestException("Unsupported MIME type");
    }
    const maxBytes = Number(this.configService.get("MAX_UPLOAD_BYTES", 500000000));
    if (sizeBytes > maxBytes) {
      throw new BadRequestException("File too large");
    }

    const meeting = await this.prisma.meeting.findFirst({ where: { id: meetingId, teamId } });
    if (!meeting) {
      throw new NotFoundException("Meeting not found");
    }

    const storageKey = `${teamId}/${meetingId}/${Date.now()}`;
    const upload = await this.storageService.createPresignedUpload(storageKey, mime);

    await this.prisma.mediaAsset.create({
      data: { meetingId, storageKey, mime, sizeBytes }
    });

    return upload;
  }

  async completeUpload(teamId: string, userId: string, meetingId: string, storageKey: string) {
    const asset = await this.prisma.mediaAsset.findFirst({
      where: { meetingId, storageKey, meeting: { teamId } }
    });

    if (!asset) {
      throw new NotFoundException("Asset not found");
    }

    await this.auditService.log(teamId, userId, "meeting.upload_complete", { meetingId });
    await this.jobsService.enqueue("extract-audio", { meetingId });

    return { status: "queued" };
  }

  async reprocess(teamId: string, userId: string, meetingId: string, template?: string) {
    const meeting = await this.prisma.meeting.findFirst({ where: { id: meetingId, teamId } });
    if (!meeting) {
      throw new NotFoundException("Meeting not found");
    }

    if (template) {
      await this.prisma.meeting.update({ where: { id: meetingId }, data: { template } });
    }

    await this.jobsService.enqueue("summarize", { meetingId });
    await this.auditService.log(teamId, userId, "meeting.reprocess", { meetingId, template });

    return { status: "reprocessing" };
  }

  async deleteMeeting(teamId: string, userId: string, meetingId: string) {
    await this.prisma.meeting.update({
      where: { id: meetingId },
      data: { deletedAt: new Date() }
    });

    await this.auditService.log(teamId, userId, "meeting.delete", { meetingId });
    return { status: "scheduled_for_purge" };
  }
}
