import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { defaultLocale, isLocale } from "@/lib/i18n"

const PUBLIC_FILE = /\.[^/]+$/

function isExcludedPath(pathname: string) {
  if (PUBLIC_FILE.test(pathname)) {
    return true
  }

  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/manifest.json" ||
    pathname === "/favicon.ico" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isExcludedPath(pathname)) {
    return NextResponse.next()
  }

  const segments = pathname.split("/").filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && isLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-execute-locale", firstSegment)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.redirect(redirectUrl, 301)
}

export const config = {
  matcher: ["/:path*"],
}
