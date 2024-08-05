import React from "react"

import useParams from "@/hooks/useParams"
import { localParamNames } from "@/utils/api/search/local"
import { searchParamsNames } from "@/utils/api/search/params"
import { getValidSearchTarget, getValidSearchType } from "@/utils/validators"

const {
  common: { search_input, search_type },
} = searchParamsNames

const { search_target } = localParamNames

const useSearchCommonParams = () => {
  const { getSearchParam, createQueryString, updateParams } = useParams()

  /**
   * Search Input
   */

  const [searchInputValue, setSearchInputValue] = React.useState(
    getSearchParam(search_input) ?? "",
  )

  React.useEffect(() => {
    setSearchInputValue(getSearchParam(search_input) ?? "")
  }, [getSearchParam, search_input])

  const setSearchInput = React.useCallback(
    (
      input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    ) => {
      const newValue = typeof input === "string" ? input : input.target.value

      setSearchInputValue(newValue)
      updateParams(
        createQueryString({
          paramName: search_input,
          value: newValue,
          paramsString: window.location.search,
        }),
      )
    },
    [createQueryString, updateParams, setSearchInputValue],
  )

  /**
   * Search Target
   */

  const searchTarget = getValidSearchTarget(
    getSearchParam(search_target) || localStorage.getItem(search_target),
  )

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
    [createQueryString, updateParams],
  )

  /**
   * Search Type
   */
  const searchType = getValidSearchType(
    getSearchParam(search_type) || localStorage.getItem(search_type),
  )

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
    [createQueryString, updateParams],
  )

  /**
   * Param initialization
   */
  React.useEffect(() => {
    const initialSearchTarget = getSearchParam(search_target)
    const initialSearchType = getSearchParam(search_type)

    if (!initialSearchTarget) {
      setSearchTarget(getValidSearchTarget(localStorage.getItem(search_target)))
    }

    if (!initialSearchType) {
      setSearchType(getValidSearchType(localStorage.getItem(search_type)))
    }
  }, [getSearchParam, setSearchTarget, setSearchType])

  return {
    searchTarget,
    setSearchTarget,
    searchInput: searchInputValue,
    setSearchInput,
    searchType,
    setSearchType,
  }
}

export default useSearchCommonParams
