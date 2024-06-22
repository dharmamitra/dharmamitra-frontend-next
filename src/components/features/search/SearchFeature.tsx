import * as React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import { localStorageKeys } from "@/utils/ui"

import TranslationInputEncodingSelector from "../TranslationInputEncodingSelector"
// import useAppConfig from "@/hooks/useAppConfig"
import SearchInput from "./SearchInput"
import SearchOptions from "./SearchOptions"
// import TranslationKeyboardControls from "./TranslationKeyboardControls"
import SearchResults from "./SearchResults"

type TranslationFeatureProps = {
  isSearchOptionsOpen: boolean
  setIsAdvancedSearchMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TranslationFeature({
  isSearchOptionsOpen,
  setIsAdvancedSearchMode,
}: TranslationFeatureProps) {
  const t = useTranslations("search")
  // const { translateExtendedOptions } = useAppConfig().featureFlags

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedSearchMode(event.target.checked)

    if (event.target.checked) {
      localStorage.setItem(
        localStorageKeys.searchMode,
        String(event.target.checked),
      )
    } else {
      localStorage.removeItem(localStorageKeys.searchMode)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isSearchOptionsOpen ? "space-between" : "flex-end",
          flexWrap: "wrap",
          minHeight: "60px",
        }}
      >
        <TranslationInputEncodingSelector isOpen={isSearchOptionsOpen} />

        <FormControlLabel
          control={
            <Switch
              checked={isSearchOptionsOpen}
              onChange={handleChange}
              color="secondary"
            />
          }
          label={t("modeSwitchLabel")}
          labelPlacement="start"
        />
      </Box>
      <SearchInput />

      <SearchOptions isOpen={isSearchOptionsOpen} />

      <SearchResults />

      {/* <TranslationKeyboardControls /> */}
    </>
  )
}
