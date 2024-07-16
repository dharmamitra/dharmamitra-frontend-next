import React from "react"

import useParams from "@/hooks/useParams"
import { translationParamsNames } from "@/utils/api/translation/params"

const {
  common: { input_sentence },
} = translationParamsNames

const useTranslationCommonParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  const translationInput = getSearchParam(input_sentence) || ""

  const setTranslationInput = React.useCallback(
    (
      input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    ) => {
      const newValue = typeof input === "string" ? input : input.target.value
      updateParams(
        createQueryString({
          paramName: input_sentence,
          value: newValue,
          paramsString: window.location.search,
        }),
      )
    },
    [createQueryString, updateParams],
  )

  return {
    translationInput,
    setTranslationInput,
  }
}

export default useTranslationCommonParams
