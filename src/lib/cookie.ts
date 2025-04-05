import { cookies } from "next/headers"

export async function setUserSessionCookie(sessionId: string) {
  try {
    const cookieStore = await cookies()
    cookieStore.set("sessionId", sessionId, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
      path: "/",
    })
  } catch (error) {
    console.log("Set user session cookie error: ", error)
    throw error
  }
}

export async function getUserSessionCookie() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("sessionId")?.value ?? null
    return sessionId
  } catch (error) {
    console.log("Get user session cookie error: ", error)
    throw error
  }
}

export async function deleteUserSessionCookie() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("sessionId")
  } catch (error) {
    console.log("Delete user session cookie error: ", error)
    throw error
  }
}
