import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Navbar } from "@/components/navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Navbar />
      <MaxWidthWrapper className="flex justify-center py-5 md:py-15">
        {children}
      </MaxWidthWrapper>
    </main>
  )
}
