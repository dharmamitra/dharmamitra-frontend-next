import React from "react"

import { globalParams } from "@/api"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"

const { defaultInputEncoding, globalParamsNames } = globalParams

const useGlobalParams = () => {
  const { getSearchParam } = useParams()

  const { input_encoding } = globalParamsNames

  const inputEncoding = getSearchParam(
    input_encoding,
  ) as globalParams.InputEncoding
  const { handleValueChange: updateInputEncoding } =
    useParamValueWithLocalStorage({
      paramName: input_encoding,
      defaultValue: defaultInputEncoding,
    })

  React.useEffect(() => {
    if (!inputEncoding) {
      updateInputEncoding(defaultInputEncoding)
    }
  }, [inputEncoding, updateInputEncoding])

  return {
    inputEncoding,
    updateInputEncoding,
  }
}

export default useGlobalParams
