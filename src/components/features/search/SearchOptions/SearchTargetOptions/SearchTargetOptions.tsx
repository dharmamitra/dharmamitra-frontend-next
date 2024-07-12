"use client"

import React from "react"
import Box from "@mui/material/Box"

import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"
import useSearchPrimaryParams from "@/hooks/search/useSearchPrimaryParams"
import { searchParamsNames } from "@/utils/api/search/params"

import LanguageFilterSelector from "./LanguageFilterSelector"
import LimitFilters, { LimitFiltersProps } from "./LimitFilters/LimitFilters"
import SearchTargetButtons from "./SearchTargetButtons"

const {
  parallel: { source_limits },
  primary: { limits: limits_param_name },
} = searchParamsNames

export default function SearchTargetOptions() {
  const { searchTarget } = useSearchCommonParams()
  const { filterSourceLanguage, sourceLimits } = useSearchParallelParams()
  const { filterLanguage, limits } = useSearchPrimaryParams()

  const [limitProps, setLimitProps] = React.useState<
    LimitFiltersProps | undefined
  >()

  const showLimits = React.useRef<boolean>(false)

  React.useEffect(() => {
    if (searchTarget === "parallel") {
      showLimits.current = filterSourceLanguage === "all" ? false : true

      setLimitProps({
        limitParamName: source_limits,
        limitParamStringValue: sourceLimits,
        language: filterSourceLanguage,
      })
    } else if (searchTarget === "primary") {
      showLimits.current = filterLanguage === "all" ? false : true
      setLimitProps({
        limitParamName: limits_param_name,
        limitParamStringValue: limits,
        language: filterLanguage,
      })
    } else {
      showLimits.current = false
      setLimitProps(undefined)
    }
  }, [sourceLimits, limits, searchTarget, filterSourceLanguage, filterLanguage])

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

      {showLimits.current && limitProps ? (
        <LimitFilters {...limitProps} />
      ) : null}
    </Box>
  )
}
