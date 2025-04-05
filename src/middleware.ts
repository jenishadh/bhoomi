import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { getUserSessionFromCookie } from "@/data/session"

import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
} from "./routes"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isAdminRoute = ADMIN_ROUTES.includes(pathname)

  const userSession = await getUserSessionFromCookie()
  const isLoggedIn = !!userSession

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
  }

  if (!isPublicRoute && !isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAdminRoute) {
    if (!isLoggedIn || userSession?.role !== "ADMIN")
      return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
