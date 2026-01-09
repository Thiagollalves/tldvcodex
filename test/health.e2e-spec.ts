import { Test } from "@nestjs/testing";
import * as supertest from "supertest";

import { HealthModule } from "../src/health/health.module";

describe("HealthController (e2e)", () => {
  it("GET /health", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthModule]
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    const request = (supertest as unknown as { default?: typeof supertest })?.default ?? supertest;

    await request(app.getHttpServer())
      .get("/health")
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe("ok");
      });

    await app.close();
  });
});
