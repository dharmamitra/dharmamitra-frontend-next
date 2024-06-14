import { notFound } from "next/navigation"
import { useTranslations } from "next-intl"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Box, Divider, Typography } from "@mui/material"

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

const DividedSectionHeader = ({ heading }: { heading: string }) => (
  <Box mt={{ xs: 3, sm: 4.5 }} mb={{ xs: 4, sm: 4 }}>
    <Divider>
      <Typography
        variant="h2"
        textAlign="center"
        m={0}
        px={2}
        sx={{ fontSize: "1.5rem", fontWeight: "normal" }}
      >
        {heading}
      </Typography>
    </Divider>
  </Box>
)

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
      <Typography variant="h1" textAlign="center">
        {t("h1")}
      </Typography>

      <Section>
        <DividedSectionHeader heading={t("present.h2")} />
        <Members members={membersData.current} />
      </Section>

      <Section sx={{ mt: 10, pb: 12 }}>
        <DividedSectionHeader heading={t("past.h2")} />

        <Members members={membersData.past} />
      </Section>
    </>
  )
}
