"use client"

import React from "react"
import { useSetAtom } from "jotai"

import { abortTranslationQueryAtom, triggerTranslationQueryAtom } from "@/atoms"

export default function LazyKeyboardControls() {
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)
  const setAbortTranslationQuery = useSetAtom(abortTranslationQueryAtom)

  const handleUserKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (key === "Enter" && ctrlKey) {
        setTriggerTranslationQuery(true)
      }
      if (key === "Escape") {
        setAbortTranslationQuery(true)
      }
    },
    [setTriggerTranslationQuery, setAbortTranslationQuery],
  )

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return <></>
}
