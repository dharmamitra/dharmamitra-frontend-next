import * as React from "react"
import Box from "@mui/material/Box"

import InputEncodingSelector from "@/components/features/paramSettings/InputEncodingSelector"
import { localStorageKeys } from "@/utils/constants"

import ResetOptionsButton from "./controls/ResetOptionsButton"
import ShowOptionsSwitch from "./controls/ShowOptionsSwitch"
import SubInputSearchControls from "./controls/SubInputSearchControls"
import SearchInput from "./SearchInput"
// import SearchExamples from "./SearchControls/SearchExamples"
import SearchResults from "./SearchResults"

type TranslationFeatureProps = {
  isSearchControlsOpen: boolean
  setIsSearchControlsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MitraSearch({
  isSearchControlsOpen,
  setIsSearchControlsOpen,
}: TranslationFeatureProps) {
  const handleToggleShowOptions = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSearchControlsOpen(event.target.checked)

      if (event.target.checked) {
        localStorage.setItem(
          localStorageKeys.showSearchControls,
          String(event.target.checked),
        )
      } else {
        localStorage.removeItem(localStorageKeys.showSearchControls)
      }
    },
    [setIsSearchControlsOpen],
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
              md: isSearchControlsOpen ? "space-between" : "flex-end",
            },
            flexWrap: "wrap",
            minHeight: "60px",
          }}
        >
          <InputEncodingSelector isOpen={isSearchControlsOpen} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShowOptionsSwitch
              isSearchControlsOpen={isSearchControlsOpen}
              handleToggleShowOptions={handleToggleShowOptions}
            />

            <ResetOptionsButton />
          </Box>
        </Box>
        <SearchInput />

        <SubInputSearchControls isOpen={isSearchControlsOpen} />

        {/* TODO: determin if to be removed or added to variant config
        <SearchExamples isShown={!isSearchControlsOpen} /> */}
      </Box>

      <SearchResults />
    </>
  )
}
