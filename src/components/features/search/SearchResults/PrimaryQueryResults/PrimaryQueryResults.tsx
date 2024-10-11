import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

import { DMFetchApi, SearchApiTypes } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import CopyPageLink from "@/components/CopyPageLink"
import ExceptionText from "@/components/ExceptionText"
import SkeletonGroup from "@/components/SkeletonGroup"
import { useInputEncoding } from "@/hooks/params"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchPrimaryParams from "@/hooks/search/useSearchPrimaryParams"
import { allSearchDefaultParams } from "@/utils/api/search/params"

import ResultsHeading from "../ResultsHeading"
import PrimaryCopyResults from "./PrimaryCopyResults"
import PrimarySearchResultItems from "./PrimaryQueryResultItems"

const {
  search_type: searchTypeDefault,
  input_encoding: inputEncodingDefault,
  filter_language: filterLanguageDefault,
} = allSearchDefaultParams

export default function PrimaryQueryResults() {
  const t = useTranslations("generic")
  const { searchInput, searchType } = useSearchCommonParams()
  const [inputEncoding] = useInputEncoding()
  const { limits, filterLanguage } = useSearchPrimaryParams()

  const requestBody: SearchApiTypes.RequestBody<"/primary/"> = React.useMemo(
    () => ({
      search_input: searchInput || "",
      search_type: searchType || searchTypeDefault,
      input_encoding: inputEncoding || inputEncodingDefault,
      limits: limits
        ? (JSON.parse(limits) as SearchApiTypes.Schema["Limits"])
        : { category_include: [], file_include: [] },
      filter_language: filterLanguage || filterLanguageDefault,
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
    retry: false,
  })

  React.useEffect(() => {
    if (!data) {
      window.scrollTo(0, 0)
    }
  }, [data])

  if (isError) {
    return <ExceptionText type="error" message={`Error: ${error.message}`} />
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
          <PrimaryCopyResults type="refs" results={data} />
          <PrimaryCopyResults type="full" results={data} />
        </Box>
      </Box>

      <PrimarySearchResultItems results={data} />
    </>
  )
}
