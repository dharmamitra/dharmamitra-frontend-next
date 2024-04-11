import React from "react"
import { useAtom } from "jotai"

import { type TranslationRequestProps } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  InputEncoding,
  inputEncodings,
  TargetLanguage,
  targetLanguages,
} from "@/utils/api/params"
import { extractSSEContent } from "@/utils/transformers"

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

  const [eventStream, setEventStream] = React.useState<string[]>([])

  const [isLoading, setIsLoading] = React.useState(
    triggerTranslationQuery && !eventStream.length,
  )

  React.useEffect(() => {
    if (!triggerTranslationQuery) {
      return
    }

    setIsLoading(true)
    setEventStream([])

    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/translation/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        },
      )

      const reader = response.body?.getReader()
      const decoder = new TextDecoder("utf-8")

      setIsLoading(false)

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = (await reader?.read()) ?? {}
        if (done) break
        setEventStream((prev) => [
          ...prev,
          extractSSEContent(decoder.decode(value)),
        ])
      }
    }

    fetchData()
    setTriggerTranslationQuery(false)
  }, [triggerTranslationQuery, params])

  return { eventStream, isLoading }
}

export default useTranslationResults
