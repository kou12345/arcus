"use server"

import { z } from "zod";
import { db } from "../db";

export const getProjectByName = async (name: string) => {
  console.log("getProjectByName", name)

  const validate = z.string().safeParse(name);
  if (!validate.success) {
    throw new Error("ERROR: Invalid project name");
  }

  try {
    const project = await db.project.findUnique({
      where: {
        name: validate.data,
      },
    });

    if (!project) {
      throw new Error("ERROR: Project not found");
    }

    return project;
  }
  catch (e) {
    console.error(e);
    throw new Error("ERROR: Failed to get project");
  }
}
