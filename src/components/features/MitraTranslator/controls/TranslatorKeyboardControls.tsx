"use client"

import React from "react"

interface TranslatorKeyboardControlsProps {
  input: string
  sendMessage: (message: { text: string }) => void
  stop: () => void
  status: "submitted" | "streaming" | "ready" | "error"
}

export default function TranslatorKeyboardControls({
  input,
  sendMessage,
  stop,
  status,
}: TranslatorKeyboardControlsProps) {
  const handleUserKeyPress = (event: KeyboardEvent) => {
    const { key, ctrlKey } = event

    if (input && key === "Enter" && ctrlKey) {
      sendMessage({ text: input })
    }
    if (status === "submitted" && key === "Escape") {
      stop()
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return <></>
}
