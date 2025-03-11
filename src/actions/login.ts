"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { setSessionCookie } from "@/lib/cookie";
import { createSession, generateSessionId } from "@/lib/session";
import { loginSchema } from "@/lib/zod/auth";

import { getUserByEmail } from "@/data/user";

export async function login(values: z.infer<typeof loginSchema>) {
  try {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const errorMessage = {
      error: "Invalid login credentials.",
    };
    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return errorMessage;
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return errorMessage;
    }

    const userId = user.id;
    const sessionId = generateSessionId();

    await createSession(sessionId, userId);
    await setSessionCookie(sessionId);

    return {
      success: "Logged in successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
