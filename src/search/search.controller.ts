import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { CurrentUser } from "../auth/current-user.decorator";
import { JwtGuard } from "../auth/jwt.guard";
import { RolesGuard } from "../auth/roles.guard";
import { RequestUser } from "../common/request-user";
import { SearchService } from "./search.service";

@Controller("search")
@UseGuards(JwtGuard, RolesGuard)
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  async search(
    @CurrentUser() user: RequestUser,
    @Query("q") q: string,
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("participant") participant?: string,
    @Query("tag") tag?: string
  ) {
    return this.searchService.search(user.teamId, q ?? "", { from, to, participant, tag });
  }
}
