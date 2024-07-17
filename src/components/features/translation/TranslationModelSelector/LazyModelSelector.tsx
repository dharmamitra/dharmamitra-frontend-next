"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"

import useTranslationEndpointParams from "@/hooks/translation/useTranslationEndpointParams"
import { translationModels } from "@/utils/api/translation/params"

export default function LazyModelSelector() {
  const t = useTranslations("translation")

  const { translationModel, setTranslationModel } =
    useTranslationEndpointParams()

  const isGrid = useMediaQuery("(max-width: 810px)")

  return (
    <ToggleButtonGroup
      color="secondary"
      sx={{
        ...(isGrid
          ? {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }
          : {}),
      }}
      size="small"
      value={translationModel}
      exclusive
      onChange={(event, value) => value && setTranslationModel(value)}
      aria-label="Model"
    >
      {translationModels.map((model) => (
        <ToggleButton
          key={model + "-model-option-loader"}
          value={model}
          sx={{
            ...(isGrid
              ? {
                  border: "1px solid",
                  borderLeft: "1px solid !important",
                  borderLeftColor: "rgba(0, 0, 0, 0.12) !important",
                  borderColor: "divider",
                  marginLeft: "0 !important",
                }
              : {}),
          }}
        >
          {t(`models.${model}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
