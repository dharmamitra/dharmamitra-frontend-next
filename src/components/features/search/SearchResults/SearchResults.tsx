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
  secondary: <div />, // TODO
}

export default function SearchResults() {
  const { searchTarget, setSearchInput } = useSearchCommonParams()

  if (!searchTarget) {
    setSearchInput(defaultSearchTarget)
    return <Box sx={{ pt: 4 }}>{results[defaultSearchTarget]}</Box>
  }

  return <Box sx={{ pt: 4 }}>{results[searchTarget]}</Box>
}
