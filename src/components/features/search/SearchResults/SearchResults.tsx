"use client"

import React from "react"
import Box from "@mui/material/Box"

import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import { defaultSearchTarget, SearchTarget } from "@/utils/api/search/local"

import ParallelQueryResults from "./ParallelQueryResults"
import PrimaryQueryResults from "./PrimaryQueryResults"

const results: Record<SearchTarget, JSX.Element> = {
  parallel: <ParallelQueryResults />,
  primary: <PrimaryQueryResults />,
  secondary: <div />,
}

export default function SearchResults() {
  const { searchTarget, setSearchInput } = useSearchCommonParams()

  if (!searchTarget || (searchTarget && !results[searchTarget])) {
    setSearchInput(defaultSearchTarget)
    return <Box sx={{ pt: 2 }}>{results[defaultSearchTarget]}</Box>
  }

  return <Box sx={{ pt: 2 }}>{results[searchTarget]}</Box>
}
