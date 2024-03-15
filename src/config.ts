import { Pathnames } from "next-intl/navigation"

export const supportedLocales = ["en", "bo"] as const
export const defaultLocale = "en" as const
export const localePrefix = 'always'

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/team": "/team",
} satisfies Pathnames<typeof supportedLocales>

export type AppPathnames = keyof typeof pathnames
