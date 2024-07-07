"use client"

import React from "react"
import Box from "@mui/material/Box"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  SearchTarget,
  searchTargets,
  searchParamsNames,
} from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"

import ParallelQueryResults from "./ParallelQueryResults"

const defaultValue = getValidDefaultValue(searchTargets[0])

const results: Record<SearchTarget, JSX.Element> = {
  parallel: <ParallelQueryResults />,
  primary: <div />, // TODO
  secondary: <div />, // TODO
}

export default function SearchResults() {
  const { value: target } = useParamValueWithLocalStorage({
    paramName: searchParamsNames.target,
    defaultValue,
  })

  if (!results[target as SearchTarget]) {
    throw new Error(`Invalid search target: ${target}`)
  }

  return <Box sx={{ pt: 5 }}>{results[target as SearchTarget]}</Box>
}
