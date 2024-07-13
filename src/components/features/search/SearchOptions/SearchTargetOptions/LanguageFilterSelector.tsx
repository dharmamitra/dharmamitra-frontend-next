import React from "react"
import { useTranslations } from "next-intl"
import { Box } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"
import useSearchPrimaryParams from "@/hooks/search/useSearchPrimaryParams"
import {
  defaultSearchFilterLanguage,
  searchFilterLanguages,
} from "@/utils/api/search/params"

type LanguageSelectProps = {
  label: string
  value: string
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: SelectChangeEvent) => void
}

const LanguageSelect = ({
  label,
  value,
  handleChange,
}: LanguageSelectProps) => {
  const t = useTranslations("search.commonParams.filterLanguages")

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={value || defaultSearchFilterLanguage}
        label={label}
        onChange={handleChange}
        color="secondary"
      >
        {searchFilterLanguages.map((language) => (
          <MenuItem key={language + "data-language-option"} value={language}>
            {t(language)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default function LanguageFilterSelector() {
  const { searchTarget } = useSearchCommonParams()
  const {
    filterSourceLanguage,
    setFilterSourceLanguage,
    setFilterTargetLanguage,
    filterTargetLanguage,
  } = useSearchParallelParams()
  const { filterLanguage, setFilterLanguage } = useSearchPrimaryParams()

  const t = useTranslations("generic")

  if (searchTarget === "primary") {
    return (
      <LanguageSelect
        label={t("source")}
        value={filterLanguage}
        handleChange={(event) => setFilterLanguage(event.target.value)}
      />
    )
  }

  if (searchTarget === "parallel") {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <LanguageSelect
          label={t("source")}
          value={filterSourceLanguage}
          handleChange={(event) => setFilterSourceLanguage(event.target.value)}
        />
        <LanguageSelect
          label={t("target")}
          value={filterTargetLanguage}
          handleChange={(event) => setFilterTargetLanguage(event.target.value)}
        />
      </Box>
    )
  }

  return null
}
