import { use } from "react"
import { notFound } from "next/navigation"
import { hasLocale, useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import { DefaultPageParams, Metadata } from "@/app/types"
import Section from "@/components/Section"
import { routing } from "@/i18n/routing"

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "pages.guide.kumarajiva" })

  return { title: t("title") }
}

export default function KumarajivaAboutPage({ params }: DefaultPageParams) {
  const { locale } = use(params)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = useTranslations("pages.guide.kumarajiva")

  return (
    <>
      <Typography variant="h1">{t("h1")}</Typography>

      <Section>
        <Typography variant="h2">{t("intro.h2")}</Typography>
        <Typography variant="reader" component="p">
          {t("intro.p1")}
        </Typography>
      </Section>

      <Section sx={{ mb: 10 }}>
        <Typography variant="h2" mb={3}>
          {t("features.h2")}
        </Typography>

        <Typography variant="reader" component="p">
          {t("features.p1")}
        </Typography>
      </Section>
    </>
  )
}
