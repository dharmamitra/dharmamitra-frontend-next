import React from "react"

import useParams from "@/hooks/useParams"
import { translationParamsNames } from "@/utils/api/translation/params"

const {
  common: { input_sentence },
} = translationParamsNames

const useTranslationCommonParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  const [translationInputtValue, setTranslationInputValue] = React.useState(
    getSearchParam(input_sentence) || "",
  )

  React.useEffect(() => {
    setTranslationInputValue(getSearchParam(input_sentence) || "")
  }, [getSearchParam, input_sentence])

  const setTranslationInput = React.useCallback(
    (
      input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    ) => {
      const newValue = typeof input === "string" ? input : input.target.value

      setTranslationInputValue(newValue)
      updateParams(
        createQueryString({
          paramName: input_sentence,
          value: newValue,
          paramsString: window.location.search,
        }),
      )
    },
    [createQueryString, updateParams, setTranslationInputValue],
  )

  return {
    translationInput: translationInputtValue,
    setTranslationInput,
  }
}

export default useTranslationCommonParams
