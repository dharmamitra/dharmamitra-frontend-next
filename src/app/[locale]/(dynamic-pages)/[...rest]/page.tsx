import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { DefaultPageParams, Metadata } from "@/app/types"

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "NotFound" })

  return { title: t("title") }
}

export default async function CatchAllPage() {
  return notFound()
}
