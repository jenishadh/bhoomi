import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { getUserSessionFromCookie } from "@/data/session"

import {
  ADMIN_ROUTE,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
} from "./routes"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase().replace(/\/$/, "")

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isAdminRoute = pathname.startsWith(ADMIN_ROUTE)

  const redirectToLogin = () =>
    NextResponse.redirect(new URL("/login", request.url))

  const redirectToDashboard = () =>
    NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))

  let userSession = null
  if (!isPublicRoute || isAdminRoute || isAuthRoute) {
    userSession = await getUserSessionFromCookie()
  }

  const isLoggedIn = !!userSession

  if (isLoggedIn && isAuthRoute) {
    return redirectToDashboard()
  }

  if (!isPublicRoute && !isLoggedIn && !isAuthRoute) {
    return redirectToLogin()
  }

  if (isAdminRoute && (!isLoggedIn || userSession?.role !== "ADMIN")) {
    return redirectToLogin()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
