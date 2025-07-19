import React from "react"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { useLocale } from "next-intl"

import useAppConfig from "@/hooks/useAppConfig"
import { translationParamsNames, getDefaultTargetLanguageForLocale } from "@/utils/api/translation/params"
import { getValidTargetLanguage } from "@/utils/api/translation/validators"

const {
  translation: { target_lang },
} = translationParamsNames

export function useTargetLangParamWithLocalStorage() {
  const locale = useLocale()
  const {
    customParamOptions: { targetLanguages: availableLanguages },
  } = useAppConfig()

  // Get locale-based default target language
  const localeBasedDefault = getDefaultTargetLanguageForLocale(locale)
  const validLocaleBasedDefault = getValidTargetLanguage(localeBasedDefault, availableLanguages)

  const [targetLanguageParam, setTargetLanguageParam] = useQueryState(target_lang, {
    ...parseAsStringLiteral(availableLanguages).withDefault(validLocaleBasedDefault),
  })

  React.useEffect(() => {
    // Initialize
    const localValue = localStorage?.getItem(target_lang)
    if (localValue) {
      setTargetLanguageParam(getValidTargetLanguage(localValue, availableLanguages))
    } else {
      // If no local storage value, set the locale-based default
      setTargetLanguageParam(validLocaleBasedDefault)
    }
  }, [setTargetLanguageParam, availableLanguages, validLocaleBasedDefault])

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
