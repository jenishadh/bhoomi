"use server";

import { deleteSessionCookie } from "@/lib/cookie";
import { getCurrentSession, invalidateSession } from "@/lib/session";

export async function logout() {
  const session = await getCurrentSession();

  if (!session) return null;

  await invalidateSession(session.id, session.userId);
  await deleteSessionCookie();

  return {
    success: true,
    message: "Logged Out",
  };
}
