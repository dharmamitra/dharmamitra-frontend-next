import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DM_FETCH_API, DMApi } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
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

  const [triggerTranslationQuery] = useAtom(triggerTranslationQueryAtom)

  const {
    data: taggingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: DM_FETCH_API.tagging.makeQueryKey(taggingParams),
    queryFn: () => DM_FETCH_API.tagging.call(taggingParams),
    enabled: triggerTranslationQuery,
  })

  return {
    isLoading,
    isError,
    taggingData,
  }
}

export default useTranslationStream
