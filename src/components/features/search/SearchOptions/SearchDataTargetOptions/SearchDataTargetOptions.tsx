"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"

import useParams from "@/hooks/useParams"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  disabledSearchDataTargets,
  SearchDataTarget,
  searchDataTargets,
  SearchFilterLanguage,
  searchParamsNames,
} from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"

import LimitFilters from "./LimitFilters/LimitFilters"
import TargetDataLanguageFilter from "./TargetDataLanguageFilter"

const defaultValue = getValidDefaultValue(searchDataTargets[0])

export default function SearchDataTargetOptions() {
  const t = useTranslations("search")

  const { value: searchTarget, handleValueChange: updateDataTarget } =
    useParamValueWithLocalStorage({
      paramName: searchParamsNames.target,
      defaultValue,
    })

  React.useEffect(() => {
    if (searchTarget === "") {
      updateDataTarget(defaultValue)
    }
  }, [searchTarget, updateDataTarget])

  const { getSearchParam, createQueryString, updateParams } = useParams()

  const primaryLanguageFilter = getSearchParam(
    searchParamsNames.primary.filter_language,
  ) as SearchFilterLanguage
  const secondaryLanguageFilter = getSearchParam(
    `filter_language_secondary`,
  ) as SearchFilterLanguage

  const handleLanguageFilterChange = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString(searchParamsNames.primary.filter_language, value),
      )
    },
    [createQueryString, updateParams],
  )

  const handleDataSourceChange = React.useCallback(
    (value: string) => {
      updateDataTarget(value)
      handleLanguageFilterChange(null)
    },
    [handleLanguageFilterChange, updateDataTarget],
  )

  const isSmallScreen = useMediaQuery("(max-width:500px)")

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ToggleButtonGroup
        orientation={isSmallScreen ? "vertical" : "horizontal"}
        color="secondary"
        value={searchTarget}
        exclusive
        onChange={(event, value) => handleDataSourceChange(value)}
        aria-label="Data Source"
      >
        {searchDataTargets.map((target) => (
          <ToggleButton
            key={target + "data-target-option"}
            value={target}
            disabled={disabledSearchDataTargets.includes(target)}
          >
            {t(`targets.${target}`)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TargetDataLanguageFilter
        isSmallScreen={isSmallScreen}
        searchTarget={searchTarget as SearchDataTarget}
        value={primaryLanguageFilter || secondaryLanguageFilter}
        hangleChange={handleLanguageFilterChange}
      />

      <LimitFilters language={primaryLanguageFilter} />
    </Box>
  )
}
