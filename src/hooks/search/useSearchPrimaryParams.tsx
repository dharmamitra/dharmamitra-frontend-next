import React from "react"

import useParams from "@/hooks/useParams"
import {
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  primary: { filter_language, limits: limits_param_name },
} = searchParamsNames

const useSearchPrimaryParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  const filterLanguage = (getSearchParam(filter_language) ??
    localStorage.getItem(filter_language)) as SearchFilterLanguage

  const setFilterLanguage = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: filter_language,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(filter_language, value ?? "")
    },
    [createQueryString, updateParams],
  )

  const limits = getSearchParam(limits_param_name)
  // update handler defined in `LimitFilters.tsx` and sets both `source_limits` and `limits` params

  return {
    filterLanguage,
    setFilterLanguage,
    limits,
  }
}

export default useSearchPrimaryParams
