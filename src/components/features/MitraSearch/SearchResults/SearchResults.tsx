"use client"

import React, { type JSX } from "react"
import Box from "@mui/material/Box"

import { useSearchInputParam, useSearchTargetParam } from "@/hooks/params"
import { defaultSearchTarget, SearchTarget } from "@/utils/api/search/params"

// import ParallelQueryResults from "./ParallelQueryResults"
import PrimaryQueryResults from "./PrimaryQueryResults"

const results: Record<SearchTarget, JSX.Element> = {
  primary: <PrimaryQueryResults />,
  // parallel: <ParallelQueryResults />,
  // secondary: <div />,
}

export default function SearchResults() {
  const [searchTarget] = useSearchTargetParam()
  const [, setSearchInput] = useSearchInputParam()

  if (!searchTarget || (searchTarget && !results[searchTarget])) {
    setSearchInput(defaultSearchTarget)
    return <Box sx={{ pt: 2 }}>{results[defaultSearchTarget]}</Box>
  }

  return <Box sx={{ pt: 2 }}>{results[searchTarget]}</Box>
}
