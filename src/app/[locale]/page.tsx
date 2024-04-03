import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

import { PageShell } from "@/components/layout"
import TranslationInput from "@/features/translation/TranslationInput"
import TranslationResults from "@/features/translation/TranslationResults"
import customTheming from "@/utils/theme/config"

// As we're using query parameters that are only known
// at request time, we need to make sure we're using
// dynamic rendering (i.e. no SSG).
export const dynamic = "force-dynamic"

export default function Home() {
  const t = useTranslations("Home")

  return (
    <PageShell h1={t("h1")} maxWidth="xl" visuallyHiddenH1>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: customTheming.shape.inputRadius,
        }}
      >
        <Grid container>
          <TranslationInput placeholder={t("translation.placeholder")} />
          <TranslationResults />
        </Grid>
      </Box>
    </PageShell>
  )
}
