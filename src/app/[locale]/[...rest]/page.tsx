import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "NotFound" })

  return {
    title: t("title"),
  }
}

export default function CatchAllPage() {
  notFound()
}
