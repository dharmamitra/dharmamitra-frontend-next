import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DefaultPageProps } from "@/app/types"
import { LayoutBase } from "@/components/layout"
import appConfig from "@/config"
import { localePrefixs } from "@/i18n"
import { isValidLocaleRoute } from "@/i18n/routing"

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
    images: "/assets/dm-og.png",
  },
  twitter: {
    card: "summary_large_image",
  },
}

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
