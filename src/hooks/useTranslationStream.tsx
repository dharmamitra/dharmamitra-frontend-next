import React from "react"
import { useAtom } from "jotai"
import { SSE, SSEvent } from "sse.js"

import { DMApi } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import useAppConfig from "@/hooks/useAppConfig"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  inputEncodings,
  translationModels,
} from "@/utils/api/params"
import { cleanSSEData } from "@/utils/transformers"

const useTranslationStream = () => {
  const { basePath, streamPaths, paramOptions } = useAppConfig()

  const { input: inputSentenceParam } = useInputWithUrlParam<string>(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncodingParam } = useInputWithUrlParam<
    DMApi.Schema["InputEncoding"]
  >(apiParamsNames.translation.input_encoding)
  const { input: targetLangParam } = useInputWithUrlParam<
    DMApi.Schema["TargetLanguage"]
  >(apiParamsNames.translation.target_lang)
  const { input: modelParam } = useInputWithUrlParam<
    DMApi.Schema["TranslationModel"]
  >(apiParamsNames.translation.model)
  const { input: grammarParam } = useInputWithUrlParam<"false" | "true">(
    apiParamsNames.translation.do_grammar_explanation,
  )

  const params: DMApi.TranslationRequestBody = React.useMemo(
    () => ({
      input_sentence: inputSentenceParam ?? "",
      input_encoding: inputEncodingParam ?? inputEncodings[0],
      do_grammar_explanation: grammarParam === "true",
      target_lang:
        targetLangParam ??
        (paramOptions.targetLanguages[0] as DMApi.Schema["TargetLanguage"]),
      model: modelParam ?? translationModels[0],
    }),
    [
      inputSentenceParam,
      inputEncodingParam,
      targetLangParam,
      paramOptions,
      modelParam,
      grammarParam,
    ],
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
  }, [inputSentenceParam])

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
      // 10 seconds
    }, 10000)

    const eventSource = new SSE(basePath + streamPaths.translation, {
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
  }, [
    triggerTranslationQuery,
    setTriggerTranslationQuery,
    params,
    streamPaths.translation,
    basePath,
  ])

  return {
    translationStream,
    isLoading,
    isError,
  }
}

export default useTranslationStream
