import React from "react"
import { useSetAtom } from "jotai"

import { abortTranslationQueryAtom, triggerTranslationQueryAtom } from "@/atoms"
import StartStopStreamButton from "@/components/StartStopStreamButton"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useTranslationStream from "@/hooks/useTranslationStream"
import { translationParamsNames } from "@/utils/api/translation/params"

export default function TranslationStartStopButton() {
  const { input } = useInputWithUrlParam<string>(
    translationParamsNames.translation.input_sentence,
  )

  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)
  const setAbortTranslationQuery = useSetAtom(abortTranslationQueryAtom)

  return (
    <StartStopStreamButton
      input={input}
      isStreaming={useTranslationStream().isStreaming}
      onStart={() => setTriggerTranslationQuery(true)}
      onStop={() => setAbortTranslationQuery(true)}
    />
  )
}
