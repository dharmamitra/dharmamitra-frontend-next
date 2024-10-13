import React from "react"
import { createParser, parseAsStringLiteral, useQueryState } from "nuqs"

import { useTranslationModelsData } from "@/hooks/translation/useTranslationModelsData"
import useAppConfig from "@/hooks/useAppConfig"
import { globalParamsNames, inputEncodings } from "@/utils/api/global/params"
import {
  defaultTranslationModel,
  translationParamsNames,
} from "@/utils/api/translation/params"
import { getValidTargetLanguage } from "@/utils/api/translation/validators"
import { getValidInputEncoding } from "@/utils/validators"

const {
  api: { input_encoding },
  // local: { view },
} = globalParamsNames

const {
  common: { input_sentence },
  translation: { target_lang, model },
  // tagging: { mode, human_readable_tags },
} = translationParamsNames

const parseAsMultiLineString = createParser({
  parse(queryValue) {
    return queryValue.replace(/\\n/g, "\n")
  },
  serialize(value) {
    return value.replace(/\n/g, "\\n")
  },
})

/**
 * GLOBAL PARAMS (used in both search and translation)
 *
 */

// input_encoding
export function useInputEncodingParam() {
  const [inputEncodingParam, setInputEncodingParam] = useQueryState(
    input_encoding,
    {
      ...parseAsStringLiteral(inputEncodings).withDefault(
        getValidInputEncoding(undefined),
      ),
      clearOnDefault: true,
    },
  )

  React.useEffect(() => {
    const localValue = localStorage?.getItem(input_encoding)
    if (localValue) {
      setInputEncodingParam(getValidInputEncoding(localValue))
    }
  }, [setInputEncodingParam])

  const setInputEncodingParamWithLocalStorage = React.useCallback(
    (value: string) => {
      const updatedValue = getValidInputEncoding(value)
      setInputEncodingParam(updatedValue)
      localStorage.setItem(input_encoding, updatedValue)
    },
    [setInputEncodingParam],
  )
  return [inputEncodingParam, setInputEncodingParamWithLocalStorage] as const
}

/**
 * TRANSLATOR PARAMS
 *
 */

// input_sentence
export function useInputSentenceParam() {
  return useQueryState(input_sentence, {
    ...parseAsMultiLineString.withDefault(""),
    clearOnDefault: true,
  })
}

// target_lang
export function useTargetLangParam() {
  const {
    customParamOptions: { targetLanguages: availableLanguages },
  } = useAppConfig()

  const [targetLanguageParam, setTargetLanguageParam] = useQueryState(
    target_lang,
    {
      ...parseAsStringLiteral(availableLanguages).withDefault(
        getValidTargetLanguage(undefined, availableLanguages),
      ),
      clearOnDefault: true,
    },
  )

  React.useEffect(() => {
    const localValue = localStorage?.getItem(target_lang)
    if (localValue) {
      setTargetLanguageParam(
        getValidTargetLanguage(localValue, availableLanguages),
      )
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

// model
export function useTranslationModelParam() {
  const { models } = useTranslationModelsData()
  return useQueryState(model, {
    ...parseAsStringLiteral(models).withDefault(defaultTranslationModel),
    clearOnDefault: true,
  })
}
