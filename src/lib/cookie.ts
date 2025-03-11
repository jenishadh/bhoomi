import { cookies } from "next/headers";

export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 7 * 24 * 60 * 60,
    path: "/",
  });
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
