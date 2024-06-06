"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useAppConfig from "@/hooks/useAppConfig"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { apiParamsNames, translationModels } from "@/utils/api/params"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { model } = useAppConfig().paramOptions

  const { input, handleInputChange } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.model,
    defaultValue: model,
  })

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(model)
    }
  }, [input, handleInputChange, model])

  return (
    <ToggleButtonGroup
      color="secondary"
      value={input}
      exclusive
      onChange={(event, value) => handleInputChange(value)}
      aria-label="Platform"
    >
      {translationModels.map((model) => (
        <ToggleButton key={model + "-model-option-loader"} value={model}>
          {t(`models.${model}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
