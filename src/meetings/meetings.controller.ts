import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";

import { AuditService } from "../audit/audit.service";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { RequestUser } from "../common/request-user";
import { CompleteUploadDto, CreateMeetingDto, ReprocessDto, UploadUrlDto } from "./dto";
import { MeetingsService } from "./meetings.service";

@Controller("meetings")
@UseGuards(JwtGuard, RolesGuard)
export class MeetingsController {
  constructor(private meetingsService: MeetingsService, private auditService: AuditService) {}

  @Post()
  async create(@Body() body: CreateMeetingDto, @CurrentUser() user: RequestUser) {
    return this.meetingsService.createMeeting(user.teamId, user.userId, body);
  }

  @Get()
  async list(
    @CurrentUser() user: RequestUser,
    @Query("status") status?: string,
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("template") template?: string,
    @Query("tag") tag?: string,
    @Query("participant") participant?: string
  ) {
    return this.meetingsService.listMeetings(user.teamId, {
      status,
      from,
      to,
      template,
      tag,
      participant
    });
  }

  @Get(":id")
  async get(@Param("id") id: string, @CurrentUser() user: RequestUser) {
    return this.meetingsService.getMeeting(user.teamId, id);
  }

  @Post(":id/upload-url")
  async uploadUrl(
    @Param("id") id: string,
    @Body() body: UploadUrlDto,
    @CurrentUser() user: RequestUser
  ) {
    return this.meetingsService.createUploadUrl(user.teamId, id, body.mime, body.sizeBytes);
  }

  @Post(":id/complete-upload")
  async completeUpload(
    @Param("id") id: string,
    @Body() body: CompleteUploadDto,
    @CurrentUser() user: RequestUser
  ) {
    return this.meetingsService.completeUpload(user.teamId, user.userId, id, body.storageKey);
  }

  @Post(":id/reprocess")
  @Roles("owner", "admin", "member")
  async reprocess(
    @Param("id") id: string,
    @Body() body: ReprocessDto,
    @CurrentUser() user: RequestUser
  ) {
    return this.meetingsService.reprocess(user.teamId, user.userId, id, body.template);
  }

  @Delete(":id")
  @Roles("owner", "admin")
  async deleteMeeting(@Param("id") id: string, @CurrentUser() user: RequestUser) {
    return this.meetingsService.deleteMeeting(user.teamId, user.userId, id);
  }

  @Post(":id/export")
  @Roles("owner", "admin", "member")
  async exportMeeting(@Param("id") id: string, @CurrentUser() user: RequestUser) {
    await this.auditService.log(user.teamId, user.userId, "meeting.export", { meetingId: id });
    return { status: "queued" };
  }
}
