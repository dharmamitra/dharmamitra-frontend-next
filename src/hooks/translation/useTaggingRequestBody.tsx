import React from "react"

import { createTaggingRequestBody } from "@/features/MitraTranslator/utils"
import {
  useInputEncodingParamWithLocalStorage,
  useInputSentenceParam,
} from "@/hooks/params"
import useDebouncedValue from "@/hooks/useDebouncedValue"

export default function useTaggingRequestBody() {
  const [inputSentenceParam] = useInputSentenceParam()
  const [inputEncodingParam] = useInputEncodingParamWithLocalStorage()

  const debouncedInputSentence = useDebouncedValue(inputSentenceParam, 1000)

  return React.useMemo(
    () =>
      createTaggingRequestBody({
        input_sentence: debouncedInputSentence,
        input_encoding: inputEncodingParam,
      }),
    [debouncedInputSentence, inputEncodingParam],
  )
}
