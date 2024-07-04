import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi, TranslationApiTypes } from "@/api"
import useDebouncedValue from "@/hooks/useDebouncedValue"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { inputEncodings } from "@/utils/api/global/params"
import { TimedError } from "@/utils/api/translation/endpoints/tagging"
import { translationParamsNames } from "@/utils/api/translation/params"

const useTaggingData = () => {
  const { input: inputSentence } = useInputWithUrlParam<string>(
    translationParamsNames.translation.input_sentence,
  )
  const { input: inputEncoding } = useInputWithUrlParam<
    TranslationApiTypes.Schema["InputEncoding"]
  >(translationParamsNames.translation.input_encoding)

  const { input: targetLang } = useInputWithUrlParam<
    TranslationApiTypes.Schema["TargetLanguage"]
  >(translationParamsNames.translation.target_lang)

  const debouncedInputSentence = useDebouncedValue(inputSentence, 1000)
  const [triggerQuery, setTriggerQuery] = React.useState(false)

  React.useEffect(() => {
    setTriggerQuery(
      Boolean(
        debouncedInputSentence &&
          debouncedInputSentence.length > 5 &&
          targetLang === "english",
      ),
    )
  }, [debouncedInputSentence, targetLang])

  const requestBody: TranslationApiTypes.TaggingRequestBody = React.useMemo(
    () => ({
      input_sentence: inputSentence ?? "",
      input_encoding: inputEncoding ?? inputEncodings[0],
      mode: "unsandhied-lemma-morphosyntax",
      human_readable_tags: true,
    }),
    [inputSentence, inputEncoding],
  )

  const { data, isLoading, isError, error } = useQuery({
    queryKey: DMFetchApi.tagging.makeQueryKey(requestBody),
    queryFn: () => {
      setTriggerQuery(false)
      return DMFetchApi.tagging.call(requestBody)
    },
    enabled: triggerQuery,
    retry: false,
  })

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const [isValidQuery, setIsValidQuery] = React.useState(false)

  React.useEffect(() => {
    if (!triggerQuery || targetLang !== "english") {
      setIsValidQuery(false)
      return
    }

    timeoutRef.current = setTimeout(() => {
      const { queryDuration } = (error as TimedError) ?? {}
      if (
        (error && error instanceof TypeError) ||
        (queryDuration && queryDuration < 500)
      ) {
        setIsValidQuery(false)
      } else {
        setIsValidQuery(true)
      }
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [error, triggerQuery, setIsValidQuery, targetLang])

  return {
    isLoading,
    isError,
    data,
    isValidQuery,
  }
}

export default useTaggingData
