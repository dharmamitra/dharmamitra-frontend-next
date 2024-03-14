import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

export const supportedLocales = ["en", "bo"] as const
export const defaultLocale = "en" as const

export default getRequestConfig(async ({ locale }) => {
  const locales = Array.from(supportedLocales) as string[]
  const baseLocale = new Intl.Locale(locale).baseName

  if (!locales.includes(baseLocale)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
