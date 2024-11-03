"use client"

import React from "react"
import Box from "@mui/material/Box"

import {
  DbSourceFilter,
  LanguageFilterSelector,
  SearchTargetButtons,
} from "@/features/paramSettings"
import { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import {
  useFilterLanguageParam,
  useFilterSourceLanguageParam,
  useSearchTargetParam,
} from "@/hooks/params"
import {
  useInputSourceFiltersParam,
  useSourceFiltersParam,
} from "@/hooks/params/sourceFilterParams"

export default function TargetControls() {
  const [searchTarget] = useSearchTargetParam()
  const [filterLanguage, setFilterLanguage] = useFilterLanguageParam()
  const [filterSourceLanguage, setFilterSourceLanguage] =
    useFilterSourceLanguageParam()
  const [, setSourceFilters] = useSourceFiltersParam()
  const [, setInputSourceFilters] = useInputSourceFiltersParam()

  const dbSourceFilterProps = React.useMemo(() => {
    if (
      searchTarget === "primary" &&
      filterLanguage &&
      filterLanguage !== "aa"
    ) {
      return {
        filterName: DbSourceFilterUISetting.SOURCE_FILTERS,
        sourceLanguage: filterLanguage,
      }
    }

    if (
      searchTarget === "parallel" &&
      filterSourceLanguage &&
      filterSourceLanguage !== "aa"
    ) {
      return {
        filterName: DbSourceFilterUISetting.INPUT_SOURCE_FILTERS,
        sourceLanguage: filterSourceLanguage,
      }
    }

    return undefined
  }, [searchTarget, filterSourceLanguage, filterLanguage])

  React.useEffect(() => {
    setSourceFilters(null)
  }, [filterLanguage, setSourceFilters])

  React.useEffect(() => {
    setInputSourceFilters(null)
  }, [filterSourceLanguage, setInputSourceFilters])

  React.useEffect(() => {
    setFilterSourceLanguage("aa")
    setFilterLanguage("aa")
    setSourceFilters(null)
    setInputSourceFilters(null)
  }, [
    searchTarget,
    setFilterSourceLanguage,
    setFilterLanguage,
    setSourceFilters,
    setInputSourceFilters,
  ])

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

      {dbSourceFilterProps ? <DbSourceFilter {...dbSourceFilterProps} /> : null}
    </Box>
  )
}
