import React from "react"

import useParams from "@/hooks/useParams"
import {
  defaultInputEncoding,
  defaultView,
  globalParamsNames,
} from "@/utils/api/global/params"
import { InputEncoding, View } from "@/utils/api/global/types"

const {
  api: { input_encoding },
  local: { view: view_param_name },
} = globalParamsNames

const useGlobalParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  /**
   * Input Encoding
   */
  const inputEncoding = getSearchParam(input_encoding) as InputEncoding

  const setInputEncoding = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: input_encoding,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(input_encoding, value ?? defaultInputEncoding)
    },
    [createQueryString, updateParams],
  )

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

  /**
   * Param initialization
   */
  React.useEffect(() => {
    const initialViewParam = getSearchParam(view_param_name)
    const initialEncodingParam = getSearchParam(input_encoding)

    if (!initialEncodingParam) {
      const value = localStorage.getItem(input_encoding) || defaultInputEncoding
      setInputEncoding(value)
    }

    if (!initialViewParam) {
      const value = localStorage.getItem(view_param_name) || defaultView
      setView(value)
    }
  }, [getSearchParam, setInputEncoding, setView])

  return {
    inputEncoding,
    setInputEncoding,
    view,
    setView,
  }
}

export default useGlobalParams
