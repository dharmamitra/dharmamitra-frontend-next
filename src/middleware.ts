import createMiddleware from "next-intl/middleware"
import { supportedLocales, defaultLocale, localePrefix } from "@/config"
import { NextRequest } from "next/server"

const handleI18nRouting = createMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix,
})

export default async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request)

  // next-intl cookie opt-out: https://github.com/amannn/next-intl/issues/454#issuecomment-1679998050
  if (response.cookies.get("NEXT_LOCALE")) {
    response.cookies.delete("NEXT_LOCALE")
  }

  return response
}

// Handling pathnames without locale a prefix: https://next-intl-docs.vercel.app/docs/routing/middleware#matcher-no-prefix
export const config = {
  matcher: [
    // Skip all paths that should not be internationalized (inc ones containing a dot, e.g. `favicon.ico`).
    "/",
    "/((?!api|_next|.*\\..*).*)",
  ],
}
