import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import SkeletonGroup from "@/components/SkeletonGroup"
import useGlobalParams from "@/hooks/useGlobalParams"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"
import useSearchPrimaryParams from "@/hooks/useSearchPrimaryParams"

import ResultsHeading from "../ResultsHeading"
import PrimarySearchResultItems from "./PrimaryQueryResultItems"

export default function PrimaryQueryResults() {
  const { searchInput, searchType } = useSearchCommonParams()
  const { inputEncoding } = useGlobalParams()
  const { limits, filterLanguage } = useSearchPrimaryParams()

  const requestBody: SearchApiTypes.PrimaryRequestBody = React.useMemo(
    () => ({
      search_input: searchInput ?? "",
      search_type: searchType,
      input_encoding: inputEncoding,
      limits: limits
        ? (JSON.parse(limits) as SearchApiTypes.Schema["Limits"])
        : {},
      filter_language: filterLanguage,
    }),
    [searchInput, searchType, inputEncoding, limits, filterLanguage],
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
