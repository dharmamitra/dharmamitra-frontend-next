import React from "react"
import { useQueryState } from "nuqs"

import { defaultView, globalParamsNames } from "@/utils/api/global/params"
import { View } from "@/utils/api/global/types"

import { parseAsView } from "./parsers"

export function useViewParamWithLocalStorage(availableViews: View[]) {
  const [viewParam, setViewParam] = useQueryState(globalParamsNames.local.view, {
    ...parseAsView,
    defaultValue: defaultView,
  })

  React.useEffect(() => {
    const getTargetView = () => {
      if (availableViews.includes(viewParam)) {
        return viewParam
      }
      const localValue = localStorage.getItem(globalParamsNames.local.view) as View | null
      if (localValue && availableViews.includes(localValue)) {
        return localValue
      }
      if (availableViews.length > 0) {
        return availableViews[0] // fallback
      }
      return null // Should never happen
    }

    const targetView = getTargetView()

    if (targetView && targetView !== viewParam) {
      setViewParam(targetView)
    }
  }, [availableViews, viewParam, setViewParam])

  const setViewParamWithLocalStorage = React.useCallback(
    (value: View) => {
      setViewParam(value)
      localStorage.setItem(globalParamsNames.local.view, value)
    },
    [setViewParam],
  )

  return [viewParam, setViewParamWithLocalStorage] as const
}
