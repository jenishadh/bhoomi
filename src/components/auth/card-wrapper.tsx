import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardWrapperProps {
  title: string
  description: string
  children: React.ReactNode
  linkHref: string
  linkLabel: string
}

export function CardWrapper({
  title,
  description,
  children,
  linkHref,
  linkLabel,
}: CardWrapperProps) {
  return (
    <Card className="w-[350px] md:w-[400px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link
          href={linkHref}
          className={buttonVariants({
            variant: "link",
            className: "w-full text-center text-zinc-700",
          })}
        >
          {linkLabel}
        </Link>
      </CardFooter>
    </Card>
  )
}
