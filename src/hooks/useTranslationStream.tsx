import React from "react"
import { useAtom } from "jotai"
import { SSE, SSEvent } from "sse.js"

import { type TranslationRequestProps } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import appConfig from "@/config"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  InputEncoding,
  inputEncodings,
  TargetLanguage,
  targetLanguages,
} from "@/utils/api/params"
import { cleanSSEData } from "@/utils/transformers"

const translationEndpoint = `${appConfig.apiUrl}/translation/`

const useTranslationStream = () => {
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

  const [triggerTranslationQuery, setTriggerTranslationQuery] = useAtom(
    triggerTranslationQueryAtom,
  )

  const [translationStream, setTranslationStream] = React.useState<
    string | undefined
  >("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState<
    { errorCode: 400 | 500 | 504; error: string; data?: SSEvent } | undefined
  >(undefined)

  React.useEffect(() => {
    setTranslationStream("")
  }, [inputSentence])

  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (!triggerTranslationQuery || !params.input_sentence) {
      return
    }
    setTriggerTranslationQuery(false)
    setTranslationStream("")
    setIsLoading(true)
    setIsError(undefined)

    let responseReceived = false

    timeoutIdRef.current = setTimeout(() => {
      if (!responseReceived) {
        setIsLoading(false)
        setIsError({ errorCode: 504, error: "timeout" })
        eventSource.close()
      }
      // 7 seconds
    }, 7000)

    const eventSource = new SSE(translationEndpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      payload: JSON.stringify(params),
    })

    // https://developer.mozilla.org/en-US/docs/Web/API/EventSource
    eventSource.addEventListener("message", (event: MessageEvent) => {
      responseReceived = true

      if (event.data === "[DONE]") {
        // TODO: confirm this runs
        eventSource.close()
      }

      setIsLoading(false)
      setTranslationStream((prev) => prev + cleanSSEData(event.data))
    })

    eventSource.addEventListener("readystatechange", (event: EventSource) => {
      if (event.readyState >= 2) {
        setIsLoading(false)
      }
    })

    eventSource.onerror = (err) => {
      // An error response was received from the server.
      responseReceived = true
      clearTimeout(timeoutIdRef.current!)

      setIsLoading(false)

      setIsError((prev) =>
        prev
          ? { ...prev, data: err }
          : { errorCode: 500, error: "unknown", data: err },
      )
    }

    eventSource.stream()

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutIdRef.current && responseReceived) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [triggerTranslationQuery, setTriggerTranslationQuery, params])

  return { translationStream, isLoading, isError }
}

export default useTranslationStream
