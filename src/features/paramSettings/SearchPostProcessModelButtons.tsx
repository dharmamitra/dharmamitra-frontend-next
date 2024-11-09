"use client"

import React from "react"
// import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { searchPostProcessModels } from "@/utils/api/search/params"

export default function SearchPostProcessModelButtons() {
  // const t = useTranslations("search.commonParams.postProcessModels")

  const searchPostProcessModel = "TODO"
  const updateSearchPostProcessModel = (value: string) => value

  return (
    <div>
      <ToggleButtonGroup
        color="secondary"
        value={searchPostProcessModel}
        exclusive
        onChange={(event, value) => updateSearchPostProcessModel(value)}
        aria-label="Model"
      >
        {searchPostProcessModels.map((model) => (
          <ToggleButton key={model + "-model-option-loader"} value={model}>
            {/* {t(model)} */}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )
}
