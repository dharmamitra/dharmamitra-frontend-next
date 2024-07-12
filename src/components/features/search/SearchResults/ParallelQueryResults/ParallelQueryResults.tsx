import React from "react"
import Box from "@mui/material/Box"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import SkeletonGroup from "@/components/SkeletonGroup"
import useGlobalParams from "@/hooks/useGlobalParams"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"

import ResultsHeading from "../ResultsHeading"
import ParralelSearchResultItems from "./ParralelSearchResultItems"
import ShowEngishSwitch from "./ShowEngishSwitch"

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
      source_limits: sourceLimits
        ? (JSON.parse(sourceLimits) as SearchApiTypes.Schema["Limits"])
        : {},
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <ResultsHeading />
        <ShowEngishSwitch />
      </Box>

      {data.length === 0 ? "No results found." : null}

      <ParralelSearchResultItems results={data} />
    </div>
  )
}
