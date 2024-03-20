import { z } from "zod";

export const newProjectRequest = z.object({
  projectName: z.string().min(1).max(48),
})

export const newTaskRequest = z.object({
  projectId: z.string().uuid(),
  taskName: z.string().min(1).max(60),
  dueDate: z.date(),
})

export const postCommentRequest = z.object({
  taskId: z.string().uuid(),
  comment: z.string().min(1).max(512),
})

export const saveDeadlineRequest = z.object({
  taskId: z.string().uuid(),
  deadline: z.date(),
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
