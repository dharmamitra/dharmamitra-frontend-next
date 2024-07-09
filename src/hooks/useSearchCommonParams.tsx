import React from "react"

import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  defaultSearchTarget,
  defaultSearchType,
  searchParamsNames,
  SearchTarget,
  SearchType,
} from "@/utils/api/search/params"

const {
  target,
  common: { search_input, search_type },
} = searchParamsNames

const useSearchCommonParams = () => {
  const { getSearchParam } = useParams()

  const searchTarget = getSearchParam(target) as SearchTarget
  const { handleValueChange: updateSearchTarget } =
    useParamValueWithLocalStorage({
      paramName: target,
      defaultValue: defaultSearchTarget,
    })

  React.useEffect(() => {
    if (!searchTarget) {
      updateSearchTarget(defaultSearchTarget)
    }
  }, [searchTarget, updateSearchTarget])

  const { input: searchInput, handleValueChange: updateSearchInput } =
    useInputWithUrlParam<string>(search_input)

  const searchType = getSearchParam(search_type) as SearchType
  const { handleValueChange: updateSearchType } = useParamValueWithLocalStorage(
    {
      paramName: search_type,
      defaultValue: defaultSearchType,
    },
  )

  React.useEffect(() => {
    if (!searchType) {
      updateSearchType(defaultSearchType)
    }
  }, [searchType, updateSearchType])

  return {
    searchTarget: searchTarget ?? defaultSearchTarget,
    updateSearchTarget,
    searchInput,
    updateSearchInput,
    searchType,
    updateSearchType,
  }
}

export default useSearchCommonParams
