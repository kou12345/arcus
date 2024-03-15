"use server"

import { newTaskRequest } from "@/types/type";
import { getAuthenticatedUser } from "../utils/auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export type State = {
  done: boolean;
}

export const newTask = async (projectId: string, _prevState: State, formData: FormData): Promise<{done: boolean}> => {
  
  const validate = newTaskRequest.safeParse({
    projectId,
    taskName: formData.get("task_name"),
  });
  
  if (!validate.success) {
    throw new Error("ERROR: Invalid form data");
  }
  
  const user = await getAuthenticatedUser();

  // projectに属しているか確認
  const isUserInProjectResult = await isUserInProject(user.id, validate.data.projectId);
  if (!isUserInProjectResult) {
    throw new Error("ERROR: User is not in project");
  }

  await createTask({
    projectId: validate.data.projectId,
    taskName: validate.data.taskName,
    userId: user.id,
  });

  console.log("Task created");
  revalidatePath(`/project/${projectId}`);
  return {
    done: true,
  }

}

const isUserInProject = async (userId: string, projectId: string) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        projectUsers: {
          where: {
            userId,
          }
        }
      },
      });

    if (project?.projectUsers.length === 0) {
      return false;
    }

    return true;
  }
  catch (e) {
    console.error(e);
    throw new Error("ERROR: Failed to check user in project");
  }
}

const createTask = async ({
  projectId,
  taskName,
  userId,
}: {
  projectId: string;
  taskName: string;
  userId: string;
}) => {
  try {
    const task = await db.task.create({
      data: {
        name: taskName,
        projectId,
        taskUsers: {
          create: {
            userId: userId
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("ERROR: Failed to create task");
  }
}