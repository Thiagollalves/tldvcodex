import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto, RefreshDto, VerifyDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginDto) {
    if (body.provider === "google" && body.idToken) {
      return this.authService.verifyGoogleToken(body.idToken);
    }

    return this.authService.requestMagicLink(body.email);
  }

  @Post("verify")
  async verify(@Body() body: VerifyDto) {
    return this.authService.verifyMagicLink(body.token);
  }

  @Post("refresh")
  async refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body.refreshToken);
  }
}
