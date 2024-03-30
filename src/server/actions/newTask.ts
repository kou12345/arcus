"use server"

import { newTaskRequest } from "@/types/type";
import { getAuthenticatedUser } from "../utils/auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export type State = {
  done: boolean;
}

export const newTask = async (projectName: string, _prevState: State, formData: FormData): Promise<{done: boolean}> => {
  
  const inputDueDate = formData.get("due_date")
  if (inputDueDate === null) {
    throw new Error("ERROR: Invalid form data");
  }

  const validate = newTaskRequest.safeParse({
    projectName,
    taskName: formData.get("task_name"),
    dueDate: new Date(inputDueDate.toString() as string),
  });
  
  if (!validate.success) {
    throw new Error("ERROR: Invalid form data");
  }
  
  const user = await getAuthenticatedUser();

  // projectに属しているか確認
  const isUserInProjectResult = await isUserInProject(user.id, validate.data.projectName);
  if (!isUserInProjectResult) {
    throw new Error("ERROR: User is not in project");
  }

  await createTask({
    projectName: validate.data.projectName,
    taskName: validate.data.taskName,
    userId: user.id,
    dueDate: validate.data.dueDate,
  });

  console.log("Task created");
  revalidatePath(`/project/${projectName}`);
  return {
    done: true,
  }
}

const isUserInProject = async (userId: string, projectName: string) => {
  try {
    const project = await db.project.findUnique({
      where: {
        name: projectName,
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
  projectName,
  taskName,
  userId,
  dueDate,
}: {
  projectName: string;
  taskName: string;
  userId: string;
  dueDate: Date;
}) => {
  try {

    const project = await db.project.findUnique({
      select: {
        id: true,
      },
      where: {
        name: projectName,
      }
    });

    if (!project) {
      throw new Error("ERROR: Project not found");
    }

    const task = await db.task.create({
      data: {
        name: taskName,
        projectId: project.id,
        taskUsers: {
          create: {
            userId: userId
          }
        },
        dueDate,
      }
    });
  } catch (e) {
    console.error(e);
    throw new Error("ERROR: Failed to create task");
  }
}