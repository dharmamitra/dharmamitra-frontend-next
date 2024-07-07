import React from "react"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  searchTargets,
  SearchTarget,
  searchParamsNames,
  searchTypes,
  SearchType,
  searchPostProcessModels,
  SearchPostProcessModel,
} from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"
import useParams from "@/hooks/useParams"

const defaultSearchTargetValue = getValidDefaultValue(searchTargets[0])
const defaultSearchTypeValue = getValidDefaultValue(searchTypes[0])
const defaultSearchPostProcessModelValue = getValidDefaultValue(
  searchPostProcessModels[0],
)

const useSearchCommonParams = () => {
  const {
    target,
    common: { search_input, input_encoding, search_type, postprocess_model },
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

  const searchPostProcessModel = getSearchParam(
    postprocess_model,
  ) as SearchPostProcessModel
  const { handleValueChange: updateSearchPostProcessModel } =
    useParamValueWithLocalStorage({
      paramName: postprocess_model,
      defaultValue: defaultSearchPostProcessModelValue,
    })

  React.useEffect(() => {
    if (!searchPostProcessModel) {
      updateSearchPostProcessModel(defaultSearchPostProcessModelValue)
    }
  }, [searchPostProcessModel, updateSearchType])

  return {
    searchTarget,
    updateSearchTarget,
    searchInput,
    updateSearchInput,
    searchType,
    updateSearchType,
    searchPostProcessModel,
    updateSearchPostProcessModel,
  }
}

export default useSearchCommonParams
