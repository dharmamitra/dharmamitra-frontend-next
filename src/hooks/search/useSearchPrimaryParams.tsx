import React from "react"

import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useParams from "@/hooks/useParams"
import {
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  primary: { filter_language, limits: limitsParamName },
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
    [filter_language, createQueryString, updateParams],
  )

  const { input: limits, handleValueChange: updateLimits } =
    useInputWithUrlParam<string | null>(limitsParamName)

  return {
    filterLanguage,
    setFilterLanguage,
    limits,
    updateLimits,
  }
}

export default useSearchPrimaryParams
