import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

import { defaultLocale, localePrefixs, SUPPORTED_LOCALES } from "@/i18n"

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale,
  localePrefix: {
    mode: "as-needed",
    prefixes: localePrefixs,
  },
  localeCookie: false,
})

export function getPageLocaleRoutes() {
  return routing.locales.map((locale) => ({ locale }))
}

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
