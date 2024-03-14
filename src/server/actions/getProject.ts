"use server"

import { z } from "zod";
import { db } from "../db";

export const getProjectById = async (id: string) => {

  const validate = z.string().uuid().safeParse(id);
  if (!validate.success) {
    throw new Error("ERROR: Invalid project id");
  }

  try {
    const project = await db.project.findUnique({
      where: {
        id: validate.data,
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
