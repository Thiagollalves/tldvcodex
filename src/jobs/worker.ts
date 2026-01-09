import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import { Worker } from "bullmq";
import { chatResponseSchema, summarySchema, tasksSchema } from "../common/schemas";

const prisma = new PrismaClient();

const worker = new Worker(
  "meeting-pipeline",
  async (job) => {
    const { meetingId } = job.data as { meetingId: string };

    switch (job.name) {
      case "extract-audio":
        await prisma.meeting.update({
          where: { id: meetingId },
          data: { status: "audio_extracted" }
        });
        await job.queue.add("transcribe", { meetingId });
        return;

      case "transcribe":
        await prisma.transcript.upsert({
          where: { meetingId },
          update: {},
          create: {
            meetingId,
            fullText: "Transcrição simulada para o MVP.",
            segments: [
              { start_ms: 0, end_ms: 15000, speaker: "S1", text: "Bem-vindos à reunião." }
            ],
            language: "pt-BR"
          }
        });
        await prisma.meeting.update({ where: { id: meetingId }, data: { status: "transcribed" } });
        await job.queue.add("summarize", { meetingId });
        return;

      case "summarize": {
        const summary = summarySchema.parse({
          title: "Resumo da reunião",
          summary_bullets: ["Principais tópicos discutidos."],
          decisions: [{ text: "Aprovar próxima etapa", owner: null }],
          risks: [{ text: "Dependência externa", severity: "medium" }],
          next_steps: [{ text: "Enviar follow-up", owner: null, due_date: null }]
        });

        const latest = await prisma.summaryVersion.findFirst({
          where: { meetingId },
          orderBy: { version: "desc" }
        });
        const version = latest ? latest.version + 1 : 1;

        await prisma.summaryVersion.create({
          data: {
            meetingId,
            version,
            template: "daily",
            model: "mock",
            summary
          }
        });
        await prisma.meeting.update({ where: { id: meetingId }, data: { status: "summarized" } });
        await job.queue.add("extract-tasks", { meetingId });
        return;
      }

      case "extract-tasks": {
        const extraction = tasksSchema.parse({
          tasks: [{ text: "Preparar proposta", owner: null, due_date: null }],
          decisions: [{ text: "Seguir com piloto", owner: null }]
        });

        await prisma.task.deleteMany({ where: { meetingId } });
        await prisma.decision.deleteMany({ where: { meetingId } });

        await prisma.task.createMany({
          data: extraction.tasks.map((task) => ({
            meetingId,
            text: task.text,
            owner: task.owner ?? undefined,
            dueDate: task.due_date ? new Date(task.due_date) : undefined
          }))
        });

        await prisma.decision.createMany({
          data: extraction.decisions.map((decision) => ({
            meetingId,
            text: decision.text,
            owner: decision.owner ?? undefined
          }))
        });

        await prisma.meeting.update({ where: { id: meetingId }, data: { status: "tasks_extracted" } });
        await job.queue.add("export", { meetingId });
        return;
      }

      case "export":
        await prisma.meeting.update({ where: { id: meetingId }, data: { status: "ready" } });
        return;

      case "chat": {
        const response = chatResponseSchema.parse({
          answer: "Não encontrei evidência suficiente na reunião.",
          citations: []
        });
        return response;
      }

      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  },
  {
    connection: { url: process.env.REDIS_URL }
  }
);

worker.on("failed", async (job, error) => {
  if (!job) return;
  await prisma.meeting.update({
    where: { id: job.data.meetingId },
    data: { status: "failed" }
  });
  console.error("Job failed", error);
});
