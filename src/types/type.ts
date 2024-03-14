import { z } from "zod";

export const newProjectRequest = z.object({
  projectName: z.string().min(1).max(48),
})
