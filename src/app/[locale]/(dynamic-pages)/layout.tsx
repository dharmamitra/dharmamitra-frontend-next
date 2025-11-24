import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { NuqsAdapter } from "nuqs/adapters/react"
import { hasLocale } from "next-intl"

import { DefaultPageParams, DefaultPageProps, Metadata } from "@/app/types"
import appConfig from "@/config"
import { routing } from "@/i18n/routing"
import QueryProvider from "@/utils/QueryProvider"

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

export default async function DynamicPageLayout({ children, params }: DefaultPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
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
