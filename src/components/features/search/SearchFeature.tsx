import Box from "@mui/material/Box"

import TranslationInputEncodingSelector from "../TranslationInputEncodingSelector"
// import useAppConfig from "@/hooks/useAppConfig"
import SearchInput from "./SearchInput"
// import TranslationKeyboardControls from "./TranslationKeyboardControls"
import SearchResults from "./SearchResults"

export default function TranslationFeature() {
  // const { translateExtendedOptions } = useAppConfig().featureFlags

  return (
    <>
      <Box>
        <TranslationInputEncodingSelector />
        <SearchInput />
      </Box>
      <SearchResults />

      {/* <TranslationKeyboardControls /> */}
    </>
  )
}
