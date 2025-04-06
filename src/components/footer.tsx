import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export function Footer() {
  return (
    <footer className="bg-blue-500 py-6 text-white">
      <MaxWidthWrapper className="font-semibold">
        <p>© 2025</p>
        <p>Government of Nepal</p>
        <p>Department of Land Records & Registration</p>
      </MaxWidthWrapper>
    </footer>
  )
}
