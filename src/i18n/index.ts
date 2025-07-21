export const SUPPORTED_LOCALES = ["en", "ja", "ko", "hi", "zh-Hant", "zh-Hans", "bo"] as const
export const defaultLocale = "en" as const

export const localePrefixs: Record<(typeof SUPPORTED_LOCALES)[number], string> = {
  en: "/en",
  ja: "/ja",
  ko: "/ko",
  hi: "/hi",
  "zh-Hant": "/zh-hant",
  "zh-Hans": "/zh",
  bo: "/bo",
}
