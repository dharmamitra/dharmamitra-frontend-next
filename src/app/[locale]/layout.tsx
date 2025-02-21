import { notFound } from "next/navigation"

import { DefaultPageProps } from "@/app/types"
import { LayoutBase } from "@/components/layout"
import { isValidLocaleRoute } from "@/i18n/routing"

export default async function LocaleLayout({
  params,
  children,
}: DefaultPageProps) {
  const { locale } = await params

  if (!isValidLocaleRoute(locale)) {
    notFound()
  }

  return <LayoutBase locale={locale}>{children}</LayoutBase>
}
