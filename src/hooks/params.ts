import React from "react"
import { parseAsStringLiteral, useQueryState } from "nuqs"

import { globalParamsNames, inputEncodings } from "@/utils/api/global/params"
import { getValidInputEncoding } from "@/utils/validators"

const {
  api: { input_encoding },
} = globalParamsNames

export function useInputEncoding() {
  const [inputEncodingParam, setInputEncodingParam] = useQueryState(
    input_encoding,
    parseAsStringLiteral(inputEncodings).withDefault(
      getValidInputEncoding(undefined),
    ),
  )

  React.useEffect(() => {
    const localValue = localStorage?.getItem(input_encoding)
    if (localValue) {
      setInputEncodingParam(getValidInputEncoding(localValue))
    }
  }, [setInputEncodingParam])

  const setInputEncoding = React.useCallback(
    (value: string) => {
      const updatedValue = getValidInputEncoding(value)
      setInputEncodingParam(updatedValue)
      localStorage.setItem(input_encoding, updatedValue)
    },
    [setInputEncodingParam],
  )
  return [inputEncodingParam, setInputEncoding] as const
}
