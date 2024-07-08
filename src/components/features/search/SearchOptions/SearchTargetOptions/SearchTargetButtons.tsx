"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"

import useSearchCommonParams from "@/hooks/useSearchCommonParams"
import { disabledSearchTargets, searchTargets } from "@/utils/api/search/params"
import { smMediaQuery } from "@/utils/ui"

export default function SearchTargetButtons() {
  const t = useTranslations("search")

  const { searchTarget, updateSearchTarget } = useSearchCommonParams()

  return (
    <ToggleButtonGroup
      orientation={useMediaQuery(smMediaQuery) ? "vertical" : "horizontal"}
      color="secondary"
      size="small"
      value={searchTarget}
      exclusive
      onChange={(event, value) => updateSearchTarget(value)}
      aria-label="Data Source"
    >
      {searchTargets.map((target) => (
        <ToggleButton
          key={target + "data-target-option"}
          value={target}
          disabled={disabledSearchTargets.includes(target)}
        >
          {t(`targets.${target}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
