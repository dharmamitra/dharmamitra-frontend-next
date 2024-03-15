import { Pathnames } from "next-intl/navigation"

export const supportedLocales = ["en", "bo"] as const
export const defaultLocale = "en" as const
export const localePrefix = "as-needed"

export const pathnames = {
  "/": "/",
  "/about": {
    en: "/about",
    bo: "/ཨ་བྷུ།",
  },
  "/team": {
    en: "/team",
    bo: "/ཇ།",
  },
} satisfies Pathnames<typeof supportedLocales>

export type AppPathnames = keyof typeof pathnames
