"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useAppConfig from "@/hooks/useAppConfig"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import { apiParamsNames, translationModels } from "@/utils/api/params"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { model } = useAppConfig().paramOptions

  const { value, handleValueChange } = useParamValueWithLocalStorage({
    paramName: apiParamsNames.translation.model,
    defaultValue: model,
  })

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(model)
    }
  }, [value, handleValueChange, model])

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
