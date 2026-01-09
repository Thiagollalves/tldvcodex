import { IsEmail, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  provider?: "magic_link" | "google";

  @IsOptional()
  @IsString()
  idToken?: string;
}

export class VerifyDto {
  @IsString()
  token!: string;
}

export class RefreshDto {
  @IsString()
  refreshToken!: string;
}
