import { z } from "zod";

export const summarySchema = z.object({
  title: z.string(),
  summary_bullets: z.array(z.string()),
  decisions: z.array(
    z.object({
      text: z.string(),
      owner: z.string().nullable()
    })
  ),
  risks: z.array(
    z.object({
      text: z.string(),
      severity: z.enum(["low", "medium", "high"])
    })
  ),
  next_steps: z.array(
    z.object({
      text: z.string(),
      owner: z.string().nullable(),
      due_date: z.string().nullable()
    })
  )
});

export const tasksSchema = z.object({
  tasks: z.array(
    z.object({
      text: z.string(),
      owner: z.string().nullable(),
      due_date: z.string().nullable()
    })
  ),
  decisions: z.array(
    z.object({
      text: z.string(),
      owner: z.string().nullable()
    })
  )
});

export const chatResponseSchema = z.object({
  answer: z.string(),
  citations: z.array(
    z.object({
      start_ms: z.number(),
      end_ms: z.number(),
      text: z.string()
    })
  )
});
