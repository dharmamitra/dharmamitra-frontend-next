import React from "react"
import { useSetAtom } from "jotai"

import { abortSearchQueryAtom, triggerSearchQueryAtom } from "@/atoms"
import StartStopStreamButton from "@/components/StartStopStreamButton"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useTranslationStream from "@/hooks/useTranslationStream"
import { apiParamsNames } from "@/utils/api/params"

export default function SearchStartStopButton() {
  const { input } = useInputWithUrlParam<string>(
    apiParamsNames.search.search_input,
  )

  const setTriggerTranslationQuery = useSetAtom(triggerSearchQueryAtom)
  const setAbortTranslationQuery = useSetAtom(abortSearchQueryAtom)

  return (
    <StartStopStreamButton
      input={input}
      isStreaming={useTranslationStream().isStreaming}
      onStart={() => setTriggerTranslationQuery(true)}
      onStop={() => setAbortTranslationQuery(true)}
    />
  )
}
