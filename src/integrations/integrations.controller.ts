import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { CurrentUser } from "../auth/current-user.decorator";
import { JwtGuard } from "../auth/jwt.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { RequestUser } from "../common/request-user";
import { IntegrationDto } from "./dto";
import { IntegrationsService } from "./integrations.service";

@Controller("integrations")
@UseGuards(JwtGuard, RolesGuard)
export class IntegrationsController {
  constructor(private integrationsService: IntegrationsService) {}

  @Get()
  async list(@CurrentUser() user: RequestUser) {
    return this.integrationsService.list(user.teamId);
  }

  @Post()
  @Roles("owner", "admin")
  async upsert(@Body() body: IntegrationDto, @CurrentUser() user: RequestUser) {
    return this.integrationsService.upsert(user.teamId, body.type, body.settings);
  }

  @Post("send-email")
  @Roles("owner", "admin", "member")
  async sendEmail(@Body() body: Record<string, unknown>, @CurrentUser() user: RequestUser) {
    return this.integrationsService.sendEmail(user.teamId, body);
  }
}
