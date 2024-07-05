"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  disabledSearchDataTargets,
  searchDataTargets,
  searchParamsNames,
} from "@/utils/api/search/params"
import { getValidDefaultValue, smMediaQuery } from "@/utils/ui"

const defaultValue = getValidDefaultValue(searchDataTargets[0])

export default function DataTargetButtons() {
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

  return (
    <ToggleButtonGroup
      orientation={useMediaQuery(smMediaQuery) ? "vertical" : "horizontal"}
      color="secondary"
      value={searchTarget}
      exclusive
      onChange={(event, value) => updateDataTarget(value)}
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
  )
}
