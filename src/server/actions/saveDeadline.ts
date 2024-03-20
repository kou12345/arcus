"use server"

import { saveDeadlineRequest } from "@/types/type";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export const saveDeadline = async (taskId: string, deadline: Date) => {
  // validation
  const validate = saveDeadlineRequest.safeParse({
    taskId,
    deadline,
  });

  if (!validate.success) {
    throw new Error("ERROR: Invalid form data");
  }

  // task exists
  const task = await db.task.findUnique({
    where: {
      id: validate.data.taskId,
    },
  });

  if (!task) {
    throw new Error("ERROR: Task not found");
  }


  // save deadline
  await db.task.update({
    where: {
      id: validate.data.taskId,
    },
    data: {
      dueDate: validate.data.deadline,
    },
  });

  revalidatePath("/");
}
