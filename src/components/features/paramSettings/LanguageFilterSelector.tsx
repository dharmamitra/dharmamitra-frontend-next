import React from "react"
import { useTranslations } from "next-intl"
import { Box } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

import {
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useSearchTargetParam,
} from "@/hooks/params"
import { defaultSourceLanguage, searchFilterLanguages } from "@/utils/api/search/params"
import { getValidSourceLanguage } from "@/utils/validators"

type LanguageSelectProps = {
  label: string
  value: string

  handleChange: (event: SelectChangeEvent) => void
}

const LANGUAGE_LIST_WIDTH = 140

const LanguageSelect = ({ label, value, handleChange }: LanguageSelectProps) => {
  const t = useTranslations("search.commonParams.filterLanguages")

  return (
    <FormControl sx={{ width: "100%", maxWidth: LANGUAGE_LIST_WIDTH }} size="small">
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={value || defaultSourceLanguage}
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
  const t = useTranslations("generic")

  const [searchTarget] = useSearchTargetParam()
  const [filterSourceLanguage, setFilterSourceLanguage] = useFilterSourceLanguageParam()
  const [filterTargetLanguage, setFilterTargetLanguage] = useFilterTargetLanguageParam()

  if (searchTarget === "primary") {
    return (
      <Box sx={{ display: "flex", gap: 1, minWidth: LANGUAGE_LIST_WIDTH }}>
        <LanguageSelect
          label={t("source")}
          value={filterSourceLanguage}
          handleChange={(event) =>
            setFilterSourceLanguage(getValidSourceLanguage(event.target.value))
          }
        />
      </Box>
    )
  }

  if (searchTarget === "parallel") {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <LanguageSelect
          label={t("source")}
          value={filterSourceLanguage}
          handleChange={(event) =>
            setFilterSourceLanguage(getValidSourceLanguage(event.target.value))
          }
        />
        <LanguageSelect
          label={t("target")}
          value={filterTargetLanguage}
          handleChange={(event) =>
            setFilterTargetLanguage(getValidSourceLanguage(event.target.value))
          }
        />
      </Box>
    )
  }

  return null
}
