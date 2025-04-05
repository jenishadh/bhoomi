"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { z } from "zod"

import { createUserSession } from "@/lib/session"
import { getUserByEmail } from "@/data/user"
import { loginSchema } from "@/schemas/auth"

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    }
  }

  const { email, password } = validatedFields.data

  const user = await getUserByEmail(email)
  if (!user) {
    return {
      error: "Invalid login credentials!",
    }
  }

  const verifyPassword = await bcrypt.compare(password, user.password)
  if (!verifyPassword) {
    return {
      error: "Invalid login credentials!",
    }
  }

  // TODO: Email verification
  const emailVerified = true
  if (!emailVerified) {
    return {
      success: "Confirmation mail sent",
    }
  }

  try {
    await createUserSession(user)
  } catch (error) {
    console.log("Login error: ", error)
    return {
      error: "Something went wrong! Please try again.",
    }
  }

  redirect("/dashboard")
}
