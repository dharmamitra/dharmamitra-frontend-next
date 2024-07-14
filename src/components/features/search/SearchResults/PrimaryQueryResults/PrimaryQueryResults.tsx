import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import SkeletonGroup from "@/components/SkeletonGroup"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchPrimaryParams from "@/hooks/search/useSearchPrimaryParams"
import useGlobalParams from "@/hooks/useGlobalParams"
import useParams from "@/hooks/useParams"
import {
  allSearchDefaultParams,
  searchParamsNames,
} from "@/utils/api/search/params"

import ResultsHeading from "../ResultsHeading"
import PrimarySearchResultItems from "./PrimaryQueryResultItems"

const {
  common: { search_input },
} = searchParamsNames

const {
  search_type: searchTypeDefault,
  input_encoding: inputEncodingDefault,
  filter_language: filterLanguageDefault,
} = allSearchDefaultParams

export default function PrimaryQueryResults() {
  const { getSearchParam } = useParams()
  const { searchType } = useSearchCommonParams()
  const { inputEncoding } = useGlobalParams()
  const { limits, filterLanguage } = useSearchPrimaryParams()

  const requestBody: SearchApiTypes.PrimaryRequestBody = React.useMemo(
    () => ({
      search_input: getSearchParam(search_input) ?? "",
      search_type: searchType ?? searchTypeDefault,
      input_encoding: inputEncoding ?? inputEncodingDefault,
      limits: limits
        ? (JSON.parse(limits) as SearchApiTypes.Schema["Limits"])
        : {},
      filter_language: filterLanguage ?? filterLanguageDefault,
    }),
    [getSearchParam, searchType, inputEncoding, limits, filterLanguage],
  )

  const [isSearchTriggered, setTriggerSearchQuery] = useAtom(
    triggerSearchQueryAtom,
  )

  const { data, isLoading, isError, error } = useQuery({
    queryKey: DMFetchApi.searchPrimary.makeQueryKey(requestBody),
    queryFn: () => {
      setTriggerSearchQuery(false)
      return DMFetchApi.searchPrimary.call(requestBody)
    },
    enabled: isSearchTriggered,
  })

  React.useEffect(() => {
    if (!data) {
      window.scrollTo(0, 0)
    }
  }, [data])

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <SkeletonGroup />
  }

  if (!data) {
    return null
  }

  return (
    <div>
      <ResultsHeading />

      {data.length === 0 ? "No results found." : null}

      <PrimarySearchResultItems results={data} />
    </div>
  )
}
