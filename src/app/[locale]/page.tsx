import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import { PageShell } from "@/components/layout"
import TranslationFeature from "@/features/translation"

// As we're using query parameters that are only known
// at request time, we need to make sure we're using
// dynamic rendering (i.e. no SSG).
export const dynamic = "force-dynamic"

export default function Home() {
  const t = useTranslations("Home")

  return (
    <PageShell maxWidth="xl">
      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="primary"
        sx={{
          mb: { xs: 4, lg: 10 },
        }}
      >
        {t("h1")}
      </Typography>
      <TranslationFeature />
    </PageShell>
  )
}
