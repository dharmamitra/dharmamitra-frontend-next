"use client"

import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  SearchDataTarget,
  searchDataTargets,
  searchParamsNames,
} from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"

import ParallelQueryResults from "./ParallelQueryResults"

const defaultValue = getValidDefaultValue(searchDataTargets[0])

const results: Record<SearchDataTarget, JSX.Element> = {
  parallel: <ParallelQueryResults />,
  primary: <div />, // TODO
  secondary: <div />, // TODO
}

export default function SearchResults() {
  const { value } = useParamValueWithLocalStorage({
    paramName: searchParamsNames.target,
    defaultValue,
  })
  const target = value as SearchDataTarget
  const triggerAtom = true

  if (!triggerAtom || !results[target]) return null

  return (
    <Box sx={{ mt: 3 }}>
      <Typography component="p" variant="h5" sx={{ mt: 6 }}>
        Search results
      </Typography>

      {results[target]}
    </Box>
  )
}
