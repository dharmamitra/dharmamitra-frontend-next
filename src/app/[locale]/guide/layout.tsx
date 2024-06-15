import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { unstable_setRequestLocale } from "next-intl/server"

import { PageShell } from "@/components/layout"
import appConfig from "@/config"
import { supportedLocales } from "@/i18n"

const isEnvRoute = appConfig.subPages.includes("guide")

export const generateStaticParams = () => {
  if (!isEnvRoute) {
    return []
  }

  return supportedLocales.map((locale) => ({ locale }))
}

export default function GuideLayout({
  kumarajiva,
  params: { locale },
}: {
  kumarajiva: ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  if (!isEnvRoute) {
    notFound()
  }

  let content

  switch (appConfig.env) {
    case "kumarajiva":
      content = <PageShell>{kumarajiva}</PageShell>
      break
    default:
      content = <></>
  }

  return (
    <html lang={locale}>
      <body>{content}</body>
    </html>
  )
}
