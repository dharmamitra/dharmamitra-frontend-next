import React from "react"
import { useSetAtom } from "jotai"

import { abortSearchQueryAtom, triggerSearchQueryAtom } from "@/atoms"
import StartStopStreamButton from "@/components/StartStopStreamButton"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useTranslationStream from "@/hooks/useTranslationStream"
// import { translationParamsNames } from "@/utils/api/translation/params"

export default function SearchStartStopButton() {
  const { input } = useInputWithUrlParam<string>(
    // translationParamsNames.search.search_input,
    "TODO",
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
