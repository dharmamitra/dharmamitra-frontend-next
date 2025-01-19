import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

import { defaultLocale, localePrefixs, supportedLocales } from "@/i18n"

export const routing = defineRouting({
  locales: supportedLocales,
  defaultLocale,
  localePrefix: {
    mode: "as-needed",
    prefixes: localePrefixs,
  },
  localeCookie: false,
})

export function isValidLocaleRoute(locale: unknown): locale is SupportedLocale {
  return (
    typeof locale === "string" &&
    routing.locales.some((value) => value === locale)
  )
}

export function getPageLocaleRoutes() {
  return routing.locales.map((locale) => ({ locale }))
}

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
