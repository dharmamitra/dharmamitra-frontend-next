import * as React from "react"
import { flushSync } from "react-dom"
import { useTranslations } from "next-intl"
import { useChat, UseChatOptions } from "@ai-sdk/react"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useAtom } from "jotai"

import { searchInputAtom } from "@/atoms"
import ClearButton from "@/components/ClearButton"
import StartStopStreamButton from "@/components/StartStopStreamButton"
import useDebouncedValue from "@/hooks/useDebouncedValue"

export const searchInputId = "search-input-field"

type ExploreInputFieldProps = {
  chatPropsWithId: UseChatOptions
  input: string
  isTriggerDisabled: boolean
  setInput: (event: string) => void
  completedQueryIds: Set<string>
  setCompletedQueryIds: React.Dispatch<React.SetStateAction<Set<string>>>
  onFileButtonClick?: () => void
  fileUploadDisabled?: boolean
  acceptedFileTypes?: string
}

function KeyboardControls({
  chatPropsWithId,
  isInput,
}: {
  chatPropsWithId: UseChatOptions
  isInput: boolean
}) {
  const { stop, status, handleSubmit } = useChat(chatPropsWithId)

  const handleUserKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      const { key } = event

      if (isInput && key === "Enter") {
        handleSubmit(event, { allowEmptySubmit: true })
      }
      if (status === "submitted" && key === "Escape") {
        stop()
      }
    },
    [stop, status, handleSubmit, isInput],
  )

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  }, [handleUserKeyPress, chatPropsWithId])

  return <></>
}

export default function ExploreInput({
  className,
  input,
  setInput,
  ...props
}: { className?: string } & ExploreInputFieldProps) {
  const t = useTranslations("search")

  const [localSearchInput, setLocalSearchInput] = useAtom(searchInputAtom)

  const isInitializedRef = React.useRef(false)
  const debouncedLocalSearchInput = useDebouncedValue(localSearchInput, 200)

  React.useEffect(() => {
    if (!isInitializedRef.current) {
      setLocalSearchInput(input)
      isInitializedRef.current = true
      return
    }

    if (input !== debouncedLocalSearchInput) setInput(debouncedLocalSearchInput)
  }, [debouncedLocalSearchInput, input, setInput, setLocalSearchInput])

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
              <StartStopStreamButton input={input} {...props} />

              <ClearButton input={localSearchInput} setInput={setLocalSearchInput} />
            </Box>
          }
        />
      </Box>
      <KeyboardControls chatPropsWithId={props.chatPropsWithId} isInput={Boolean(input)} />
    </>
  )
}
