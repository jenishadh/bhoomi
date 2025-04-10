import { db } from "@/lib/db"

import { getUserSessionFromCookie } from "./session"

export async function getUserRecords() {
  const userSession = await getUserSessionFromCookie()
  if (!userSession) return []

  const userRecords = await db.mutationApplication.findMany({
    where: {
      appliedById: userSession.id,
    },
  })

  return userRecords.length > 0 ? userRecords : []
}

export async function getAllRecords() {
  return await db.mutationApplication.findMany()
}

export async function getAllApplications() {
  return await db.mutationApplication.findMany({
    where: {
      applicationStatus: "PENDING",
    },
  })
}
