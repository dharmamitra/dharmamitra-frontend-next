import React from "react"
import { useQuery } from "@tanstack/react-query"

import { type DMApi, DMFetchApi } from "@/api"
import useDebouncedValue from "@/hooks/useDebouncedValue"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

const useTaggingData = () => {
  const { input: inputSentence } = useInputWithUrlParam<string>(
    apiParamsNames.translation.input_sentence,
  )
  const { input: inputEncoding } = useInputWithUrlParam<
    DMApi.Schema["InputEncoding"]
  >(apiParamsNames.translation.input_encoding)

  const requestBody: DMApi.TaggingRequestBody = React.useMemo(
    () => ({
      input_sentence: inputSentence ?? "",
      input_encoding: inputEncoding ?? inputEncodings[0],
      mode: "unsandhied-lemma-morphosyntax",
      human_readable_tags: true,
    }),
    [inputSentence, inputEncoding],
  )

  const [triggerQuery, setTriggerQuery] = React.useState(false)

  const debouncedInputSentence = useDebouncedValue(inputSentence, 500)

  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)
  const [isTaggingCheckElapsed, setIsTaggingCheckElapsed] =
    React.useState(false)

  React.useEffect(() => {
    setTriggerQuery(Boolean(debouncedInputSentence))
    setIsTaggingCheckElapsed(false)

    timeoutIdRef.current = setTimeout(() => {
      setIsTaggingCheckElapsed(true)
    }, 1000)
  }, [debouncedInputSentence])

  const {
    data: taggingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: DMFetchApi.tagging.makeQueryKey(requestBody),
    queryFn: () => {
      setTriggerQuery(false)
      return DMFetchApi.tagging.call(requestBody)
    },
    enabled: triggerQuery,
  })

  const hasTaggingData = React.useMemo(() => {
    return (
      Boolean(taggingData && taggingData.length > 0) ||
      Boolean(isLoading && isTaggingCheckElapsed)
    )
  }, [taggingData, isTaggingCheckElapsed, isLoading])

  return {
    isLoading,
    isError,
    taggingData,
    hasTaggingData,
  }
}

export default useTaggingData
