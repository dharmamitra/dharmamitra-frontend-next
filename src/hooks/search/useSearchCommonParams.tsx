import React from "react"

import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  defaultSearchType,
  searchParamsNames,
  SearchType,
} from "@/utils/api/search/params"

import {
  defaultSearchTarget,
  SearchTarget,
  localParamNames,
} from "@/utils/api/search/local"

const {
  common: { search_input, search_type },
} = searchParamsNames

const { search_target } = localParamNames

const useSearchCommonParams = () => {
  const { getSearchParam } = useParams()

  const searchTarget = getSearchParam(search_target) as SearchTarget
  const { handleValueChange: updateSearchTarget } =
    useParamValueWithLocalStorage({
      paramName: search_target,
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
