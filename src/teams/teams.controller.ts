import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { AuditService } from "../audit/audit.service";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { RequestUser } from "../common/request-user";
import { AddMemberDto, CreateTeamDto, UpdateRetentionDto } from "./dto";
import { TeamsService } from "./teams.service";

@Controller("teams")
@UseGuards(JwtGuard, RolesGuard)
export class TeamsController {
  constructor(private teamsService: TeamsService, private auditService: AuditService) {}

  @Get()
  async list(@CurrentUser() user: RequestUser) {
    return this.teamsService.listTeams(user.userId);
  }

  @Post()
  async create(@Body() body: CreateTeamDto, @CurrentUser() user: RequestUser) {
    const team = await this.teamsService.createTeam(body.name, user.userId);
    await this.auditService.log(team.id, user.userId, "team.create", { name: team.name });
    return team;
  }

  @Post(":id/members")
  @Roles("owner", "admin")
  async addMember(
    @Param("id") teamId: string,
    @Body() body: AddMemberDto,
    @CurrentUser() user: RequestUser
  ) {
    const member = await this.teamsService.addMember(teamId, body.email, body.role);
    await this.auditService.log(teamId, user.userId, "team.add_member", {
      email: body.email,
      role: body.role
    });
    return member;
  }

  @Patch(":id/retention")
  @Roles("owner", "admin")
  async updateRetention(
    @Param("id") teamId: string,
    @Body() body: UpdateRetentionDto,
    @CurrentUser() user: RequestUser
  ) {
    const team = await this.teamsService.updateRetention(teamId, body.retentionDays);
    await this.auditService.log(teamId, user.userId, "team.update_retention", {
      retentionDays: body.retentionDays
    });
    return team;
  }
}
