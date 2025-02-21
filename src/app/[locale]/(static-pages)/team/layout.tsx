import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import appConfig from "@/config"

type LayoutProps = {
  local: React.ReactNode
} & DefaultPageProps

export default async function TeamVariantLayout({
  children,
  params,
  ...variants
}: LayoutProps) {
  const { subPages, variant } = appConfig
  const variantHasRoute = subPages.includes("team")

  if (!variantHasRoute) {
    notFound()
  }

  const { locale } = await params
  setRequestLocale(locale)

  const content =
    variant in variants ? variants[variant as keyof typeof variants] : children

  return content ?? notFound()
}
