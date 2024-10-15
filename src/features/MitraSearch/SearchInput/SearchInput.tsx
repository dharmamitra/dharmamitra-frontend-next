import * as React from "react"
import { flushSync } from "react-dom"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"

import ClearButton from "@/components/ClearButton"
import TriggerQueryButton from "@/features/MitraSearch/controls/TriggerQueryButton"
import { useSearchInputParam } from "@/hooks/params"
import useDebouncedValue from "@/hooks/useDebouncedValue"

import SearchKeyboardControls from "../SearchKeyboardControls"

export const searchInputId = "search-input-field"

export default function SearchInput({ className }: { className?: string }) {
  const t = useTranslations("search")

  const [initialInputValue, setSearchInputParam] = useSearchInputParam()

  const [searchInput, setSearchInput] = React.useState(initialInputValue)

  const debouncedSearchInput = useDebouncedValue(searchInput, 100)

  React.useEffect(() => {
    setSearchInputParam(debouncedSearchInput)
  }, [debouncedSearchInput, setSearchInputParam])

  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (key === "Enter") {
        event.preventDefault()
      }

      if (key === "Enter" && ctrlKey) {
        const input = document.getElementById(searchInputId)

        if (!input || !(input instanceof HTMLTextAreaElement) || !input.value)
          return

        const { selectionStart, value } = input
        const positionIndex = selectionStart || value.length

        const updatedValue = `${value.substring(0, positionIndex)}\n${value.substring(positionIndex)}`

        // flushSync batches state update and DOM manipulation, reducing layout thrashing.
        flushSync(() => {
          setSearchInput(updatedValue)
        })

        // Makes sure the cursor position is set after the DOM update
        requestAnimationFrame(() => {
          input.setSelectionRange(positionIndex + 1, positionIndex + 1)
        })
      }
    },
    [setSearchInput],
  )

  return (
    <>
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
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={handleKeyPress}
          endAdornment={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TriggerQueryButton input={searchInput} />

              <ClearButton input={searchInput} setInput={setSearchInputParam} />
            </Box>
          }
        />
      </Box>
      <SearchKeyboardControls input={searchInput} />
    </>
  )
}
