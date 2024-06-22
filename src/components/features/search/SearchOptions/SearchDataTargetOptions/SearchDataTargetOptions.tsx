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
  searchDataSources,
  translationModels,
} from "@/utils/api/params"

import LanguageFilterOptions from "./LanguageFilterOptions"
import OpenSubOptionsButton from "./OpenSubOptionsButton"
import LimitFilters from "./LimitFilters/LimitFilters"

const defaultDataSource = translationModels[0]

export default function SearchDataTargetOptions() {
  const t = useTranslations("search")

  const { value: dataSource, handleValueChange: updateDataTarget } =
    useParamValueWithLocalStorage({
      paramName: apiParamsNames.search.filter_primary,
      defaultValue: defaultDataSource,
    })

  React.useEffect(() => {
    if (dataSource === "") {
      updateDataTarget(defaultDataSource)
    }
  }, [dataSource, updateDataTarget])

  const { getSearchParam, createQueryString, updateParams } = useParams()

  const primaryLanguageFilter = getSearchParam(
    apiParamsNames.search.filter_language,
  )
  const secondaryLanguageFilter = getSearchParam(`filter_language_secondary`)

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
    [setShowLanguagesFilters, handleLanguageFilterChange],
  )

  const isSmallScreen = useMediaQuery("(max-width:500px)")

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <ToggleButtonGroup
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          color="secondary"
          value={dataSource}
          exclusive
          onChange={(event, value) => handleDataSourceChange(value)}
          aria-label="Data Source"
        >
          {searchDataSources.map((source) => (
            <ToggleButton key={source + "data-source-option"} value={source}>
              {t(`sources.${source}`)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <OpenSubOptionsButton
          isShown={!showLanguagesFilters}
          setShowSubOption={setShowLanguagesFilters}
          sx={{ alignSelf: "flex-end" }}
        />
      </Box>

      <LanguageFilterOptions
        isShown={Boolean(showLanguagesFilters || primaryLanguageFilter)}
        isSmallScreen={isSmallScreen}
        dataSource={dataSource}
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
