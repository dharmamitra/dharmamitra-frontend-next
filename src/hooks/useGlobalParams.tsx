import React from "react"

import useParams from "@/hooks/useParams"
import {
  defaultInputEncoding,
  globalParamsNames,
} from "@/utils/api/global/params"
import { InputEncoding } from "@/utils/api/global/types"

const {
  api: { input_encoding },
} = globalParamsNames

const useGlobalParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  const inputEncoding = getSearchParam(input_encoding) as InputEncoding

  React.useEffect(() => {
    const initialEncodingParam = getSearchParam(input_encoding)
    if (!initialEncodingParam) {
      const value = localStorage.getItem(input_encoding) || defaultInputEncoding
      updateParams(
        createQueryString({
          paramName: input_encoding,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(input_encoding, value ?? "")
    }
  }, [getSearchParam, createQueryString, updateParams])

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
    [createQueryString, updateParams],
  )

  return {
    inputEncoding,
    setInputEncoding,
  }
}

export default useGlobalParams
