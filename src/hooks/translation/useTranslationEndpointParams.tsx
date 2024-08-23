import React from "react"
import { SelectChangeEvent } from "@mui/material"

import useAppConfig from "@/hooks/useAppConfig"
import useParams from "@/hooks/useParams"
import {
  allTranslationDefaultParams,
  TargetLanguage,
  translationParamsNames,
} from "@/utils/api/translation/params"
import { getValidDefaultValue } from "@/utils/validators"

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

  /**
   * Target language
   */

  const targetLanguage = getSearchParam(target_lang) as TargetLanguage

  const setTargetLanguage = React.useCallback(
    (
      value:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
        | string,
    ) => {
      const newValue = typeof value === "string" ? value : value.target.value
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

  /**
   * Translation model
   */

  const translationModel = getSearchParam(model)

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
    [createQueryString, updateParams],
  )

  /**
   * Param initialization
   */

  React.useEffect(() => {
    const initialTargetLanggParam = getSearchParam(target_lang)
    if (!initialTargetLanggParam) {
      const value =
        localStorage.getItem(target_lang) ||
        defaultServedLanguage ||
        defaultTargetLanguage
      setTargetLanguage(value)
    }

    const initialModelParam = getSearchParam(model)
    if (!initialModelParam) {
      const value = localStorage.getItem(model) || defaultTranslationModel
      setTranslationModel(value)
    }
  }, [
    defaultServedLanguage,
    getSearchParam,
    setTargetLanguage,
    setTranslationModel,
  ])

  return {
    targetLanguage,
    setTargetLanguage,
    translationModel,
    setTranslationModel,
  }
}

export default useTranslationEndpointParams
