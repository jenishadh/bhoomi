"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { registerSchema } from "@/schemas/auth"

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    }
  }

  const { name, email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return {
      error: "Email already in use! Please login or try with different email.",
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      success: "Account created successfully. Please login",
    }
  } catch (error) {
    console.log("Register error: ", error)
    return {
      error: "Something went wrong! Please try again.",
    }
  }
}
