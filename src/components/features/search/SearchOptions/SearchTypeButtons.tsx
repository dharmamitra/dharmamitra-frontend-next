"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import { searchTypes } from "@/utils/api/search/params"

export default function SearchTypeButtons() {
  const t = useTranslations("search.commonParams.searchTypes")

  const { searchType, setSearchType } = useSearchCommonParams()

  return (
    <div>
      <ToggleButtonGroup
        color="secondary"
        size="small"
        value={searchType}
        exclusive
        onChange={(event, value) => value && setSearchType(value)}
        aria-label="Search type"
      >
        {searchTypes.map((type) => (
          <ToggleButton key={type + "-search-type-option"} value={type}>
            {t(type)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )
}
