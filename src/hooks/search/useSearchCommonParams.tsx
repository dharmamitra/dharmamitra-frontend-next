import React from "react"

import useParams from "@/hooks/useParams"
import {
  defaultSearchTarget,
  localParamNames,
  SearchTarget,
} from "@/utils/api/search/local"
import {
  defaultSearchType,
  searchParamsNames,
  SearchType,
} from "@/utils/api/search/params"

const {
  common: { search_input, search_type },
} = searchParamsNames

const { search_target } = localParamNames

const useSearchCommonParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  /**
   * Search Input
   */
  const searchInput = getSearchParam(search_input) ?? ""

  const setSearchInput = React.useCallback(
    (
      input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    ) => {
      const newValue = typeof input === "string" ? input : input.target.value
      updateParams(
        createQueryString({
          paramName: search_input,
          value: newValue,
          paramsString: window.location.search,
        }),
      )
    },
    [search_input, searchInput, createQueryString, updateParams],
  )

  /**
   * Search Target
   */

  const searchTarget = (getSearchParam(search_target) ??
    localStorage.getItem(search_target) ??
    defaultSearchTarget) as SearchTarget

  const setSearchTarget = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: search_target,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(search_target, value ?? "")
    },
    [search_target, searchTarget, createQueryString, updateParams],
  )

  /**
   * Search Type
   */
  const searchType = (getSearchParam(search_type) ??
    localStorage.getItem(search_type) ??
    defaultSearchType) as SearchType

  const setSearchType = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString({
          paramName: search_type,
          value,
          paramsString: window.location.search,
        }),
      )
      localStorage.setItem(search_type, value ?? "")
    },
    [search_type, searchType, createQueryString, updateParams],
  )

  return {
    searchTarget,
    setSearchTarget,
    searchInput,
    setSearchInput,
    searchType,
    setSearchType,
  }
}

export default useSearchCommonParams
