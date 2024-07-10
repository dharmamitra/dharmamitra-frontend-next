import * as React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import { localStorageKeys } from "@/utils/constants"

import TranslationInputEncodingSelector from "../InputEncodingSelector"
// import useAppConfig from "@/hooks/useAppConfig"
import SearchInput from "./SearchInput"
import SearchKeyboardControls from "./SearchKeyboardControls"
import SearchOptions from "./SearchOptions"
import SearchResults from "./SearchResults"

type TranslationFeatureProps = {
  isSearchOptionsOpen: boolean
  setIsSearchOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchFeature({
  isSearchOptionsOpen,
  setIsSearchOptionsOpen,
}: TranslationFeatureProps) {
  const t = useTranslations("search")
  // const { translateExtendedOptions } = useAppConfig().featureFlags

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSearchOptionsOpen(event.target.checked)

      if (event.target.checked) {
        localStorage.setItem(
          localStorageKeys.showSearchOptions,
          String(event.target.checked),
        )
      } else {
        localStorage.removeItem(localStorageKeys.showSearchOptions)
      }
    },
    [setIsSearchOptionsOpen],
  )

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
            <Switch checked={isSearchOptionsOpen} onChange={handleChange} />
          }
          label={t("optionsSwitchLabel")}
          labelPlacement="start"
        />
      </Box>
      <SearchInput />

      <SearchOptions isOpen={isSearchOptionsOpen} />

      <SearchResults />

      <SearchKeyboardControls />
    </>
  )
}
