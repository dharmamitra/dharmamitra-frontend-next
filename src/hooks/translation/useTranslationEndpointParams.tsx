import React from "react"
import { SelectChangeEvent } from "@mui/material"

import useAppConfig from "@/hooks/useAppConfig"
import useParams from "@/hooks/useParams"
import { getValidDefaultValue } from "@/utils"
import {
  allTranslationDefaultParams,
  TargetLanguage,
  TranslationModel,
  translationParamsNames,
} from "@/utils/api/translation/params"

const {
  translation: { target_lang, model },
} = translationParamsNames

const { target_lang: defaultTargetLanguage, model: defaultTranslationModel } =
  allTranslationDefaultParams

/**
 * Excludes `do_grammar_explanation` which only uses default value
 *
 */
const useTranslationEndpointParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()
  const { targetLanguages: servedTargetLanguages } =
    useAppConfig().customParamOptions
  const defaultServedLanguage = React.useMemo(
    () => getValidDefaultValue(servedTargetLanguages[0]),
    [servedTargetLanguages],
  )

  const targetLanguage = getSearchParam(target_lang) as TargetLanguage

  React.useEffect(() => {
    const initialEncodingParam = getSearchParam(target_lang)
    if (!initialEncodingParam) {
      const value =
        localStorage.getItem(target_lang) ||
        defaultServedLanguage ||
        defaultTargetLanguage
      updateParams(
        createQueryString({
          paramName: target_lang,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(target_lang, value ?? "")
    }
  }, [defaultServedLanguage, getSearchParam, createQueryString, updateParams])

  const setTargetLanguage = React.useCallback(
    (
      value:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>,
    ) => {
      const newValue = value.target.value
      updateParams(
        createQueryString({
          paramName: target_lang,
          value: newValue,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(target_lang, newValue ?? "")
    },
    [createQueryString, updateParams],
  )

  const translationModel = getSearchParam(model) as TranslationModel

  React.useEffect(() => {
    const initialEncodingParam = getSearchParam(model)
    if (!initialEncodingParam) {
      const value = localStorage.getItem(model) || defaultTranslationModel
      updateParams(
        createQueryString({
          paramName: model,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(model, value ?? "")
    }
  }, [getSearchParam, createQueryString, updateParams])

  const setTranslationModel = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: model,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(model, value ?? "")
    },
    [translationModel, createQueryString, updateParams],
  )

  return {
    targetLanguage,
    setTargetLanguage,
    translationModel,
    setTranslationModel,
  }
}

export default useTranslationEndpointParams
