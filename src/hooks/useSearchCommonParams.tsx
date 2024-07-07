import React from "react"

import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  searchParamsNames,
  SearchTarget,
  searchTargets,
  SearchType,
  searchTypes,
} from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"

const defaultSearchTargetValue = getValidDefaultValue(searchTargets[0])
const defaultSearchTypeValue = getValidDefaultValue(searchTypes[0])

const useSearchCommonParams = () => {
  const {
    target,
    common: { search_input, search_type },
  } = searchParamsNames

  const { getSearchParam } = useParams()

  const searchTarget = getSearchParam(target) as SearchTarget
  const { handleValueChange: updateSearchTarget } =
    useParamValueWithLocalStorage({
      paramName: target,
      defaultValue: defaultSearchTargetValue,
    })

  React.useEffect(() => {
    if (!searchTarget) {
      updateSearchTarget(defaultSearchTargetValue)
    }
  }, [searchTarget, updateSearchTarget])

  const searchInput = getSearchParam(search_input)
  const { handleValueChange: updateSearchInput } =
    useParamValueWithLocalStorage({
      paramName: search_input,
      defaultValue: "",
    })

  const searchType = getSearchParam(search_type) as SearchType
  const { handleValueChange: updateSearchType } = useParamValueWithLocalStorage(
    {
      paramName: search_type,
      defaultValue: defaultSearchTypeValue,
    },
  )

  React.useEffect(() => {
    if (!searchType) {
      updateSearchType(defaultSearchTypeValue)
    }
  }, [searchType, updateSearchType])

  return {
    searchTarget,
    updateSearchTarget,
    searchInput,
    updateSearchInput,
    searchType,
    updateSearchType,
  }
}

export default useSearchCommonParams
