import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { isUserLoggedIn } from "@/data/user"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

import { buttonVariants } from "./ui/button"

export async function Navbar() {
  const user = await isUserLoggedIn()
  return (
    <header className="h-20">
      <MaxWidthWrapper className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <Link href="/" className="font-mono text-xl font-bold">
            BHOOMI
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className={buttonVariants({
                className: "group",
              })}
            >
              Dashboard
              <ArrowRight className="duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Register
              </Link>
              <Link href="/login" className={buttonVariants()}>
                Login
              </Link>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  )
}
