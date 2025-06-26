import React from "react"
import { parseAsStringLiteral, useQueryState } from "nuqs"

import useAppConfig from "@/hooks/useAppConfig"
import { translationParamsNames } from "@/utils/api/translation/params"
import { getValidTargetLanguage } from "@/utils/api/translation/validators"

const {
  translation: { target_lang },
} = translationParamsNames

export function useTargetLangParamWithLocalStorage() {
  const {
    customParamOptions: { targetLanguages: availableLanguages },
  } = useAppConfig()

  const [targetLanguageParam, setTargetLanguageParam] = useQueryState(target_lang, {
    ...parseAsStringLiteral(availableLanguages).withDefault(
      getValidTargetLanguage(undefined, availableLanguages),
    ),
  })

  React.useEffect(() => {
    // Initialize
    const localValue = localStorage?.getItem(target_lang)
    if (localValue) {
      setTargetLanguageParam(getValidTargetLanguage(localValue, availableLanguages))
    }
  }, [setTargetLanguageParam, availableLanguages])

  const setTargetLanguageParamWithLocalStorage = React.useCallback(
    (value: string) => {
      const updatedValue = getValidTargetLanguage(value, availableLanguages)
      setTargetLanguageParam(updatedValue)
      localStorage.setItem(target_lang, updatedValue)
    },
    [setTargetLanguageParam, availableLanguages],
  )
  return [targetLanguageParam, setTargetLanguageParamWithLocalStorage] as const
}
