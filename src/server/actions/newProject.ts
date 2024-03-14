"use server"

import { newProjectRequest } from "@/types/type";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const newProject = async (formData: FormData) => {
  const projectName = formData.get("project_name");
  console.log(projectName);

  const validate = newProjectRequest.safeParse({ projectName });
  if (!validate.success) {
    throw new Error("Invalid form data");
  }

  const project = await createProject(validate.data.projectName);

  revalidatePath("/new");
  redirect(`/project/${project.id}`);
}

const createProject = async (projectName: string) => {
  console.log("createProject")
  console.log(projectName);
  try {
    const project = await db.project.create({
      data: {
        name: projectName,
      },
    });
    console.log(project)
    return project;
  }
  catch (e) {
    console.error(e);
    throw new Error("Failed to create project");
  }
}
