import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export function HeroSection() {
  return (
    <section className="bg-blue-50 py-20">
      <MaxWidthWrapper>
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-pretty text-blue-800">
            Department of Land Records and Registration
          </h1>
          <p className="mx-auto max-w-prose text-center text-lg tracking-wide text-pretty">
            Official portal of the Government of Nepal to access, manage, and
            verify land ownership records with transparency and accountability.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/search" className={buttonVariants({ size: "lg" })}>
              Search Land Record
            </Link>
            <Link
              href="/search"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Apply for Mutation
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
