import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import Grid from "@mui/material/Grid"

import customTheming from "@/utils/theme/config"

import TranslationInputBox from "./TranslationInputBox"
import TranslationInputEncodingSelector from "./TranslationInputEncodingSelector"
import TranslationOutputBox from "./TranslationOutputBox"
import TranslationTargetLanguageSelector from "./TranslationTargetLanguageSelector"

export default function TranslationFeature() {
  return (
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
        <TranslationInputBox />
        <TranslationOutputBox />
      </Grid>
    </Box>
  )
}
