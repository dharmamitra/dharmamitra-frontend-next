"use client"

import React from "react"
import Box from "@mui/material/Box"

import {
  DbSourceFilter,
  LanguageFilterSelector,
  SearchTargetButtons,
} from "@/features/paramSettings"
import {
  useFilterSourceLanguageParam,
  useSearchTargetParam,
  useSourceFiltersParam,
} from "@/hooks/params"
import { defaultSourceLanguage } from "@/utils/api/search/params"

export default function TargetControls() {
  const [searchTarget] = useSearchTargetParam()
  const [filterSourceLanguage, setFilterSourceLanguage] =
    useFilterSourceLanguageParam()
  const [, setSourceFilters] = useSourceFiltersParam()

  const showDbSourceFilter = filterSourceLanguage !== defaultSourceLanguage

  React.useEffect(() => {
    setSourceFilters(null)
  }, [filterSourceLanguage, setSourceFilters])

  React.useEffect(() => {
    setFilterSourceLanguage(defaultSourceLanguage)
    setSourceFilters(null)
  }, [searchTarget, setFilterSourceLanguage, setSourceFilters])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <SearchTargetButtons />

      <LanguageFilterSelector />

      {showDbSourceFilter ? (
        <DbSourceFilter sourceLanguage={filterSourceLanguage} />
      ) : null}
    </Box>
  )
}
