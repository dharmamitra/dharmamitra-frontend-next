import { use } from "react"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Box, Divider, Typography } from "@mui/material"

import { DefaultPageParams, Metadata } from "@/app/types"
import PageContentFrame from "@/components/layout/PageContentFrame"
import Members from "@/components/Members"
import Section from "@/components/Section"

import membersData from "./data"

export async function generateMetadata({
  params,
}: DefaultPageParams): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale

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

export default function TeamPage({ params }: DefaultPageParams) {
  const { locale } = use(params)

  setRequestLocale(locale)
  const t = useTranslations("Team.dharmamitra")

  return (
    <PageContentFrame>
      <Typography variant="h1" textAlign="center">
        {t("h1")}
      </Typography>

      <Section sx={{ mt: 6 }}>
        <Members members={membersData.main} />
      </Section>

      <Section sx={{ mt: 10, pb: 12 }}>
        <DividedSectionHeader heading={t("volunteers.h2")} />
        <Members members={membersData.volunteers} />
      </Section>
    </PageContentFrame>
  )
}
