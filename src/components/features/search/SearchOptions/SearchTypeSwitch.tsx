"use client"

import React from "react"
import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import { SearchType } from "@/utils/api/search/params"
import useSearchCommonParams from "@/hooks/useSearchCommonParams"

const switchValues: Record<SearchType, SearchType> = {
  regular: "semantic",
  semantic: "regular",
}

export default function SearchTypeSwitch() {
  const t = useTranslations("search.commonParams.searchTypes")

  const { searchType, updateSearchType } = useSearchCommonParams()

  return (
    <FormControlLabel
      control={
        <Switch
          checked={searchType === "semantic"}
          onChange={() => updateSearchType(switchValues[searchType])}
          color="secondary"
        />
      }
      label={t("semantic")}
    />
  )
}
