import { getUserInfo } from "@/data/user"
import { Logout } from "@/components/auth/logout"

export default async function DashboardPage() {
  const user = await getUserInfo()
  return (
    <div>
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
      <h3>{user?.role}</h3>
      <Logout />
    </div>
  )
}
