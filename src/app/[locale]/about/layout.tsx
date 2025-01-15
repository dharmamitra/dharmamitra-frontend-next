import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { PageShell } from "@/components/layout"
import appConfig from "@/config"
import { supportedLocales } from "@/i18n"

const isEnvRoute = appConfig.subPages.includes("about")

export const generateStaticParams = () => {
  if (!isEnvRoute) {
    return []
  }

  return supportedLocales.map((locale) => ({ locale }))
}

export default function AboutLayout({
  dharmamitra,
  params: { locale },
}: {
  dharmamitra: ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)

  if (!isEnvRoute) {
    notFound()
  }

  let content

  switch (appConfig.env) {
    default:
      content = <PageShell contained={false}>{dharmamitra}</PageShell>
  }

  return (
    <html lang={locale}>
      <body>{content}</body>
    </html>
  )
}
