import { z } from "zod";

export const newProjectRequest = z.object({
  projectName: z.string().min(1).max(48).regex(/^[a-zA-Z0-9-]+$/, {
    message: "アルファベット、数字、ハイフンのみ使用できます",
  }),
})

export const newTaskRequest = z.object({
  projectName: z.string(),
  taskName: z.string().min(1).max(60),
  dueDate: z.date(),
})

export const postCommentRequest = z.object({
  taskId: z.string().uuid(),
  comment: z.string().min(1).max(512),
})

export const saveDeadlineRequest = z.object({
  taskId: z.string().uuid(),
  deadline: z.date().optional(),
})

export type Task = {
  id: string;
  projectId: string;
  name: string;
  dueDate: Date | null;
  statusId: string | null;
  priorityId: string | null;
  createdAt: Date;
  updatedAt: Date;
};
