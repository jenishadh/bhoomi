import { getUserSessionCookie } from "@/lib/cookie"
import { redis } from "@/lib/redis"
import { sessionSchema } from "@/schemas/session"

export async function getUserSessionById(sessionId: string) {
  try {
    const session = await redis.get(`session: ${sessionId}`)

    const { success, data: user } = sessionSchema.safeParse(session)

    return success ? user : null
  } catch (error) {
    console.log("Get session by id error: ", error)
    return null
  }
}

export async function getUserSessionFromCookie() {
  try {
    const sessionId = await getUserSessionCookie()
    if (sessionId === null) {
      return null
    }
    const user = await getUserSessionById(sessionId)
    return user
  } catch (error) {
    console.log("Get user from session error: ", error)
    return null
  }
}
