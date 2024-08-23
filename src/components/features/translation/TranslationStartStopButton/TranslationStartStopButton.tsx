import React from "react"
import { useSetAtom } from "jotai"

import { abortTranslationQueryAtom, triggerTranslationQueryAtom } from "@/atoms"
import StartStopStreamButton from "@/components/StartStopStreamButton"
import useTranslationCommonParams from "@/hooks/translation/useTranslationCommonParams"
import useTranslationStream from "@/hooks/translation/useTranslationStream"

export default function TranslationStartStopButton() {
  const { translationInput } = useTranslationCommonParams()

  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)
  const setAbortTranslationQuery = useSetAtom(abortTranslationQueryAtom)

  return (
    <StartStopStreamButton
      input={translationInput}
      isStreaming={useTranslationStream().isStreaming}
      onStart={() => setTriggerTranslationQuery(true)}
      onStop={() => setAbortTranslationQuery(true)}
    />
  )
}
