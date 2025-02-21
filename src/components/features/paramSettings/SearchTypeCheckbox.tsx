"use client"

import React, { SyntheticEvent } from "react"
import { useTranslations } from "next-intl"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

import { useSearchTypeParam } from "@/hooks/params"

export default function SearchTypeButtons() {
  const t = useTranslations("search")

  const [searchType, setSearchType] = useSearchTypeParam()

  const handleChange = (event: SyntheticEvent) => {
    const checked = (event.target as HTMLInputElement).checked
    if (checked) {
      setSearchType("regular")
    } else {
      setSearchType("semantic")
    }
  }

  return (
    <FormControlLabel
      control={<Checkbox color="secondary" />}
      checked={searchType === "regular"}
      onChange={handleChange}
      label={t("precisionLabel")}
      labelPlacement="start"
    />
  )
}
