import { db } from "@/lib/db"
import { userInfoSchema } from "@/schemas/user"

import { getUserSessionFromCookie } from "./session"

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    })
    return user
  } catch (error) {
    console.log("Get user by email error: ", error)
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
    })
    return user
  } catch (error) {
    console.log("Get user by id error: ", error)
    return null
  }
}

export async function getUserInfo() {
  const userSession = await getUserSessionFromCookie()
  if (!userSession) {
    return null
  }

  const user = await getUserById(userSession.id)

  const { success, data: userData } = userInfoSchema.safeParse(user)
  return success ? userData : null
}

export async function isUserLoggedIn() {
  const userSession = await getUserSessionFromCookie()

  return !!userSession
}

export async function getAllUsers() {
  const users = await db.user.findMany()
  return users
}
