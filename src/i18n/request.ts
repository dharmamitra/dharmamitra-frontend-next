import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "@/i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment in the URL
  const requested = await requestLocale

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
