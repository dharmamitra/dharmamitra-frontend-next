"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  defaultTranslationModel,
  translationModels,
  translationParamsNames,
} from "@/utils/api/translation/params"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { value, handleValueChange } = useParamValueWithLocalStorage({
    paramName: translationParamsNames.translation.model,
    defaultValue: defaultTranslationModel,
  })

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(defaultTranslationModel)
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
