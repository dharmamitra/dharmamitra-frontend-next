import { notFound } from "next/navigation"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { I18nMetadataHandlerProps, Metadata, supportedLocales } from "@/i18n"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "NotFound" })

  return {
    title: t("title"),
  }
}

export const generateStaticParams = () => {
  return supportedLocales.map((locale) => ({ locale }))
}

export default function CatchAllPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  notFound()
}
