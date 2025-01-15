
export type { Metadata } from "next"

export const supportedLocales = ["en", "zh-Hans", "zh-Hant"] as const
export const defaultLocale = "en" as const

export const localePrefixs: Record<typeof supportedLocales[number], string> = {
    "en": "/en",
    "zh-Hans": "/zh",
    "zh-Hant": "/zh-hant"
}

export type I18nMetadataHandlerProps = {
  params: { locale: SupportedLocale }
}

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
