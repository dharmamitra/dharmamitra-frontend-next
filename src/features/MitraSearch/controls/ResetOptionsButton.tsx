"use client"

import React from "react"
import { useTranslations } from "next-intl"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import {
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useInputEncodingParamWithLocalStorage,
  useSearchTargetParam,
  useSearchTypeParam,
  useSourceFiltersParam,
} from "@/hooks/params"
import {
  allSearchDefaultParams as allDefaults,
  searchParamsNames,
} from "@/utils/api/search/params"
import { AllSearchParams, LocalParams } from "@/utils/api/search/types"

const {
  local: { search_target },
} = searchParamsNames

type ParamKey = Exclude<keyof AllSearchParams, "search_input">

type GetIsCustomValueAsBinaryProps = {
  defaults: Partial<AllSearchParams & { search_input: string }>
  key: ParamKey
  value: unknown
}

const getIsCustomValueAsBinary = ({
  defaults,
  key,
  value,
}: GetIsCustomValueAsBinaryProps) => {
  if (key === search_target && value !== allDefaults.search_target) {
    return 1
  }

  if (!(key in defaults) || !value) return 0

  if (key === "source_filters") {
    return Object.keys(value).length === 0 ? 0 : 1
  }

  if (value !== allDefaults[key]) {
    return 1
  }

  return 0
}

type GetParamCountProps = {
  params: Partial<AllSearchParams & LocalParams>
}

const getParamCount = ({ params }: GetParamCountProps) => {
  let count = 0

  for (const [key, value] of Object.entries(params)) {
    count += getIsCustomValueAsBinary({
      defaults: allDefaults,
      key: key as ParamKey,
      value,
    })
  }
  return count
}

export default function ResetOptionsButton() {
  const t = useTranslations("search")

  const [input_encoding, setInputEncoding] =
    useInputEncodingParamWithLocalStorage()
  const [search_type, setSearchType] = useSearchTypeParam()
  const [search_target, setSearchTarget] = useSearchTargetParam()
  const [filter_source_language, setFilterSourceLanguage] =
    useFilterSourceLanguageParam()
  const [filter_target_language, setFilterTargetLanguage] =
    useFilterTargetLanguageParam()
  const [source_filters, setSourceFilters] = useSourceFiltersParam()

  const [customOptionsCount, setCustomOptionsCount] = React.useState<
    number | undefined
  >()

  React.useEffect(() => {
    setCustomOptionsCount(() => {
      return getParamCount({
        params: {
          input_encoding,
          search_type,
          search_target,
          filter_source_language,
          filter_target_language,
          source_filters,
        },
      })
    })
  }, [
    input_encoding,
    search_type,
    search_target,
    filter_source_language,
    filter_target_language,
    source_filters,
  ])

  const handleReset = React.useCallback(() => {
    setInputEncoding("")
    setSearchType(null)
    setSearchTarget(null)
    setFilterSourceLanguage(null)
    setFilterTargetLanguage(null)
    setSourceFilters(null)
  }, [
    setInputEncoding,
    setSearchType,
    setSearchTarget,
    setFilterSourceLanguage,
    setFilterTargetLanguage,
    setSourceFilters,
  ])

  return (
    <Badge
      badgeContent={customOptionsCount}
      color="secondary"
      aria-label={t("optionCountBadgeLabel", {
        count: customOptionsCount,
      })}
      sx={{
        "& .MuiBadge-badge": {
          top: "2px",
          right: "2px",
        },
      }}
    >
      <Tooltip title={t("resetOptionsLabel")} placement="top">
        <span>
          <IconButton disabled={customOptionsCount === 0} onClick={handleReset}>
            <RotateLeftIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Badge>
  )
}
