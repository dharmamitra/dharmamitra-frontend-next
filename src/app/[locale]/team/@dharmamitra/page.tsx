import { notFound } from "next/navigation"
import { useTranslations } from "next-intl"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import Members from "@/components/Members"
import Section from "@/components/Section"
import appConfig from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

import membersData from "./data"

const isEnvRoute = appConfig.subPages.includes("team")

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Team.dharmamitra" })

  return {
    title: t("title"),
  }
}

export default function TeamPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations("Team.dharmamitra")

  if (!isEnvRoute) {
    notFound()
  }

  return (
    <>
      <Typography variant="h1">{t("h1")}</Typography>

      <Section>
        <Typography variant="h2" mt={{ xs: 2, sm: 4 }} mb={4}>
          {t("present.h2")}
        </Typography>

        <Members members={membersData.current} />
      </Section>

      <Section>
        <Typography variant="h2" mb={4}>
          {t("past.h2")}
        </Typography>

        <Members members={membersData.past} />
      </Section>
    </>
  )
}
