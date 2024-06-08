import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import appConfig from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "About" })

  switch (appConfig.env) {
    case "kumarajiva":
      return {
        title: t("kumarajiva.title"),
      }
    default:
      return {
        title: t("dharmamitra.title"),
      }
  }
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return null
}
