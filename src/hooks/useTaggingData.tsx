import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DM_FETCH_API, DMApi } from "@/api"
import useDebouncedValue from "@/hooks/useDebouncedValue"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

const useTranslationStream = () => {
  const { input: inputSentence } = useInputWithUrlParam<string>(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncoding } = useInputWithUrlParam<
    DMApi.Schema["InputEncoding"]
  >(apiParamsNames.translation.input_encoding)

  const taggingParams: DMApi.TaggingRequestBody = React.useMemo(
    () => ({
      input_sentence: inputSentence ?? "",
      input_encoding: inputEncoding ?? inputEncodings[0],
      mode: "unsandhied-lemma-morphosyntax",
    }),
    [inputSentence, inputEncoding],
  )

  const [triggerQuery, setTriggerQuery] = React.useState(false)

  React.useEffect(() => {
    setTriggerQuery(Boolean(inputSentence))
  }, [useDebouncedValue(inputSentence, 500)])

  const {
    data: taggingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: DM_FETCH_API.tagging.makeQueryKey(taggingParams),
    queryFn: () => {
      setTriggerQuery(false)
      return DM_FETCH_API.tagging.call(taggingParams)
    },
    enabled: triggerQuery,
  })

  return {
    isLoading,
    isError,
    taggingData,
  }
}

export default useTranslationStream
