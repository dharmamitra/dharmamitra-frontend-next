import * as React from "react"
import { flushSync } from "react-dom"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useAtom } from "jotai"

import SearchKeyboardControls from "./controls/SearchKeyboardControls"

import { searchInputAtom } from "@/atoms"
import ClearButton from "@/components/ClearButton"
import TriggerQueryButton from "@/components/features/MitraSearch/controls/TriggerQueryButton"
import { useSearchInputParam } from "@/hooks/params"
import useDebouncedValue from "@/hooks/useDebouncedValue"

export const searchInputId = "search-input-field"

export default function SearchInput({ className }: { className?: string }) {
  const t = useTranslations("search")

  const [, setSearchInputParam] = useSearchInputParam()
  const [localSearchInput, setLocalSearchInput] = useAtom(searchInputAtom)

  const isInitializedRef = React.useRef(false)
  const debouncedLocalSearchInput = useDebouncedValue(localSearchInput, 200)

  React.useEffect(() => {
    setSearchInputParam((prev) => {
      if (!isInitializedRef.current) {
        setLocalSearchInput(prev)
        isInitializedRef.current = true
      }
      return debouncedLocalSearchInput
    })
  }, [debouncedLocalSearchInput, setSearchInputParam, setLocalSearchInput, isInitializedRef])

  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (key === "Enter") {
        event.preventDefault()
      }

      if (key === "Enter" && ctrlKey) {
        const input = document.getElementById(searchInputId)

        if (!input || !(input instanceof HTMLTextAreaElement) || !input.value) return

        const { selectionStart, value } = input
        const positionIndex = selectionStart || value.length

        const updatedValue = `${value.substring(0, positionIndex)}\n${value.substring(positionIndex)}`

        // flushSync batches state update and DOM manipulation, reducing layout thrashing.
        flushSync(() => {
          setLocalSearchInput(updatedValue)
        })

        // Makes sure the cursor position is set after the DOM update
        requestAnimationFrame(() => {
          input.setSelectionRange(positionIndex + 1, positionIndex + 1)
        })
      }
    },
    [setLocalSearchInput],
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
          value={localSearchInput}
          multiline
          type="search"
          onChange={(event) => setLocalSearchInput(event.target.value)}
          onKeyDown={handleKeyPress}
          endAdornment={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TriggerQueryButton input={localSearchInput} />

              <ClearButton input={localSearchInput} setInput={setLocalSearchInput} />
            </Box>
          }
        />
      </Box>
      <SearchKeyboardControls input={localSearchInput} />
    </>
  )
}
