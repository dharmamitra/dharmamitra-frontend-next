import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

import { supportedLocales } from "@/config"

export const pickMessages = ({
  messages,
  messageKeys,
}: {
  messages: Messages
  messageKeys: (keyof Messages)[]
}) => {
  return Object.entries(messages)
    .filter(([key]) => new RegExp(`^(${messageKeys.join("|")})`, "i").test(key))
    .reduce((obj: Partial<Messages>, [key, value]) => {
      return Object.assign(obj, { [key]: value })
    }, {})
}

export default getRequestConfig(async ({ locale }) => {
  const locales = Array.from(supportedLocales) as string[]
  const baseLocale = new Intl.Locale(locale).baseName

  if (!locales.includes(baseLocale)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
