"use client"

import React from "react"
import Box from "@mui/material/Box"

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
  const { value: target } = useParamValueWithLocalStorage({
    paramName: searchParamsNames.target,
    defaultValue,
  })

  if (!results[target as SearchDataTarget]) {
    throw new Error(`Invalid search target: ${target}`)
  }

  return <Box sx={{ pt: 5 }}>{results[target as SearchDataTarget]}</Box>
}
