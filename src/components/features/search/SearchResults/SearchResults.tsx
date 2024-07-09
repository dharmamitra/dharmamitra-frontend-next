"use client"

import React from "react"
import Box from "@mui/material/Box"

import useSearchCommonParams from "@/hooks/useSearchCommonParams"
import { SearchTarget } from "@/utils/api/search/params"

import ParallelQueryResults from "./ParallelQueryResults"
import PrimaryQueryResults from "./PrimaryQueryResults"

const results: Record<SearchTarget, JSX.Element> = {
  parallel: <ParallelQueryResults />,
  primary: <PrimaryQueryResults />,
  secondary: <div />, // TODO
}

export default function SearchResults() {
  const { searchTarget } = useSearchCommonParams()

  if (!results[searchTarget as SearchTarget]) {
    throw new Error(`Invalid search target: ${searchTarget}`)
  }

  return <Box sx={{ pt: 4 }}>{results[searchTarget]}</Box>
}
