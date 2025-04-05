import { z } from "zod"

import {
  deleteUserSessionCookie,
  getUserSessionCookie,
  setUserSessionCookie,
} from "@/lib/cookie"
import { redis } from "@/lib/redis"
import { sessionSchema } from "@/schemas/session"

export async function createUserSession(user: z.infer<typeof sessionSchema>) {
  const sessionId = crypto.randomUUID()
  const expiresAt = Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60

  try {
    await redis.set(`session: ${sessionId}`, sessionSchema.parse(user), {
      ex: expiresAt,
    })
    await setUserSessionCookie(sessionId)
  } catch (error) {
    console.log("Create session error :", error)
    throw error
  }
}

export async function deleteUserSession() {
  const sessionId = await getUserSessionCookie()
  try {
    await redis.del(`session: ${sessionId}`)
    await deleteUserSessionCookie()
  } catch (error) {
    console.log("Delete user session error: ", error)
    throw error
  }
}
