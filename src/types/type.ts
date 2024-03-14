import { z } from "zod";

export const newProjectRequest = z.object({
  projectName: z.string().min(1).max(48),
})

export const newTaskRequest = z.object({
  projectId: z.string().uuid(),
  taskName: z.string().min(1).max(60),
})
