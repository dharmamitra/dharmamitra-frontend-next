"use client"

import React from "react"
import Box from "@mui/material/Box"

import useParams from "@/hooks/useParams"
import {
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"

import DataTargetButtons from "./DataTargetButtons"
import LimitFilters from "./LimitFilters/LimitFilters"
import TargetDataLanguageButtons from "./TargetDataLanguageButtons"

export default function SearchTargetOptions() {
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
      <DataTargetButtons />

      <TargetDataLanguageButtons />

      {showLimitFilters ? <LimitFilters language={selectedLanguage} /> : null}
    </Box>
  )
}
