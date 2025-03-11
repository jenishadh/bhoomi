import { Logout } from "@/components/auth/logout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold tracking-tight">BHOOMI</h1>
      <Logout />
    </main>
  );
}
