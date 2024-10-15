import * as React from "react"
import Box from "@mui/material/Box"

import InputEncodingSelector from "@/features/uiSettings/InputEncodingSelector"
import { localStorageKeys } from "@/utils/constants"

import ResetOptionsButton from "./ResetOptionsButton"
import SearchInput from "./SearchInput"
import SearchOptions from "./SearchOptions"
// import SearchExamples from "./SearchOptions/SearchExamples"
import SearchResults from "./SearchResults"
import ShowOptionsSwitch from "./ShowOptionsSwitch"

type TranslationFeatureProps = {
  isSearchOptionsOpen: boolean
  setIsSearchOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MitraSearch({
  isSearchOptionsOpen,
  setIsSearchOptionsOpen,
}: TranslationFeatureProps) {
  const handleToggleShowOptions = React.useCallback(
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
        id="search-input-wrapper"
        sx={{
          bgcolor: "background.paper",
          py: 1,
          zIndex: 10,
          transition: "position 1s ease-in-out, box-shadow 0.3s ease-in-out",
          top: {
            xs: "78px",
            md: "96px",
          },
          borderRadius: "0 0 10px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: {
              xs: "flex-start",
              md: isSearchOptionsOpen ? "space-between" : "flex-end",
            },
            flexWrap: "wrap",
            minHeight: "60px",
          }}
        >
          <InputEncodingSelector isOpen={isSearchOptionsOpen} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShowOptionsSwitch
              isSearchOptionsOpen={isSearchOptionsOpen}
              handleToggleShowOptions={handleToggleShowOptions}
            />

            <ResetOptionsButton />
          </Box>
        </Box>
        <SearchInput />

        <SearchOptions isOpen={isSearchOptionsOpen} />

        {/* TODO: determin if to be removed or added to env config
        <SearchExamples isShown={!isSearchOptionsOpen} /> */}
      </Box>

      <SearchResults />
    </>
  )
}
