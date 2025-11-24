import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import { LayoutBase } from "@/components/layout"
import appConfig from "@/config"
import { localePrefixs } from "@/i18n"
import { getPageLocaleRoutes, routing } from "@/i18n/routing"

/** 
@see: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#description
*/
export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  alternates: {
    canonical: "/",
    languages: localePrefixs,
  },
  openGraph: {
    images: "/assets/dm-og.jpg",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export function generateStaticParams() {
  return getPageLocaleRoutes()
}

export default async function LocaleLayout({ params, children }: DefaultPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return <LayoutBase locale={locale}>{children}</LayoutBase>
}
