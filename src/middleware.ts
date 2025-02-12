import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

export default createMiddleware(routing)

// Handling pathnames without locale a prefix: https://next-intl-docs.vercel.app/docs/routing/middleware#matcher-no-prefix
export const config = {
  matcher: [
    // Skip all paths that should not be internationalized (inc ones containing a dot, e.g. `favicon.ico`).
    "/",
    "/((?!api|next|_next|monitoring-tunnel|.*\\..*).*)",
  ],
}
