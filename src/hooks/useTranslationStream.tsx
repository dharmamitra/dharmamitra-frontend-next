import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { SSE, SSEvent } from "sse.js"

import { DM_FETCH_API, DMApi } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import useAppConfig from "@/hooks/useAppConfig"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"
import { cleanSSEData } from "@/utils/transformers"

const useTranslationStream = () => {
  const { basePath, streamPaths, paramOptions } = useAppConfig()

  const { input: inputSentence } = useInputWithUrlParam(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncoding } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )
  const { input: targetLang } = useInputWithUrlParam(
    apiParamsNames.translation.target_lang,
  )
  const { input: model } = useInputWithUrlParam(
    apiParamsNames.translation.model,
  )
  const { input: doGrammarExplanation } = useInputWithUrlParam(
    apiParamsNames.translation.do_grammar_explanation,
  )

  // TODO: Add typing to useInputWithUrlParam and remove casting
  const inputEncodingParam = (
    inputEncoding ? inputEncoding : inputEncodings[0]
  ) as DMApi.Schema["InputEncoding"]
  const targetLangParam = (
    targetLang ? targetLang : paramOptions.targetLanguages[0]
  ) as DMApi.Schema["TargetLanguage"]
  const modelParam = (
    model ? model : paramOptions.model
  ) as DMApi.Schema["TranslationModel"]
  const grammarParam = doGrammarExplanation === "on"

  const params: DMApi.TranslationRequestBody = React.useMemo(
    () => ({
      input_sentence: inputSentence,
      input_encoding: inputEncodingParam,
      do_grammar_explanation: grammarParam,
      target_lang: targetLangParam,
      model: modelParam,
    }),
    [
      inputSentence,
      inputEncodingParam,
      targetLangParam,
      modelParam,
      grammarParam,
    ],
  )

  const [triggerTranslationQuery, setTriggerTranslationQuery] = useAtom(
    triggerTranslationQueryAtom,
  )

  // eslint-disable-next-line no-unused-vars
  const { target_lang, do_grammar_explanation, ...taggingParams } = params
  const { data: taggingData } = useQuery({
    queryKey: DM_FETCH_API.tagging.makeQueryKey({
      mode: "lemma",
      ...taggingParams,
    }),
    queryFn: () =>
      DM_FETCH_API.tagging.call({
        mode: "lemma",
        ...taggingParams,
        input_encoding: "auto",
      }),
    enabled: !!params.input_sentence,
  })

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
    taggingData,
  }
}

export default useTranslationStream
