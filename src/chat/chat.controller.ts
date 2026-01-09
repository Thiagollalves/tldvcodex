import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { IsString } from "class-validator";

import { CurrentUser } from "../auth/current-user.decorator";
import { JwtGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { RequestUser } from "../common/request-user";
import { ChatService } from "./chat.service";

class ChatDto {
  @IsString()
  question!: string;
}

@Controller("meetings")
@UseGuards(JwtGuard, RolesGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post(":id/chat")
  async chat(@Param("id") id: string, @Body() body: ChatDto, @CurrentUser() user: RequestUser) {
    return this.chatService.answer(user.teamId, id, body.question);
  }
}
