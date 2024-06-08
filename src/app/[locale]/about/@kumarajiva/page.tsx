import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import Section from "@/components/Section"

export default function AboutKumarajivaPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations("About.kumarajiva")

  return (
    <>
      <Typography variant="h1">{t("h1")}</Typography>

      <Section>
        <Typography variant="h2">{t("background.h2")}</Typography>
        <Typography variant="reader" component="p">
          {t("background.p1")}
        </Typography>
        <Typography variant="reader" component="p">
          {t("background.p2")}
        </Typography>
      </Section>

      <Section sx={{ mb: 10 }}>
        <Typography variant="h2" mb={3}>
          {t("collaboration.h2")}
        </Typography>

        <Typography variant="reader" component="p">
          {t("collaboration.p1")}
        </Typography>
      </Section>
    </>
  )
}
