"use client";

import { redirect } from "next/navigation";

import { logout } from "@/actions/logout";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function Logout() {
  async function handleLogout() {
    const response = await logout();
    if (response?.success) {
      toast.success(response.message);
      redirect("/");
    }
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
