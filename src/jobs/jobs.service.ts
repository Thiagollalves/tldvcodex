import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Queue } from "bullmq";

@Injectable()
export class JobsService {
  private queue: Queue;

  constructor(private configService: ConfigService) {
    this.queue = new Queue("meeting-pipeline", {
      connection: { url: this.configService.getOrThrow("REDIS_URL") }
    });
  }

  async enqueue(name: string, payload: Record<string, unknown>) {
    return this.queue.add(name, payload, {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 }
    });
  }
}
