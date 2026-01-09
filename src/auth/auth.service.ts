import crypto from "crypto";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";

import { PrismaService } from "../common/prisma.service";

type AuthPayload = {
  userId: string;
  teamId: string;
  role: string;
};

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.googleClient = new OAuth2Client(this.configService.get("GOOGLE_CLIENT_ID"));
  }

  async requestMagicLink(email: string) {
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = this.hashToken(token);
    const ttlMinutes = Number(this.configService.get("MAGIC_LINK_TTL_MINUTES", 15));
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    await this.prisma.magicLink.create({
      data: { email, tokenHash, expiresAt }
    });

    const allowDev = this.configService.get("ALLOW_DEV_MAGIC_LINK") === "true";
    return { status: "sent", token: allowDev ? token : undefined };
  }

  async verifyMagicLink(token: string) {
    const tokenHash = this.hashToken(token);
    const record = await this.prisma.magicLink.findFirst({
      where: { tokenHash },
      orderBy: { createdAt: "desc" }
    });

    if (!record || record.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    await this.prisma.magicLink.deleteMany({ where: { tokenHash } });

    return this.issueTokensForEmail(record.email);
  }

  async verifyGoogleToken(idToken: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.configService.get("GOOGLE_CLIENT_ID")
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new UnauthorizedException("Invalid Google token");
    }

    return this.issueTokensForEmail(payload.email, payload.name ?? undefined);
  }

  async refresh(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.prisma.refreshToken.findFirst({ where: { tokenHash } });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.prisma.user.findUnique({ where: { id: stored.userId } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const membership = await this.prisma.teamMember.findFirst({ where: { userId: user.id } });
    if (!membership) {
      throw new UnauthorizedException("No team membership found");
    }

    return this.issueTokens({
      userId: user.id,
      teamId: membership.teamId,
      role: membership.role
    });
  }

  private async issueTokensForEmail(email: string, name?: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({ data: { email, name } });
      const team = await this.prisma.team.create({
        data: { name: `${email.split("@")[0]} Team` }
      });
      await this.prisma.teamMember.create({
        data: { teamId: team.id, userId: user.id, role: "owner" }
      });
    }

    const membership = await this.prisma.teamMember.findFirst({ where: { userId: user.id } });
    if (!membership) {
      throw new UnauthorizedException("No team membership found");
    }

    return this.issueTokens({
      userId: user.id,
      teamId: membership.teamId,
      role: membership.role
    });
  }

  private async issueTokens(payload: AuthPayload) {
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = crypto.randomBytes(32).toString("hex");
    const refreshHash = this.hashToken(refreshToken);
    const refreshTtl = this.configService.get("JWT_REFRESH_EXPIRES_IN", "7d");
    const expiresAt = this.calculateExpiry(refreshTtl);

    await this.prisma.refreshToken.create({
      data: { userId: payload.userId, tokenHash: refreshHash, expiresAt }
    });

    return { accessToken, refreshToken };
  }

  private calculateExpiry(ttl: string) {
    const match = ttl.match(/(\d+)([smhd])/);
    if (!match) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
    const value = Number(match[1]);
    const unit = match[2];
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000
    };
    return new Date(Date.now() + value * multipliers[unit]);
  }

  private hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}
