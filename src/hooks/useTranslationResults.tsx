import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DM_API, type TranslationRequestProps } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  InputEncoding,
  inputEncodings,
  TargetLanguage,
  targetLanguages,
} from "@/utils/api/params"

const useTranslationResults = () => {
  const { input: inputSentence } = useInputWithUrlParam(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncoding } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )
  const { input: targetLang } = useInputWithUrlParam(
    apiParamsNames.translation.target_lang,
  )

  // TODO: Add typing to useInputWithUrlParam and remove casting
  const inputEncodingParam = (
    inputEncoding ? inputEncoding : inputEncodings[0]
  ) as InputEncoding
  const targetLangParam = (
    targetLang ? targetLang : targetLanguages[0]
  ) as TargetLanguage

  const [triggerTranslationQuery, setTriggerTranslationQuery] = useAtom(
    triggerTranslationQueryAtom,
  )

  const params: TranslationRequestProps = React.useMemo(
    () => ({
      input_sentence: inputSentence,
      input_encoding: inputEncodingParam,
      level_of_explanation: 0,
      target_lang: targetLangParam,
      model: "NO",
    }),
    [inputSentence, inputEncodingParam, targetLangParam],
  )

  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.translation.makeQueryKey(params),
    queryFn: () => DM_API.translation.call(params),
    enabled: triggerTranslationQuery,
  })

  if (!isLoading) {
    setTriggerTranslationQuery(false)
  }

  return { data, isLoading, isError }
}

export default useTranslationResults
