import React from "react"
import { parseAsInteger, useQueryState } from "nuqs"

import { globalParamsNames } from "@/utils/api/global/params"
// import {
// getValidViewFromIndex,
// getValidViewIndex,
// ViewIndex,
// } from "@/utils/api/global/validators"

// import { parseAsView } from "./parsers"

const {
  local: { view },
} = globalParamsNames

export function useViewTabParamWithLocalStorage() {
  const [viewParam, setViewParam] = useQueryState(view, {
    ...parseAsInteger.withDefault(0),
  })

  React.useEffect(() => {
    // Initialize
    const localValue = localStorage?.getItem(view)
    if (localValue) {
      setViewParam(parseInt(localValue))
    }
  }, [setViewParam])

  const setViewParamWithLocalStorage = React.useCallback(
    (value: number) => {
      setViewParam(value)
      localStorage.setItem(view, value.toString())
    },
    [setViewParam],
  )

  return [viewParam, setViewParamWithLocalStorage] as const
}
