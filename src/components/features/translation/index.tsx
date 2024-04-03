import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

import customTheming from "@/utils/theme/config"

import TranslationInput from "./TranslationInput"
import TranslationResults from "./TranslationResults"

export default function TranslationFeature() {
  const t = useTranslations("Home")

  return (
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
  )
}
