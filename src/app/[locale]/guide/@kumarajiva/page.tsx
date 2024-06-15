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
  const t = useTranslations("Guide.kumarajiva")

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
