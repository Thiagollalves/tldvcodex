import { IsIn, IsObject } from "class-validator";

export class IntegrationDto {
  @IsIn(["notion", "slack", "email"])
  type!: "notion" | "slack" | "email";

  @IsObject()
  settings!: Record<string, unknown>;
}
