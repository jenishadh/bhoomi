import Link from "next/link"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export function Navbar() {
  return (
    <header className="h-20">
      <MaxWidthWrapper className="flex items-center">
        <Link href="/" className="font-mono text-xl font-bold">
          BHOOMI
        </Link>
      </MaxWidthWrapper>
    </header>
  )
}
