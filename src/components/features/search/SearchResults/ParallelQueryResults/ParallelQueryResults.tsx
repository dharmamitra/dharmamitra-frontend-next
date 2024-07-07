import React from "react"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import SkeletonGroup from "@/components/SkeletonGroup"
import useGlobalParams from "@/hooks/useGlobalParams"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/useSearchParallelParams"

import ParralelSearchResultItems from "./ParralelSearchResultItems"

export default function ParallelQueryResults() {
  const { searchInput, searchType } = useSearchCommonParams()
  const { inputEncoding } = useGlobalParams()
  const { sourceLimits, filterSourceLanguage, filterTargetLanguage } =
    useSearchParallelParams()

  const requestBody: SearchApiTypes.ParallelRequestBody = React.useMemo(
    () => ({
      search_input: searchInput ?? "",
      search_type: searchType,
      input_encoding: inputEncoding,
      source_limits: sourceLimits,
      filter_source_language: filterSourceLanguage,
      filter_target_language: filterTargetLanguage,
    }),
    [
      searchInput,
      searchType,
      inputEncoding,
      sourceLimits,
      filterSourceLanguage,
      filterTargetLanguage,
    ],
  )

  const [isSearchTriggered, setTriggerSearchQuery] = useAtom(
    triggerSearchQueryAtom,
  )

  const { data, isLoading, isError, error } = useQuery({
    queryKey: DMFetchApi.searchParallel.makeQueryKey(requestBody),
    queryFn: () => {
      setTriggerSearchQuery(false)
      return DMFetchApi.searchParallel.call(requestBody)
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
      <Typography component="h2" variant="h5" fontWeight={500} mb={2}>
        Results
      </Typography>

      {data.length === 0 ? "No results found." : null}

      <ParralelSearchResultItems results={data} />
    </div>
  )
}
