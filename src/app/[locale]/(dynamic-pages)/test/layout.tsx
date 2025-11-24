import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"

import { DefaultPageProps } from "@/app/types"
import appConfig from "@/config"
import { routing } from "@/i18n/routing"

export default async function NewsLayout({ children, params }: DefaultPageProps) {
  const { subPages } = appConfig
  const variantHasRoute = subPages.includes("test")

  if (!variantHasRoute) {
    notFound()
  }

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return null
  }

  setRequestLocale(locale)

  return children
}
