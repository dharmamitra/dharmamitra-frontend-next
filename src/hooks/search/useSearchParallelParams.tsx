import React from "react"

import useParams from "@/hooks/useParams"
import {
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  parallel: { filter_source_language, filter_target_language, source_limits },
} = searchParamsNames

const useSearchParallelParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  const filterSourceLanguage = (getSearchParam(filter_source_language) ??
    localStorage.getItem(filter_source_language)) as SearchFilterLanguage

  const setFilterSourceLanguage = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: filter_source_language,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(filter_source_language, value ?? "")
    },
    [createQueryString, updateParams],
  )

  const filterTargetLanguage = (getSearchParam(filter_target_language) ??
    localStorage.getItem(filter_target_language)) as SearchFilterLanguage

  const setFilterTargetLanguage = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: filter_target_language,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(filter_target_language, value ?? "")
    },
    [createQueryString, updateParams],
  )

  const sourceLimits = getSearchParam(source_limits)
  // update handler defined in `LimitFilters.tsx` and sets both `source_limits` and `limits` params

  return {
    filterSourceLanguage,
    setFilterSourceLanguage,
    filterTargetLanguage,
    setFilterTargetLanguage,
    sourceLimits,
  }
}

export default useSearchParallelParams
