import React from "react"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import CopyPageLink from "@/components/CopyPageLink"
import SkeletonGroup from "@/components/SkeletonGroup"
import { useInputEncoding } from "@/hooks/params"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"
import { allSearchDefaultParams } from "@/utils/api/search/params"

import ResultsHeading from "../ResultsHeading"
import ParallelCopyResults from "./ParallelCopyResults"
import ParralelSearchResultItems from "./ParralelSearchResultItems"

const {
  search_type: searchTypeDefault,
  input_encoding: inputEncodingDefault,
  filter_source_language: filterSourceLanguageDefault,
  filter_target_language: filterTargetLanguageDefault,
} = allSearchDefaultParams

export default function ParallelQueryResults() {
  const t = useTranslations("generic")
  const { searchInput, searchType } = useSearchCommonParams()
  const [inputEncoding] = useInputEncoding()
  const { sourceLimits, filterSourceLanguage, filterTargetLanguage } =
    useSearchParallelParams()

  const requestBody: SearchApiTypes.RequestBody<"/parallel/"> = React.useMemo(
    () => ({
      search_input: searchInput || "",
      search_type: searchType || searchTypeDefault,
      input_encoding: inputEncoding || inputEncodingDefault,
      source_limits: sourceLimits
        ? (JSON.parse(sourceLimits) as SearchApiTypes.Schema["Limits"])
        : { category_include: [], file_include: [] },
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

  if (data.length === 0) {
    return (
      <>
        <ResultsHeading />
        <Typography>{t("noResult")}</Typography>
      </>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 1,
        }}
      >
        <ResultsHeading results={data.length} />

        <Box>
          <CopyPageLink />
          <ParallelCopyResults type="refs" results={data} />
          <ParallelCopyResults type="full" results={data} />
        </Box>
      </Box>

      <ParralelSearchResultItems results={data} />
    </>
  )
}
