"use client"

import React from "react"
import { useTranslations } from "next-intl"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"
import useSearchPrimaryParams from "@/hooks/search/useSearchPrimaryParams"
import useGlobalParams from "@/hooks/useGlobalParams"
import { localParamNames, SearchTarget } from "@/utils/api/search/local"
import {
  allSearchDefaultParams as allDefaults,
  AllSearchParams,
  searchParamsNames,
  targetSearchDefaultParams as targetDefaults,
} from "@/utils/api/search/params"

const { search_target } = localParamNames
const {
  common: { search_input, search_type, input_encoding },
  parallel: { filter_source_language, filter_target_language, source_limits },
  primary: { filter_language, limits },
} = searchParamsNames

type ParamKey = Exclude<keyof AllSearchParams, "search_target">
type ParamValue = string | undefined | null
type Params = Partial<Record<ParamKey, ParamValue>> & {
  search_target: SearchTarget
}

const getIsCustomValueBinary = (
  targetDefaults: Params,
  key: ParamKey,
  value: ParamValue,
) => {
  if (!(key in targetDefaults) || !value) return 0
  if (key === source_limits || key === limits) {
    return value === "{}" ? 0 : 1
  }
  if (value !== targetDefaults[key]) {
    return 1
  }
  return 0
}

const getParamCount = (params: Params, target: SearchTarget) => {
  let count = 0
  Object.entries(params).forEach(([key, value]) => {
    count += getIsCustomValueBinary(
      targetDefaults[target],
      key as ParamKey,
      value,
    )
  })
  return count
}

export default function ResetOptionsButton() {
  const t = useTranslations("search")

  const { searchTarget, searchType } = useSearchCommonParams()
  const { inputEncoding } = useGlobalParams()
  const { filterSourceLanguage, filterTargetLanguage, sourceLimits } =
    useSearchParallelParams()
  const { limits: limitsValue, filterLanguage } = useSearchPrimaryParams()

  const [customOptionsCount, setCustomOptionsCount] = React.useState<
    number | undefined
  >()

  React.useEffect(() => {
    setCustomOptionsCount(() => {
      return getParamCount(
        {
          [search_target]: searchTarget,
          [search_type]: searchType,
          [input_encoding]: inputEncoding,
          [filter_source_language]: filterSourceLanguage,
          [filter_target_language]: filterTargetLanguage,
          [source_limits]: sourceLimits,
          [filter_language]: filterLanguage,
          [limits]: limitsValue,
        },
        searchTarget,
      )
    })
  }, [
    searchType,
    inputEncoding,
    searchTarget,
    filterSourceLanguage,
    filterTargetLanguage,
    sourceLimits,
    filterLanguage,
    limitsValue,
  ])

  const handleReset = React.useCallback(() => {
    const url = new URL(window.location.href)
    const searchInput = url.searchParams.get(search_input)
    url.search = ""

    Object.entries(allDefaults).forEach(([key, value], index) => {
      if (!(key in targetDefaults[searchTarget] || value)) {
        localStorage.removeItem(key)
      }

      if (key in targetDefaults[searchTarget] && value) {
        url.search = `${url.search}${index === 0 ? "?" : "&"}${key}=${value}`
      }

      if (value) {
        localStorage.setItem(key, String(value))
      }
    })

    url.search =
      url.search + `${searchInput ? `&${search_input}=${searchInput}` : ""}`
    window.history.replaceState(null, "", url.toString())
  }, [searchTarget])

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
