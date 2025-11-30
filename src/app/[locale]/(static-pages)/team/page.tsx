import { use } from "react"
import { notFound } from "next/navigation"
import { hasLocale, useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Box, Divider, Typography } from "@mui/material"
import visuallyHidden from "@mui/utils/visuallyHidden"

import membersData from "./data"

import { DefaultPageParams, Metadata } from "@/app/types"
import PageContentFrame from "@/components/layout/PageContentFrame"
import Members from "@/components/Members"
import Section from "@/components/Section"
import { routing } from "@/i18n/routing"

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "pages.team.dharmamitra" })

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

export default function TeamPage({ params }: DefaultPageParams) {
  const { locale } = use(params)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = useTranslations("pages.team.dharmamitra")

  return (
    <PageContentFrame>
      <Typography variant="h1" textAlign="center">
        {t("h1")}
      </Typography>

      <Section sx={{ mt: 6 }}>
        <Typography component="h2" style={visuallyHidden}>
          {t("teamH2")}
        </Typography>
        <Typography variant="h3" textAlign="center" color="textSecondary">
          {t("current")}
        </Typography>
        <Members members={membersData.current} />
        <Typography
          variant="h3"
          textAlign="center"
          color="textSecondary"
          sx={{ mt: { xs: 3, sm: 8 } }}
        >
          {t("former")}
        </Typography>
        <Members members={membersData.former} />
      </Section>

      <Section sx={{ mt: 10, pb: 12 }}>
        <DividedSectionHeader heading={t("studentVolunteersH2")} />
        <Typography variant="h3" textAlign="center" color="textSecondary">
          {t("current")}
        </Typography>
        <Members members={membersData.currentVolunteers} />
        <Typography
          variant="h3"
          textAlign="center"
          color="textSecondary"
          sx={{ mt: { xs: 3, sm: 8 } }}
        >
          {t("former")}
        </Typography>
        <Members members={membersData.formerVolunteers} />
      </Section>
    </PageContentFrame>
  )
}
