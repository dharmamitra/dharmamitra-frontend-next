"use client"

import React from "react"
import { ChatStatus } from "ai"

interface TranslatorKeyboardControlsProps {
  input: string
  sendMessage: (message: { text: string }) => void
  stop: () => void
  status: ChatStatus
}

export default function TranslatorKeyboardControls({
  input,
  sendMessage,
  stop,
  status,
}: TranslatorKeyboardControlsProps) {
  React.useEffect(() => {
    const handleUserKeyPress = (event: KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (input && key === "Enter" && ctrlKey) {
        sendMessage({ text: input })
      }
      if (status === "submitted" && key === "Escape") {
        stop()
      }
    }

    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  }, [input, sendMessage, stop, status])

  return <></>
}
