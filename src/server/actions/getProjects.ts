"use server"

import { db } from "../db";

export const getProjects = async () => {
  const projects = await selectProjects();
  return projects;
}

const selectProjects = async () => {
  try {
    const projects = await db.project.findMany({
      include: {
        projectUsers: {
          select: {
            role: true
          }
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
    return projects;
  }
  catch (e) {
    console.error(e);
    throw new Error("Failed to get projects");
  }
}
