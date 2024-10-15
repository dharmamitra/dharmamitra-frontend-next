"use client"

import React from "react"
import Box from "@mui/material/Box"

// import {
//   useFilterLanguageParam,
//   useFilterSourceLanguageParam,
//   useSearchTargetParam,
// } from "@/hooks/params"
// import {
//   defaultSearchFilterLanguage,
//   searchParamsNames,
// } from "@/utils/api/search/params"
import LanguageFilterSelector from "./LanguageFilterSelector"
// import LimitFilters from "./LimitFilters/LimitFilters"
import SearchTargetButtons from "./SearchTargetButtons"

// const {
//   parallel: { source_limits },
//   primary: { limits: limits_param_name },
// } = searchParamsNames

export default function SearchTargetOptions() {
  // const [searchTarget] = useSearchTargetParam()
  // const [filterSourceLanguage] = useFilterSourceLanguageParam()
  // const {  sourceLimits } = useSearchParallelParams()

  // const [filterLanguage] = useFilterLanguageParam()
  // const {  limits } = useSearchPrimaryParams()

  // const limitProps = React.useMemo(() => {
  //   if (searchTarget === "parallel") {
  //     return {
  //       limitParamName: source_limits,
  //       limitParamStringValue: sourceLimits,
  //       language: filterSourceLanguage,
  //     }
  //   } else if (searchTarget === "primary") {
  //     return {
  //       limitParamName: limits_param_name,
  //       limitParamStringValue: limits,
  //       language: filterLanguage,
  //     }
  //   } else {
  //     return undefined
  //   }
  // }, [searchTarget, sourceLimits, filterSourceLanguage, filterLanguage, limits])

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

      {/* {limitProps &&
      limitProps.language &&
      limitProps.language !== defaultSearchFilterLanguage ? (
      <LimitFilters {...limitProps} />
      ) : null} */}
    </Box>
  )
}
