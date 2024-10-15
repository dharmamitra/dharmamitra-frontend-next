import React from "react"
import { useQueryState } from "nuqs"

import { globalParamsNames } from "@/utils/api/global/params"
import {
  getValidViewFromIndex,
  getValidViewIndex,
  ViewIndex,
} from "@/utils/api/global/validators"

import { parseAsView } from "./parsers"

const {
  local: { view },
} = globalParamsNames

export function useViewTabParamWithLocalStorage() {
  const [viewParam, setViewParam] = useQueryState(view, {
    ...parseAsView.withDefault(0),
  })

  React.useEffect(() => {
    // Initialize
    const localValue = localStorage?.getItem(view)
    if (localValue) {
      setViewParam(getValidViewIndex(localValue))
    }
  }, [setViewParam])

  const setViewParamWithLocalStorage = React.useCallback(
    (value: ViewIndex) => {
      setViewParam(value)
      localStorage.setItem(view, getValidViewFromIndex(value))
    },
    [setViewParam],
  )

  return [viewParam, setViewParamWithLocalStorage] as const
}
