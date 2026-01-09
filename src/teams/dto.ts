import { Type } from "class-transformer";
import { IsEmail, IsIn, IsInt, IsString } from "class-validator";

export class CreateTeamDto {
  @IsString()
  name!: string;
}

export class AddMemberDto {
  @IsEmail()
  email!: string;

  @IsIn(["owner", "admin", "member", "viewer"])
  role!: "owner" | "admin" | "member" | "viewer";
}

export class UpdateRetentionDto {
  @Type(() => Number)
  @IsInt()
  retentionDays!: number;
}
