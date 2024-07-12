"use client"

import React from "react"
import { useTranslations } from "next-intl"
import IconButton from "@mui/material/IconButton"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Tooltip from "@mui/material/Tooltip"
import { useSearchParams } from "next/navigation"

import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import Badge from "@mui/material/Badge"
import {
  searchParamsNames,
  AllSearchParams,
  searchDefaultParams as defaults,
} from "@/utils/api/search/params"

import { SearchTarget, localParamNames } from "@/utils/api/search/local"
import useSearchParallelParams from "@/hooks/search/useSearchParallelParams"
import useSearchPrimaryParams from "@/hooks/search/useSearchPrimaryParams"
import useGlobalParams from "@/hooks/useGlobalParams"

const { search_target } = localParamNames
const {
  common: { search_input, search_type, input_encoding },
  parallel: { filter_source_language, filter_target_language, source_limits },
  primary: { filter_language, limits },
} = searchParamsNames

type ParamKey = keyof AllSearchParams

type ParamDefaults = Partial<Record<ParamKey, string>> & {
  search_target: SearchTarget
}

const getCustomValueBinary = (
  targetDefaults: ParamDefaults,
  key: string,
  value: string,
) => {
  // console.log("get count", key, " => ", value)
  if (!(key in targetDefaults) || !value) return 0
  if (value !== targetDefaults[key as ParamKey]) {
    console.log("ADD 1", key, " => ", value)
    return 1
  }
  return 0
}

const getInitialParamCount = (
  params: URLSearchParams,
  target: SearchTarget,
) => {
  let count = 0
  Array.from(params.entries()).forEach(([key, value]) => {
    count += getCustomValueBinary(defaults[target], key, value)
  })
  return count
}

const getParamCount = (params: Record<any, any>, target: SearchTarget) => {
  let count = 0
  Object.entries(params).forEach(([key, value]) => {
    count += getCustomValueBinary(defaults[target], key, value)
  })
  return count
}

export default function ResetOptionsButton() {
  const t = useTranslations("search")

  const { searchTarget, searchType } = useSearchCommonParams()
  const { inputEncoding } = useGlobalParams()
  const { filterSourceLanguage, filterTargetLanguage, sourceLimits } =
    useSearchParallelParams()
  const { limits, filterLanguage } = useSearchPrimaryParams()

  const [customOptionsCount, setCustomOptionsCount] = React.useState<
    number | undefined
  >()

  React.useEffect(() => {
    setCustomOptionsCount((prev) => {
      return getParamCount(
        {
          [search_target]: searchTarget,
          [search_type]: searchType,
          [input_encoding]: inputEncoding,
          [filter_source_language]: filterSourceLanguage,
          [filter_target_language]: filterTargetLanguage,
          // [source_limits]: sourceLimits,
          [filter_language]: filterLanguage,
          // [limits]: limits,
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
    limits,
  ])

  const handleReset = React.useCallback(() => {
    const url = new URL(window.location.href)
    const searchInput = url.searchParams.get(search_input)

    Object.entries(defaults[searchTarget]).forEach(([key, value]) => {
      localStorage.setItem(key, String(value))
    })

    url.search = `?${searchInput ? `${search_input}=${searchInput}` : ""}`
    window.history.replaceState(null, "", url.toString())
  }, [])

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
