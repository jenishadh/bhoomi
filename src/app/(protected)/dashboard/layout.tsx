import { getUserInfo } from "@/data/user"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserInfo()
  return (
    <SidebarProvider>
      <AppSidebar userInfo={user} />
      <div className="flex w-full flex-col">
        <header className="flex h-12 items-center">
          <SidebarTrigger />
        </header>
        <main className="w-full">{children}</main>
      </div>
    </SidebarProvider>
  )
}
