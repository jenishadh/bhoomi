import { cookies } from "next/headers";

import { redis } from "@/lib/redis";

export function generateSessionId() {
  return crypto.randomUUID();
}

export async function createSession(sessionId: string, userId: string) {
  const session: Session = {
    id: sessionId,
    userId,
  };

  await redis.set(
    `session:${sessionId}`,
    JSON.stringify({
      id: session.id,
      userId: session.userId,
    }),
    {
      exat: Date.now() + Number(7 * 24 * 60 * 60),
    }
  );

  await redis.sadd(`user_sessions:${session.userId}`, session.id);

  return session;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) return null;

  const response: Session | null = await redis.get(`session:${sessionId}`);

  if (!response) return null;

  const session: Session = {
    id: response.id,
    userId: response.userId,
  };

  return session;
}

export async function invalidateSession(sessionId: string, userId: string) {
  await redis.del(`session:${sessionId}`);
  await redis.srem(`user_sessions:${userId}`, sessionId);
}

export async function invalidateAllSession(userId: string) {
  const sessionIds = await redis.smembers(`user_sessions:${userId}`);
  if (sessionIds.length < 1) {
    return;
  }
  const pipeline = redis.pipeline();

  for (const sessionId of sessionIds) {
    pipeline.unlink(`session:${sessionId}`);
  }
  pipeline.unlink(`user_sessions:${userId}`);

  await pipeline.exec();
}

export interface Session {
  id: string;
  userId: string;
}
