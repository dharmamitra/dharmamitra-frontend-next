"use client"

import React from "react"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"

export default function LazyKeyboardControls() {
  const { searchInput } = useSearchCommonParams()

  const setTriggerSearchQuery = useSetAtom(triggerSearchQueryAtom)

  const handleUserKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey } = event

      if (key === "Enter" && ctrlKey) {
        if (searchInput && searchInput.length > 0) {
          setTriggerSearchQuery(true)
        }
      }
    },
    [setTriggerSearchQuery, searchInput],
  )

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return <></>
}
