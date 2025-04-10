import { db } from "@/lib/db"

import { getUserSessionFromCookie } from "./session"

export async function getUserRecords() {
  const userSession = await getUserSessionFromCookie()
  if (!userSession) {
    return []
  }

  const userRecords = await db.mutationApplication.findMany({
    where: {
      appliedById: userSession.id,
    },
  })

  return userRecords
}

export async function getAllRecords() {
  const userRecords = await db.mutationApplication.findMany()
  return userRecords
}
