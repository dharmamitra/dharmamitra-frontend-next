"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import { apiParamsNames, translationModels } from "@/utils/api/params"
import { getValidDefaultValue } from "@/utils/ui"

const defaultValue = getValidDefaultValue(translationModels[0])

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { value, handleValueChange } = useParamValueWithLocalStorage({
    paramName: apiParamsNames.translation.model,
    defaultValue,
  })

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(defaultValue)
    }
  }, [value, handleValueChange])

  return (
    <ToggleButtonGroup
      color="secondary"
      value={value}
      exclusive
      onChange={(event, value) => handleValueChange(value)}
      aria-label="Model"
    >
      {translationModels.map((model) => (
        <ToggleButton key={model + "-model-option-loader"} value={model}>
          {t(`models.${model}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
