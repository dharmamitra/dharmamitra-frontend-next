import { Pathnames } from "next-intl/navigation"

export const supportedLocales = ["en", "bo", "zh", "zh-Hant"] as const
export const defaultLocale = "en" as const
export const localePrefix = "as-needed"
export const basePath = "/dmnext"

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/team": "/team",
} satisfies Pathnames<typeof supportedLocales>

export type AppPathnames = keyof typeof pathnames

// export type Locale = (typeof supportedLocales)[number]
