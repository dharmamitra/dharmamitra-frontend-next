"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import {
  searchParamsNames,
  searchPostProcessModels,
} from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"

const defaultValue = getValidDefaultValue(searchPostProcessModels[0])

export default function SearchPostProcessModelButtons() {
  const t = useTranslations("search.commonParams.postProcessModels")

  const { value, handleValueChange } = useParamValueWithLocalStorage({
    paramName: searchParamsNames.common.postprocess_model,
    defaultValue,
  })

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(defaultValue)
    }
  }, [value, handleValueChange])

  return (
    <div>
      <ToggleButtonGroup
        color="secondary"
        value={value}
        exclusive
        onChange={(event, value) => handleValueChange(value)}
        aria-label="Model"
      >
        {searchPostProcessModels.map((model) => (
          <ToggleButton key={model + "-model-option-loader"} value={model}>
            {t(model)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )
}
