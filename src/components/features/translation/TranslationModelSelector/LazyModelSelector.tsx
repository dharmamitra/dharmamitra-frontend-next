"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useTranslationEndpointParams from "@/hooks/translation/useTranslationEndpointParams"
import { translationModels } from "@/utils/api/translation/params"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { translationModel, setTranslationModel } =
    useTranslationEndpointParams()

  return (
    <ToggleButtonGroup
      color="secondary"
      value={translationModel}
      exclusive
      onChange={(event, value) => setTranslationModel(value)}
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
