import React from "react"
import { parseAsStringLiteral, useQueryState } from "nuqs"

import { globalParamsNames, inputEncodings } from "@/utils/api/global/params"
import { getValidInputEncoding } from "@/utils/api/global/validators"

const {
  api: { input_encoding },
} = globalParamsNames

export function useInputEncodingParamWithLocalStorage() {
  const [inputEncodingParam, setInputEncodingParam] = useQueryState(
    input_encoding,
    {
      ...parseAsStringLiteral(inputEncodings).withDefault(
        getValidInputEncoding(undefined),
      ),
      clearOnDefault: true,
    },
  )

  React.useEffect(() => {
    // Initialize
    const localValue = localStorage?.getItem(input_encoding)
    if (localValue) {
      setInputEncodingParam(getValidInputEncoding(localValue))
    }
  }, [setInputEncodingParam])

  const setInputEncodingParamWithLocalStorage = React.useCallback(
    (value: string) => {
      const updatedValue = getValidInputEncoding(value)
      setInputEncodingParam(updatedValue)
      localStorage.setItem(input_encoding, updatedValue)
    },
    [setInputEncodingParam],
  )
  return [inputEncodingParam, setInputEncodingParamWithLocalStorage] as const
}
