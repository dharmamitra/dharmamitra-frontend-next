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
  apiParamsNames,
  DataTargetLanguage,
  SearchDataTarget,
  searchDataTargets,
} from "@/utils/api/params"
import { getValidDefaultValue } from "@/utils/ui"

import LimitFilters from "./LimitFilters/LimitFilters"
import OpenSubOptionsButton from "./OpenSubOptionsButton"
import TargetDataLanguageFilter from "./TargetDataLanguageFilter"

const defaultValue = getValidDefaultValue(searchDataTargets[0])

export default function SearchDataTargetOptions() {
  const t = useTranslations("search")

  const { value: searchTarget, handleValueChange: updateDataTarget } =
    useParamValueWithLocalStorage({
      paramName: apiParamsNames.search.search_target,
      defaultValue,
    })

  React.useEffect(() => {
    if (searchTarget === "") {
      updateDataTarget(defaultValue)
    }
  }, [searchTarget, updateDataTarget])

  const { getSearchParam, createQueryString, updateParams } = useParams()

  const primaryLanguageFilter = getSearchParam(
    apiParamsNames.search.filter_language,
  ) as DataTargetLanguage
  const secondaryLanguageFilter = getSearchParam(
    `filter_language_secondary`,
  ) as DataTargetLanguage

  const [showLanguagesFilters, setShowLanguagesFilters] = React.useState(
    Boolean(primaryLanguageFilter),
  )

  const handleLanguageFilterChange = React.useCallback(
    (value: string | null) => {
      updateParams(
        createQueryString(apiParamsNames.search.filter_language, value),
      )
    },
    [createQueryString, updateParams],
  )

  const closePrimaryLanguageFilter = React.useCallback(() => {
    setShowLanguagesFilters(false)
    handleLanguageFilterChange(null)
  }, [setShowLanguagesFilters, handleLanguageFilterChange])

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
      <Box sx={{ display: "flex", gap: 1 }}>
        <ToggleButtonGroup
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          color="secondary"
          value={searchTarget}
          exclusive
          onChange={(event, value) => handleDataSourceChange(value)}
          aria-label="Data Source"
        >
          {searchDataTargets.map((target) => (
            <ToggleButton key={target + "data-target-option"} value={target}>
              {t(`targets.${target}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <OpenSubOptionsButton
          isShown={!showLanguagesFilters}
          setShowSubOption={setShowLanguagesFilters}
          sx={{ alignSelf: "flex-end" }}
        />
      </Box>

      <TargetDataLanguageFilter
        isSmallScreen={isSmallScreen}
        searchTarget={searchTarget as SearchDataTarget}
        value={primaryLanguageFilter || secondaryLanguageFilter}
        hangleChange={handleLanguageFilterChange}
        isSubOptionOpen={false}
        setShowSubOption={setShowLanguagesFilters}
        closeFilterOptions={closePrimaryLanguageFilter}
      />
      <LimitFilters language={primaryLanguageFilter} />
    </Box>
  )
}
