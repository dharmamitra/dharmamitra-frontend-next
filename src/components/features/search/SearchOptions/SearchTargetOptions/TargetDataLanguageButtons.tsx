import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  SearchDataTarget,
  searchDataTargets,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"
import { getValidDefaultValue, smMediaQuery } from "@/utils/ui"

const defaultSearchTarget = getValidDefaultValue(searchDataTargets[0])
const defaultFilterLanguage = getValidDefaultValue(searchFilterLanguages[0])

const getSelectedTargetLanguageOptions = (searchTarget: SearchDataTarget) => {
  switch (searchTarget) {
    case "primary":
      return {
        options: searchFilterLanguages,
        paramName: searchParamsNames.primary.filter_language,
        i18nKey: "search.commonParams.filterLanguages" as const,
      }
    case "parallel":
      return {
        //  TODO: update placeholder values when available from backend
        options: searchFilterLanguages,
        paramName: searchParamsNames.parallel.filter_source_language,
        i18nKey: "search.commonParams.filterLanguages" as const,
      }
    default:
      throw new Error("Invalid search target")
  }
}

export default function TargetDataLanguageButtons() {
  const { value: searchTarget, handleValueChange: updateDataTarget } =
    useParamValueWithLocalStorage({
      paramName: searchParamsNames.target,
      defaultValue: defaultSearchTarget,
    })

  React.useEffect(() => {
    if (searchTarget === "") {
      updateDataTarget(defaultFilterLanguage)
    }
  }, [searchTarget, updateDataTarget])

  const { options, paramName, i18nKey } = getSelectedTargetLanguageOptions(
    searchTarget as SearchDataTarget,
  )

  const t = useTranslations(i18nKey)

  const { value: selectedLanguage, handleValueChange } =
    useParamValueWithLocalStorage({
      paramName,
      defaultValue: defaultFilterLanguage,
    })

  return (
    <ToggleButtonGroup
      orientation={useMediaQuery(smMediaQuery) ? "vertical" : "horizontal"}
      color="secondary"
      size="small"
      value={selectedLanguage}
      exclusive
      onChange={(event, value) => handleValueChange(value)}
      aria-label="Data Source"
    >
      {options.map((language) => (
        <ToggleButton key={language + "data-language-option"} value={language}>
          {t(`${language}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
