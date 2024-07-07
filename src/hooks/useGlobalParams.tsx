import React from "react"

import { globalParams } from "@/api"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import { getValidDefaultValue } from "@/utils/ui"

const { inputEncodings, globalParamsNames } = globalParams
const defaultInputEncoding = getValidDefaultValue(inputEncodings[0])

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
