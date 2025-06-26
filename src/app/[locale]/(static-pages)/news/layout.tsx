import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import appConfig from "@/config"

export default async function NewsLayout({ children, params }: DefaultPageProps) {
  const { subPages } = appConfig
  const variantHasRoute = subPages.includes("news")

  if (!variantHasRoute) {
    notFound()
  }

  const { locale } = await params
  setRequestLocale(locale)

  return children
}
