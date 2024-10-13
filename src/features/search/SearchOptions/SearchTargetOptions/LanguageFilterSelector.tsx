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
import useParams from "@/hooks/useParams"
import {
  defaultSearchFilterLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  primary: { limits: limits_param },
  parallel: { source_limits: source_limits_param },
} = searchParamsNames

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
  const t = useTranslations("generic")
  const { createQueryString, updateParams } = useParams()
  const { searchTarget } = useSearchCommonParams()
  const {
    filterSourceLanguage,
    setFilterSourceLanguage,
    setFilterTargetLanguage,
    filterTargetLanguage,
  } = useSearchParallelParams()
  const { filterLanguage, setFilterLanguage } = useSearchPrimaryParams()

  const handlePrimaryChange = React.useCallback(
    (event: SelectChangeEvent) => {
      setFilterLanguage(event.target.value)

      updateParams(
        createQueryString({
          paramName: limits_param,
          value: null,
          paramsString: window.location.search,
        }),
      )
    },
    [createQueryString, updateParams, setFilterLanguage],
  )

  const handleParallelSourceChange = React.useCallback(
    (event: SelectChangeEvent) => {
      setFilterSourceLanguage(event.target.value)

      updateParams(
        createQueryString({
          paramName: source_limits_param,
          value: null,
          paramsString: window.location.search,
        }),
      )
    },
    [createQueryString, updateParams, setFilterSourceLanguage],
  )

  if (searchTarget === "primary") {
    return (
      <LanguageSelect
        label={t("source")}
        value={filterLanguage}
        handleChange={handlePrimaryChange}
      />
    )
  }

  if (searchTarget === "parallel") {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <LanguageSelect
          label={t("source")}
          value={filterSourceLanguage}
          handleChange={handleParallelSourceChange}
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
