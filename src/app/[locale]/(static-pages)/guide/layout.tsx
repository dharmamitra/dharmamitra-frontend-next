import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import appConfig from "@/config"
import { routing } from "@/i18n/routing"

type LayoutProps = {
  kumarajiva: React.ReactNode
} & DefaultPageProps

export default async function GuideVariantLayout({ children, params, ...variants }: LayoutProps) {
  const { subPages, variant } = appConfig
  const variantHasRoute = subPages.includes("guide")

  if (!variantHasRoute) {
    notFound()
  }

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const content = variant in variants ? variants[variant as keyof typeof variants] : children

  return content ?? notFound()
}
