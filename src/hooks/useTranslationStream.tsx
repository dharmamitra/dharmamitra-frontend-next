import React from "react"
import { useAtom } from "jotai"
import { SSE, SSEvent } from "sse.js"

import { DMApiTypes, streamUtils } from "@/api"
import { abortTranslationQueryAtom, triggerTranslationQueryAtom } from "@/atoms"
import useAppConfig from "@/hooks/useAppConfig"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  inputEncodings,
  translationModels,
} from "@/utils/api/params"
import { cleanSSEData } from "@/utils/transformers"

const useTranslationStream = () => {
  const { basePath, paramOptions } = useAppConfig()

  const { input: inputSentenceParam } = useInputWithUrlParam<string>(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncodingParam } = useInputWithUrlParam<
    DMApiTypes.Schema["InputEncoding"]
  >(apiParamsNames.translation.input_encoding)
  const { input: targetLangParam } = useInputWithUrlParam<
    DMApiTypes.Schema["TargetLanguage"]
  >(apiParamsNames.translation.target_lang)
  const { input: modelParam } = useInputWithUrlParam<
    DMApiTypes.Schema["TranslationModel"]
  >(apiParamsNames.translation.model)
  const { input: grammarParam } = useInputWithUrlParam<"false" | "true">(
    apiParamsNames.translation.do_grammar_explanation,
  )

  const params: DMApiTypes.TranslationRequestBody = React.useMemo(
    () => ({
      input_sentence: inputSentenceParam ?? "",
      input_encoding: inputEncodingParam ?? inputEncodings[0],
      do_grammar_explanation: grammarParam === "true",
      target_lang:
        targetLangParam ??
        (paramOptions
          .targetLanguages[0] as DMApiTypes.Schema["TargetLanguage"]),
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

    setTranslationStream("")
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
      payload: JSON.stringify(params),
    })

    newEventSource.addEventListener("message", (event: MessageEvent) => {
      responseReceived = true

      setIsLoading(false)
      setTranslationStream((prev) => prev + cleanSSEData(event.data))
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
  }, [basePath, params, eventSource])

  const stopStream = React.useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
      setIsLoading(false)
      setIsStreaming(false)
    }
  }, [eventSource])

  React.useEffect(() => {
    setTranslationStream("")
  }, [setTranslationStream, params.input_sentence, params.target_lang])

  React.useEffect(() => {
    if (triggerTranslationQuery && params.input_sentence) {
      startStream()
      setTriggerTranslationQuery(false)
    }
  }, [triggerTranslationQuery, params, startStream, setTriggerTranslationQuery])

  React.useEffect(() => {
    if (abortTranslationQuery) {
      setAbortTranslationQuery(false)
      stopStream()
    }
  }, [abortTranslationQuery, stopStream, setAbortTranslationQuery])

  return {
    translationStream,
    isLoading,
    isStreaming,
    error,
  }
}

export default useTranslationStream
