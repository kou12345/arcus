"use server"

import { newProjectRequest } from "@/types/type";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "../utils/auth";

type State = {
  error?: string;
}

export const newProject = async (prevState: State, formData: FormData) => {

  const user = await getAuthenticatedUser();

  const validate = newProjectRequest.safeParse({ projectName: formData.get("project_name") });
  if (!validate.success) {
    console.error(validate.error);
    return { error: validate.error.message };
  }

  // 同名のプロジェクトがあるか確認
  const isExist = await isExistProject(validate.data.projectName);
  if (isExist) {
    console.error("ERROR: Project already exists");
    return { error: "このプロジェクト名はすでに利用されています" };
  }

  const project = await createProject({
    userId: user.id,
    projectName: validate.data.projectName,
  });

  revalidatePath("/new");
  redirect(`/project/${project.id}`);
  return {};
}

const createProject = async ({
  userId,
  projectName,
}: {
  userId: string;
  projectName: string;
}) => {
  console.log("createProject")
  console.log(projectName);
  try {
    const project = await db.project.create({
      data: {
        name: projectName,
        projectUsers: {
          create: {
            userId,
            role: "ADMIN",
          }
        }
      },
    });
    console.log(project)
    return project;
  }
  catch (e) {
    console.error(e);
    throw new Error("ERROR: Failed to create project");
  }
}

const isExistProject = async (projectName: string): Promise<boolean> => {
  try {
    const project = await db.project.findFirst({
      where: {
        name: projectName
      }
    });
    
    if (project) {
      return true;
    }
    return false;
  }
  catch (e) {
    console.error(e);
    throw new Error("ERROR: Failed to get project");
  }
}
