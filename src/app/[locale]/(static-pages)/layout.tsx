import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { DefaultPageParams, DefaultPageProps, Metadata } from "@/app/types"
import appConfig from "@/config"
import { getPageLocaleRoutes, routing } from "@/i18n/routing"

export function generateStaticParams() {
  return getPageLocaleRoutes()
}

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: {
      default: t("title"),
      template: `%s · ${appConfig.siteName}`,
    },
    description: t("description"),
  }
}

export default async function BaseStaticPageLayout({ params, children }: DefaultPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return null
  }

  /** Enable static rendering
   * - ¡must be called before next-intl functions eg. getTranslations()!
   * - must be called in EVERY layout and page that should be statically rendered since Next.js can render layouts and pages independently.
   */
  setRequestLocale(locale)

  return children
}
