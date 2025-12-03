import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { DefaultPageParams, DefaultPageProps, Metadata } from "@/app/types"
import FeatureContainer from "@/components/layout/FeatureContainer"
import appConfig from "@/config"
import { routing } from "@/i18n/routing"

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

export default async function DynamicPageLayout({ params }: DefaultPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return notFound()
  }

  return <FeatureContainer />
}
