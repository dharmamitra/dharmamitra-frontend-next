import { NextIntlClientProvider, useMessages } from "next-intl"
import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import Grid from "@mui/material/Grid"

import { pickMessages } from "@/i18n"
import customTheming from "@/utils/theme/config"

import TranslationInput from "./TranslationInput"
import TranslationInputEncodingSelector from "./TranslationInputEncodingSelector"
import TranslationResults from "./TranslationResults"
import TranslationTargetLanguageSelector from "./TranslationTargetLanguageSelector"

export default function TranslationFeature() {
  const messages = useMessages() as Messages
  const translationMessages = pickMessages({
    messages,
    messageKeys: ["translation"],
  })

  return (
    <NextIntlClientProvider messages={translationMessages}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: customTheming.shape.inputRadius,
          backgroundColor: {
            xs: grey[50],
            md: "background.paper",
          },
        }}
      >
        <Grid container>
          <TranslationInputEncodingSelector />
          <TranslationTargetLanguageSelector />
          <TranslationInput />
          <TranslationResults />
        </Grid>
      </Box>
    </NextIntlClientProvider>
  )
}
