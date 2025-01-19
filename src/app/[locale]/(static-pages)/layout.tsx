import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import { getPageLocaleRoutes } from "@/i18n/routing"

export function generateStaticParams() {
  return getPageLocaleRoutes()
}

export default async function BaseStaticPageLayout({
  params,
  children,
}: DefaultPageProps) {
  const { locale } = await params

  /** Enable static rendering
   * - ¡must be called before next-intl functions eg. getTranslations()!
   * - must be called in EVERY layout and page that should be statically rendered since Next.js can render layouts and pages independently.
   */
  setRequestLocale(locale)

  return children
}
