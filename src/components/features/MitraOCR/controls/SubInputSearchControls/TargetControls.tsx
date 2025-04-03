"use client"

import React from "react"
import Box from "@mui/material/Box"

import {
  DbSourceFilter,
  LanguageFilterSelector,
  SearchTargetButtons,
} from "@/components/features/paramSettings"
import {
  useFilterSourceLanguageParam,
  useResetSourceFilters,
  useSearchTargetParam,
} from "@/hooks/params"
import { defaultSourceLanguage } from "@/utils/api/search/params"

export default function TargetControls() {
  const [searchTarget] = useSearchTargetParam()
  const [filterSourceLanguage, setFilterSourceLanguage] =
    useFilterSourceLanguageParam()
  const resetSourceFilters = useResetSourceFilters()

  const showDbSourceFilter = filterSourceLanguage !== defaultSourceLanguage

  React.useEffect(() => {
    resetSourceFilters()
  }, [filterSourceLanguage, resetSourceFilters])

  React.useEffect(() => {
    setFilterSourceLanguage(defaultSourceLanguage)
    resetSourceFilters()
  }, [searchTarget, setFilterSourceLanguage, resetSourceFilters])

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
