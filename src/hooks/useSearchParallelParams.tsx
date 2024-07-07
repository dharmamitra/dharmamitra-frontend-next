import React from "react"

import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  SearchFilterLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"
import { SearchLimits } from "@/utils/api/search/types"
import { getValidDefaultValue } from "@/utils/ui"

const defaultFilterLanguageValue = getValidDefaultValue(
  searchFilterLanguages[0],
)

const useSearchParallelParams = () => {
  const {
    parallel: { filter_source_language, filter_target_language, source_limits },
  } = searchParamsNames

  const { getSearchParam } = useParams()

  const filterSourceLanguage = getSearchParam(
    filter_source_language,
  ) as SearchFilterLanguage
  const { handleValueChange: updateFilterSourceLanguage } =
    useParamValueWithLocalStorage({
      paramName: filter_source_language,
      defaultValue: defaultFilterLanguageValue,
    })

  React.useEffect(() => {
    if (!filterSourceLanguage) {
      updateFilterSourceLanguage(defaultFilterLanguageValue)
    }
  }, [filterSourceLanguage, updateFilterSourceLanguage])

  const filterTargetLanguage = getSearchParam(
    filter_target_language,
  ) as SearchFilterLanguage
  const { handleValueChange: updateFilterTargetLanguage } =
    useParamValueWithLocalStorage({
      paramName: filter_target_language,
      defaultValue: defaultFilterLanguageValue,
    })

  React.useEffect(() => {
    if (!filterTargetLanguage) {
      updateFilterTargetLanguage(defaultFilterLanguageValue)
    }
  }, [filterTargetLanguage, updateFilterTargetLanguage])

  const sourceLimits = getSearchParam(source_limits) as SearchLimits
  const { handleValueChange: updateSourceLimits } =
    useParamValueWithLocalStorage({
      paramName: source_limits,
      defaultValue: "",
    })

  return {
    filterSourceLanguage,
    updateFilterSourceLanguage,
    filterTargetLanguage,
    updateFilterTargetLanguage,
    sourceLimits,
    updateSourceLimits,
  }
}

export default useSearchParallelParams
