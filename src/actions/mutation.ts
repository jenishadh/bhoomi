"use server"

import { z } from "zod"

import { db } from "@/lib/db"
import { getUserSessionFromCookie } from "@/data/session"
import { mutationSchema } from "@/schemas/mutation"

export async function mutation(values: z.infer<typeof mutationSchema>) {
  const validatedFields = mutationSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    }
  }

  const applicationData = validatedFields.data

  const user = await getUserSessionFromCookie()
  if (!user) {
    return {
      error: "Invalid session!",
    }
  }

  try {
    await db.mutationApplication.create({
      data: {
        ...applicationData,
        appliedById: user.id,
      },
    })
    return {
      success: "Application submitted successfully",
    }
  } catch (error) {
    console.log("Submission error: ", error)
    return {
      error: "Something went wrong! Please try again.",
    }
  }
}

type ApplicationStatus = "PENDING" | "PROCESSING" | "APPROVED" | "REJECTED"

export async function updateStatus(id: string, status: ApplicationStatus) {
  try {
    await db.mutationApplication.update({
      where: {
        id: id,
      },
      data: {
        applicationStatus: status,
      },
    })
    return {
      success: "Application submitted successfully",
    }
  } catch (error) {
    console.log("Update error: ", error)
    return {
      error: "Something went wrong! Please try again.",
    }
  }
}
