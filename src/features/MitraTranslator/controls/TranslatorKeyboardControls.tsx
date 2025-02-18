"use client"

import React from "react"
import { useChat, UseChatOptions } from "@ai-sdk/react"

interface TranslatorKeyboardControlsProps {
  chatPropsWithId: UseChatOptions
  isInput: boolean
}

export default function TranslatorKeyboardControls({
  chatPropsWithId,
  isInput,
}: TranslatorKeyboardControlsProps) {
  const { stop, status, handleSubmit } = useChat(chatPropsWithId)

  const handleUserKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (isInput && key === "Enter" && ctrlKey) {
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
