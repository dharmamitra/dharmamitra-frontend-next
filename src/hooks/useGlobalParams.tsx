import React from "react"

import { globalParams } from "@/api"
import useParams from "@/hooks/useParams"

const { defaultInputEncoding, globalParamsNames } = globalParams

const useGlobalParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  const { input_encoding } = globalParamsNames

  const inputEncoding = (getSearchParam(input_encoding) ??
    localStorage.getItem(input_encoding) ??
    defaultInputEncoding) as globalParams.InputEncoding

  const setInputEncoding = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: input_encoding,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(input_encoding, value ?? "")
    },
    [input_encoding, createQueryString, updateParams],
  )

  return {
    inputEncoding,
    setInputEncoding,
  }
}

export default useGlobalParams
