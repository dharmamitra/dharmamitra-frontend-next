"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"

import { useTranslationModelParam } from "@/hooks/params"
import { modelTypes } from "@/utils/api/global/params"

export default function TranslationModelSelectorRenderer({ isRendered }: { isRendered: boolean }) {
  if (!isRendered) return null

  return <TranslationModelSelector />
}

function TranslationModelSelector() {
  const t = useTranslations("globalParams.modelType")

  const [translationModelParam, setTranslationModelParam] = useTranslationModelParam()

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
      value={translationModelParam}
      exclusive
      onChange={(_event, value) => value && setTranslationModelParam(value)}
      aria-label="Model"
    >
      {modelTypes.map((model) => (
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
          {t(model)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
