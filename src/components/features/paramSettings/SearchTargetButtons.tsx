"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Tooltip from "@mui/material/Tooltip"

import { useSearchTargetParam } from "@/hooks/params"
import { disabledSearchTargets, searchTargets } from "@/utils/api/search/params"

export default function SearchTargetButtons() {
  const t = useTranslations("search")

  const [searchTarget, setSearchTarget] = useSearchTargetParam()

  return (
    <ToggleButtonGroup
      color="secondary"
      size="small"
      value={searchTarget}
      exclusive
      onChange={(_, value) => value && setSearchTarget(value)}
      aria-label="Data Source"
    >
      {searchTargets.map((target) => (
        <Tooltip
          key={target + "data-target-option"}
          title={t(`targetTips.${target}`)}
          placement="top"
        >
          <span>
            <ToggleButton
              value={target}
              disabled={disabledSearchTargets.includes(target)}
            >
              {t(`targets.${target}`)}
            </ToggleButton>
          </span>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  )
}
