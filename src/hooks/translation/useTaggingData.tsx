import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi, TranslationApiTypes } from "@/api"
import useDebouncedValue from "@/hooks/useDebouncedValue"
import { TimedError } from "@/utils/api/translation/endpoints/tagging"
import { allTranslationDefaultParams } from "@/utils/api/translation/params"

import useGlobalParams from "../useGlobalParams"
import useTranslationCommonParams from "./useTranslationCommonParams"
import useTranslationEndpointParams from "./useTranslationEndpointParams"

const {
  input_encoding: defaultInputEncoding,
  mode: defaultMode,
  human_readable_tags: defaultHumanReadable,
} = allTranslationDefaultParams

const useTaggingData = () => {
  const { translationInput } = useTranslationCommonParams()
  const { targetLanguage } = useTranslationEndpointParams()
  const { inputEncoding } = useGlobalParams()

  const debouncedInputSentence = useDebouncedValue(translationInput, 1000)
  const [triggerQuery, setTriggerQuery] = React.useState(false)

  React.useEffect(() => {
    setTriggerQuery(
      Boolean(
        debouncedInputSentence &&
          debouncedInputSentence.length > 5 &&
          targetLanguage === "english",
      ),
    )
  }, [debouncedInputSentence, targetLanguage])

  const requestBody: TranslationApiTypes.TaggingRequestBody = React.useMemo(
    () => ({
      input_sentence: translationInput || "",
      input_encoding: inputEncoding || defaultInputEncoding,
      mode: defaultMode,
      human_readable_tags: defaultHumanReadable,
    }),
    [translationInput, inputEncoding],
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
    if (!triggerQuery || targetLanguage !== "english") {
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
  }, [error, triggerQuery, setIsValidQuery, targetLanguage])

  return {
    isLoading,
    isError,
    data,
    isValidQuery,
  }
}

export default useTaggingData
