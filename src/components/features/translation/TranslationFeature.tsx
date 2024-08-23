import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import Grid from "@mui/material/Grid"

import TranslationUsageDialog from "@/components/features/translation/TranslationUsageDialog"
import useAppConfig from "@/hooks/useAppConfig"
import customTheming from "@/utils/theme/config"

import InputEncodingSelector from "../InputEncodingSelector"
import TranslationInputBox from "./TranslationInputBox"
import TranslationKeyboardControls from "./TranslationKeyboardControls"
import TranslationModelSelector from "./TranslationModelSelector"
import TranslationOutputBox from "./TranslationOutputBox"
import TranslationTaggingDrawer from "./TranslationTagging"
import TranslationTargetLanguageSelector from "./TranslationTargetLanguageSelector"

export default function TranslationFeature() {
  const { translateExtendedOptions } = useAppConfig().featureFlags

  return (
    <>
      <TranslationUsageDialog />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          mt: 8,
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
          <InputEncodingSelector labelled />
          <TranslationTargetLanguageSelector />
          <TranslationInputBox />
          <TranslationOutputBox />
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 4,
          rowGap: 2,
          mt: 3,
        }}
      >
        <TranslationModelSelector isEnabled={translateExtendedOptions} />
        <TranslationTaggingDrawer />
      </Box>

      <TranslationKeyboardControls />
    </>
  )
}
