import React from "react"
import { useAtom } from "jotai"
import { SSE, SSEvent } from "sse.js"

import { streamUtils, TranslationApiTypes } from "@/api"
import { abortTranslationQueryAtom, triggerTranslationQueryAtom } from "@/atoms"
import useAppConfig from "@/hooks/useAppConfig"
import useGlobalParams from "@/hooks/useGlobalParams"
import { parseStream } from "@/utils/api/stream"
import { allTranslationDefaultParams } from "@/utils/api/translation/params"
import { cleanSSEData } from "@/utils/transformers"

import useTranslationCommonParams from "./useTranslationCommonParams"
import useTranslationEndpointParams from "./useTranslationEndpointParams"

const {
  input_encoding: defaultInputEncoding,
  do_grammar_explanation: grammarExplanationDefault,
  target_lang: defaultTargetLanguage,
  model: defaultTranslationModel,
} = allTranslationDefaultParams

const useTranslationStream = () => {
  const { basePath } = useAppConfig()
  const { translationInput } = useTranslationCommonParams()
  const { translationModel, targetLanguage } = useTranslationEndpointParams()
  const { inputEncoding } = useGlobalParams()

  const requestBody: TranslationApiTypes.RequestBody<"/translation-exp/"> =
    React.useMemo(
      () => ({
        input_sentence: translationInput || "",
        input_encoding: inputEncoding || defaultInputEncoding,
        do_grammar_explanation: grammarExplanationDefault,
        target_lang: targetLanguage || defaultTargetLanguage,
        model: translationModel || defaultTranslationModel,
      }),
      [translationInput, inputEncoding, targetLanguage, translationModel],
    )

  const [triggerTranslationQuery, setTriggerTranslationQuery] = useAtom(
    triggerTranslationQueryAtom,
  )

  const [stream, setStream] = React.useState<string | undefined>("")

  const [isLoading, setIsLoading] = React.useState(false)
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [error, setError] = React.useState<
    { errorCode: 400 | 500 | 504; error: string; data?: SSEvent } | undefined
  >(undefined)

  const [eventSource, setEventSource] = React.useState<SSE | null>(null)
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)

  const [abortTranslationQuery, setAbortTranslationQuery] = useAtom(
    abortTranslationQueryAtom,
  )

  const startStream = React.useCallback(() => {
    // Close any existing connection before starting a new one
    if (eventSource) {
      eventSource.close()
    }

    setStream("")
    setIsLoading(true)
    setIsStreaming(true)
    setError(undefined)

    let responseReceived = false

    timeoutIdRef.current = setTimeout(() => {
      if (!responseReceived) {
        setIsLoading(false)
        setError({ errorCode: 504, error: "timeout" })
        eventSource?.close()
      }
      // 15 seconds
    }, 15000)

    const newEventSource = new SSE(basePath + streamUtils.paths.translation, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      payload: JSON.stringify(requestBody),
    })

    newEventSource.addEventListener("message", (event: MessageEvent) => {
      responseReceived = true

      setIsLoading(false)
      setStream((prev) => prev + cleanSSEData(event.data))
    })

    newEventSource.addEventListener(
      "readystatechange",
      (event: EventSource) => {
        // 2 = CLOSED; https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events
        if (event.readyState >= 2) {
          setIsLoading(false)
          setIsStreaming(false)
        }
      },
    )

    newEventSource.onerror = (err) => {
      responseReceived = true
      clearTimeout(timeoutIdRef.current!)

      setIsLoading(false)

      setError((prev) =>
        prev
          ? { ...prev, data: err }
          : { errorCode: 500, error: "unknown", data: err },
      )
    }

    newEventSource.stream()
    setEventSource(newEventSource)

    return () => {
      clearTimeout(timeoutIdRef.current!)
    }
  }, [basePath, requestBody, eventSource])

  const stopStream = React.useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
      setIsLoading(false)
      setIsStreaming(false)
    }
  }, [eventSource])

  React.useEffect(() => {
    setStream("")
  }, [setStream, requestBody.input_sentence, requestBody.target_lang])

  React.useEffect(() => {
    if (triggerTranslationQuery && requestBody.input_sentence) {
      startStream()
      setTriggerTranslationQuery(false)
    }
  }, [
    triggerTranslationQuery,
    requestBody,
    startStream,
    setTriggerTranslationQuery,
  ])

  React.useEffect(() => {
    if (abortTranslationQuery) {
      setAbortTranslationQuery(false)
      stopStream()
    }
  }, [abortTranslationQuery, stopStream, setAbortTranslationQuery])

  return {
    ...parseStream(stream),
    isLoading,
    isStreaming,
    error,
  }
}

export default useTranslationStream
