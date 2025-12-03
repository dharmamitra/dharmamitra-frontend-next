import React from "react"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"

import { DefaultPageProps } from "@/app/types"
import appConfig from "@/config"
import { routing } from "@/i18n/routing"

type LayoutProps = {
  local: React.ReactNode
} & DefaultPageProps

export default async function TeamVariantLayout({ children, params, ...variants }: LayoutProps) {
  const { subPages, variant } = appConfig
  const variantHasRoute = subPages.includes("team")

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
