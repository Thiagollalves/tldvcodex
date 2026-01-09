import { Type } from "class-transformer";
import { IsArray, IsIn, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMeetingDto {
  @IsString()
  title!: string;

  @IsString()
  language!: string;

  @IsIn(["daily", "one_on_one", "sales", "executive", "custom"])
  template!: "daily" | "one_on_one" | "sales" | "executive" | "custom";

  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UploadUrlDto {
  @IsString()
  mime!: string;

  @Type(() => Number)
  @IsInt()
  sizeBytes!: number;
}

export class CompleteUploadDto {
  @IsString()
  storageKey!: string;
}

export class ReprocessDto {
  @IsOptional()
  @IsIn(["daily", "one_on_one", "sales", "executive", "custom"])
  template?: "daily" | "one_on_one" | "sales" | "executive" | "custom";
}

export class MeetingIdParam {
  @IsUUID()
  id!: string;
}
