import { useTranslations } from "next-intl"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import { PageShell } from "@/components/layout"
import Members from "@/components/Members"
import Section from "@/components/Section"
import { supportedLocales } from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

import membersData from "./data"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Team" })

  return {
    title: t("title"),
  }
}

export const generateStaticParams = () => {
  return supportedLocales.map((locale) => ({ locale }))
}

export default function Team({ params: { locale } }: I18nMetadataHandlerProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations("Team")

  return (
    <PageShell>
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
    </PageShell>
  )
}
