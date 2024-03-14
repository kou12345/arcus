"use server"

import { currentUser } from "@clerk/nextjs/server"

export const getAuthenticatedUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error("ERROR: Not authenticated")
  }

  return user
}
