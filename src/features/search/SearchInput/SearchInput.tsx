import * as React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"

import ClearButton from "@/components/ClearButton"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"

import StartStopButton from "../SearchStartStopButton"

export const searchInputId = "search-input-field"

export default function SearchInput({ className }: { className?: string }) {
  const t = useTranslations("search")

  const { searchInput, setSearchInput } = useSearchCommonParams()

  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (key === "Enter") {
        event.preventDefault()
      }

      if (key === "Enter" && ctrlKey) {
        const input = document.getElementById(searchInputId) as HTMLInputElement

        if (!input) return

        const { value, selectionStart } = input

        const positionIndex = selectionStart || value.length

        const updatedValue =
          value.substring(0, positionIndex) +
          "\n" +
          value.substring(positionIndex)

        setSearchInput(updatedValue)

        requestAnimationFrame(() => {
          input.setSelectionRange(positionIndex + 1, positionIndex + 1)
        })
      }
    },
    [setSearchInput],
  )

  return (
    <Box className={className}>
      <OutlinedInput
        id={searchInputId}
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          overflow: "clip",
          py: 1.2,
        }}
        placeholder={t("placeholder")}
        inputProps={{
          "aria-label": "search",
        }}
        value={searchInput}
        multiline
        type="search"
        onChange={setSearchInput}
        onKeyDown={handleKeyPress}
        endAdornment={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StartStopButton />

            <ClearButton input={searchInput} setInput={setSearchInput} />
          </Box>
        }
      />
    </Box>
  )
}
