import { getTranslations, setRequestLocale } from "next-intl/server"

import appConfig from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Guide" })

  switch (appConfig.env) {
    case "kumarajiva":
      return {
        title: t("kumarajiva.title"),
      }
    default:
      return {}
  }
}

export default function GuidePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  return null
}
