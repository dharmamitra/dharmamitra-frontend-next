import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { DefaultPageParams, Metadata } from "@/app/types"
import { routing } from "@/i18n/routing"

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "pages.notFound" })

  return { title: t("title") }
}

export default async function CatchAllPage() {
  return notFound()
}
