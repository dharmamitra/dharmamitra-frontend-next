import React from "react"
import Box from "@mui/material/Box"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import SkeletonGroup from "@/components/SkeletonGroup"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"
import useGlobalParams from "@/hooks/useGlobalParams"
import { allSearchDefaultParams } from "@/utils/api/search/params"

import ResultsHeading from "../ResultsHeading"
import ParralelSearchResultItems from "./ParralelSearchResultItems"
import ShowEngishSwitch from "./ShowEngishSwitch"

const {
  search_type: searchTypeDefault,
  input_encoding: inputEncodingDefault,
  filter_source_language: filterSourceLanguageDefault,
  filter_target_language: filterTargetLanguageDefault,
} = allSearchDefaultParams

export default function ParallelQueryResults() {
  const { searchInput, searchType } = useSearchCommonParams()
  const { inputEncoding } = useGlobalParams()
  const { sourceLimits, filterSourceLanguage, filterTargetLanguage } =
    useSearchParallelParams()

  const requestBody: SearchApiTypes.RequestBody<"/parallel/"> = React.useMemo(
    () => ({
      search_input: searchInput || "",
      search_type: searchType || searchTypeDefault,
      input_encoding: inputEncoding || inputEncodingDefault,
      source_limits: sourceLimits
        ? (JSON.parse(sourceLimits) as SearchApiTypes.Schema["Limits"])
        : {},
      filter_source_language:
        filterSourceLanguage || filterSourceLanguageDefault,
      filter_target_language:
        filterTargetLanguage || filterTargetLanguageDefault,
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
    retry: false,
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
