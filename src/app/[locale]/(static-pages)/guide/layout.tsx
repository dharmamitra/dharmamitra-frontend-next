import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import appConfig from "@/config"

type LayoutProps = {
  kumarajiva: React.ReactNode
} & DefaultPageProps

export default async function GuideVariantLayout({
  children,
  params,
  ...variants
}: LayoutProps) {
  const { subPages, variant } = appConfig
  const variantHasRoute = subPages.includes("guide")

  if (!variantHasRoute) {
    notFound()
  }

  const { locale } = await params
  setRequestLocale(locale)

  const content =
    variant in variants ? variants[variant as keyof typeof variants] : children

  return content ?? notFound()
}
