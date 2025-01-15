import { getTranslations, setRequestLocale } from "next-intl/server"

import appConfig from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "About" })

  switch (appConfig.env) {
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
  setRequestLocale(locale)

  return null
}
