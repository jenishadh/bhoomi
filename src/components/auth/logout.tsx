"use client"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"

export function Logout() {
  async function onSubmit() {
    await logout()
  }

  return (
    <Button variant="destructive" onClick={onSubmit}>
      Logout
    </Button>
  )
}
