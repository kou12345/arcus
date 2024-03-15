"use server"

import { postCommentRequest } from "@/types/type";
import { getAuthenticatedUser } from "../utils/auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export type State = {
  done: boolean;
}

export const postComment = async (taskId: string, _prevState: State, formData: FormData): Promise<State> => {
  const user = await getAuthenticatedUser();
  
  const validate = postCommentRequest.safeParse({
    taskId,
    comment: formData.get("comment"),
  });
  if (!validate.success) {
    throw new Error("ERROR: Invalid form data");
  }

  await createComment({
    taskId: validate.data.taskId,
    userId: user.id,
    comment: validate.data.comment,
  });

  revalidatePath("/");
  return { done: true };
}

const createComment = async ({
  taskId,
  userId,
  comment,
}: {
  taskId: string;
  userId: string;
  comment: string;
}) => {
  try {
    const taskComment = await db.taskComment.create({
      data: {
        taskId,
        userId,
        content: comment,
      }
    })

    return taskComment;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: Failed to create comment");
  }
}