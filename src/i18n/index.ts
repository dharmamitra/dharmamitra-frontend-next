export const supportedLocales = ["en", "zh-Hans", "zh-Hant"] as const
export const defaultLocale = "en" as const

export const localePrefixs: Record<(typeof supportedLocales)[number], string> =
  {
    en: "/en",
    "zh-Hans": "/zh",
    "zh-Hant": "/zh-hant",
  }
