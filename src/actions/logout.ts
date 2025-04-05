"use server"

import { redirect } from "next/navigation"

import { deleteUserSession } from "@/lib/session"

export async function logout() {
  try {
    await deleteUserSession()
    redirect("/login")
  } catch (error) {
    console.log("Logout error: ", error)
    throw error
  }
}
