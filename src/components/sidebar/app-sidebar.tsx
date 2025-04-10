"use client"

import * as React from "react"
import { Dock, FileBadge, ShieldUser, SquareLibrary } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"

import { NavHeader } from "./nav-header"

const data = {
  navMain: [
    {
      title: "Mutation",
      icon: FileBadge,
      link: "/dashboard/mutation",
    },
    {
      title: "Records",
      icon: SquareLibrary,
      link: "/dashboard/records",
    },
  ],
  admin: [
    {
      title: "Applications",
      icon: Dock,
      link: "/dashboard/admin/applications",
    },
    {
      title: "Records",
      icon: SquareLibrary,
      link: "/dashboard/admin/records",
    },
    {
      title: "Users",
      icon: ShieldUser,
      link: "/dashboard/admin/users",
    },
  ],
}

export function AppSidebar({
  userInfo,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userInfo: {
    name: string
    email: string
    image: string | null
    role: "USER" | "ADMIN"
  } | null
}) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="Services" />
        {userInfo?.role === "ADMIN" && (
          <NavMain items={data.admin} label="Admin" />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
