import Box from "@mui/material/Box"

import useAppConfig from "@/hooks/useAppConfig"

import TranslationModelSelector from "./TranslationModelSelector"
import TranslationTaggingDrawer from "./TranslationTagging"
import TranslationUsageDialog from "./TranslationUsageDialog"
import TranslatorBody from "./TranslatorBody"

export default function MitraTranslator() {
  const { translateExtendedOptions } = useAppConfig().featureFlags

  return (
    <>
      <TranslationUsageDialog />

      <TranslatorBody />

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
    </>
  )
}
