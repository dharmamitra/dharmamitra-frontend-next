export const SUPPORTED_LOCALES = ["en", "ko", "ja", "bo", "zh-Hans", "zh-Hant", "hi", "de"] as const
export const defaultLocale = "en" as const

export const localePrefixs: Record<(typeof SUPPORTED_LOCALES)[number], string> = {
  en: "/en",
  ko: "/ko",
  ja: "/ja",
  bo: "/bo",
  "zh-Hans": "/zh",
  "zh-Hant": "/zh-hant",
  hi: "/hi",
  de: "/de",
}
