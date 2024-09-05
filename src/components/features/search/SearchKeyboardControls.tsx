"use client"

import React from "react"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"

import { searchInputId } from "./SearchInput/SearchInput"

export default function SearchKeyboardControls() {
  const { searchInput } = useSearchCommonParams()

  const setTriggerSearchQuery = useSetAtom(triggerSearchQueryAtom)

  const handleUserKeyPress = React.useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey, shiftKey } = event

      if (key === "Enter" && !ctrlKey && !shiftKey) {
        event.preventDefault()
        const input = document.getElementById(searchInputId) as HTMLInputElement
        if (input === document.activeElement) {
          setTriggerSearchQuery(Boolean(searchInput))
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
