import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

import customTheming from "@/utils/theme/config"

import TranslationInput from "./TranslationInput"
import TranslationInputEncodingSelector from "./TranslationInputEncodingSelector"
import TranslationResults from "./TranslationResults"
import TranslationTargetLanguageSelector from "./TranslationTargetLanguageSelector"

export default function TranslationFeature() {
  const t = useTranslations("translation")

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
        <TranslationInputEncodingSelector />
        <TranslationTargetLanguageSelector />
        <TranslationInput
          placeholder={t("placeholder")}
          translateBtnLabel={t("translateBtnLabel")}
        />
        <TranslationResults />
      </Grid>
    </Box>
  )
}
