import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { NuqsAdapter } from "nuqs/adapters/react"

import { DefaultPageParams, DefaultPageProps, Metadata } from "@/app/types"
import appConfig from "@/config"
import { isValidLocaleRoute } from "@/i18n/routing"
import QueryProvider from "@/utils/QueryProvider"

export async function generateMetadata({
  params,
}: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(appConfig.siteUrl),
    title: {
      default: t("title"),
      template: `%s · ${appConfig.siteName}`,
    },
    // TODO: handle description for envs.
    description: t("description"),
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default async function DynamicPageLayout({
  children,
  params,
}: DefaultPageProps) {
  const { locale } = await params

  if (!isValidLocaleRoute(locale)) {
    return notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <QueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryProvider>
    </NextIntlClientProvider>
  )
}
