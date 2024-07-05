"use client"

import React from "react"
import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"

import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import { searchParamsNames, searchTypes } from "@/utils/api/search/params"
import { getValidDefaultValue } from "@/utils/ui"

const defaultValue = getValidDefaultValue(searchTypes[0])

export default function SearchTypeSwitch() {
  const t = useTranslations("search.commonParams.searchTypes")

  const { value, handleValueChange } = useParamValueWithLocalStorage({
    paramName: searchParamsNames.common.search_type,
    defaultValue,
  })

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(defaultValue)
    }
  }, [value, handleValueChange])

  return (
    <FormControlLabel
      control={
        <Switch
          checked={value === "semantic"}
          onChange={() =>
            handleValueChange(value === "regular" ? "semantic" : "regular")
          }
          color="secondary"
        />
      }
      label={t("semantic")}
    />
  )
}
