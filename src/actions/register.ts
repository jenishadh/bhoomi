"use server";

import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { setSessionCookie } from "@/lib/cookie";
import { prisma } from "@/lib/prisma";
import { createSession, generateSessionId } from "@/lib/session";
import { registerSchema } from "@/lib/zod/auth";

import { getUserByEmail } from "@/data/user";

export async function register(values: z.infer<typeof registerSchema>) {
  try {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { fullName, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        error: "Account on this email already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    if (!newUser) {
      return {
        error: "Failed to create account",
      };
    }

    const userId = newUser.id;
    const sessionId = generateSessionId();

    await createSession(sessionId, userId);
    await setSessionCookie(sessionId);

    return {
      success: "Account created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
