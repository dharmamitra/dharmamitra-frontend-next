"use client"

import React from "react"
import Box from "@mui/material/Box"

import useParams from "@/hooks/useParams"
import {
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

import SearchTargetButtons from "./SearchTargetButtons"
import LimitFilters from "./LimitFilters/LimitFilters"
import TargetDataLanguageButtons from "./TargetDataLanguageButtons"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"

export default function SearchTargetOptions() {
  const { searchTarget } = useSearchCommonParams()
  const { getSearchParam } = useParams()

  const selectedLanguage = getSearchParam(
    // TODO: update placeholder when available as common param
    searchParamsNames.parallel.filter_source_language,
  ) as SearchFilterLanguage

  const showLimitFilters = selectedLanguage && selectedLanguage !== "all"

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { lg: "flex-end" },
        gap: 2,
      }}
    >
      <SearchTargetButtons />

      <TargetDataLanguageButtons />

      {showLimitFilters ? <LimitFilters language={selectedLanguage} /> : null}
    </Box>
  )
}
