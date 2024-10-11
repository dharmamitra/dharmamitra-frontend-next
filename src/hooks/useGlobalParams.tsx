import React from "react"

import useParams from "@/hooks/useParams"
import { defaultView, globalParamsNames } from "@/utils/api/global/params"
import { View } from "@/utils/api/global/types"

const {
  local: { view: view_param_name },
} = globalParamsNames

const useGlobalParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  /**
   * View
   */
  const view = getSearchParam(view_param_name) as View

  const setView = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: view_param_name,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(view_param_name, value ?? defaultView)
    },
    [createQueryString, updateParams],
  )

  return {
    view,
    setView,
  }
}

export default useGlobalParams
