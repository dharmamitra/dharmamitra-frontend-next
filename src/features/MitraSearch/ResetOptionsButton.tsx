"use client"

import React from "react"
import { useTranslations } from "next-intl"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import {
  useFilterLanguageParam,
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useInputEncodingParamWithLocalStorage,
  useSearchTargetParam,
  useSearchTypeParam,
} from "@/hooks/params"
import {
  allSearchDefaultParams as allDefaults,
  searchParamsNames,
  SearchTarget,
  searchTargetDefaultParams,
} from "@/utils/api/search/params"
import {
  AllSearchApiParams,
  AllSearchParams,
  LocalParams,
} from "@/utils/api/search/types"

const {
  local: { search_target },
  // parallel: { source_limits },
  // primary: { limits },
} = searchParamsNames

type ParamKey = Exclude<keyof AllSearchParams, "search_input">

type GetIsCustomValueAsBinaryProps = {
  targetDefaults: Partial<AllSearchApiParams & { search_input: string }>
  key: ParamKey
  value: unknown
}

const getIsCustomValueAsBinary = ({
  targetDefaults,
  key,
  value,
}: GetIsCustomValueAsBinaryProps) => {
  if (key === search_target && value !== allDefaults.search_target) {
    return 1
  }

  if (!(key in targetDefaults) || !value) return 0

  // if (key === source_limits || key === limits) {
  //   // TODO: return value === "{}" ? 0 : 1
  //   return 0
  // }

  if (value !== allDefaults[key]) {
    return 1
  }

  return 0
}

type GetParamCountProps = {
  target: SearchTarget
  params: Partial<AllSearchApiParams & LocalParams>
}

const getParamCount = ({ params, target }: GetParamCountProps) => {
  let count = 0

  const targetDefaults = searchTargetDefaultParams[target]
  for (const [key, value] of Object.entries(params)) {
    count += getIsCustomValueAsBinary({
      targetDefaults,
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
  const [filter_language, setFilterLanguage] = useFilterLanguageParam()
  const [filter_source_language, setFilterSourceLanguage] =
    useFilterSourceLanguageParam()
  const [filter_target_language, setFilterTargetLanguage] =
    useFilterTargetLanguageParam()

  const [customOptionsCount, setCustomOptionsCount] = React.useState<
    number | undefined
  >()

  React.useEffect(() => {
    setCustomOptionsCount(() => {
      return getParamCount({
        target: search_target,
        params: {
          input_encoding,
          search_type,
          search_target,
          filter_language,
          filter_source_language,
          filter_target_language,
          // [source_limits]: sourceLimits,
          // [limits]: limitsValue,
        },
      })
    })
  }, [
    input_encoding,
    search_type,
    search_target,
    filter_language,
    filter_source_language,
    filter_target_language,
  ])

  const handleReset = React.useCallback(() => {
    setInputEncoding("")
    setSearchType(null)
    setSearchTarget(null)
    setFilterLanguage(null)
    setFilterSourceLanguage(null)
    setFilterTargetLanguage(null)
  }, [
    setInputEncoding,
    setSearchType,
    setSearchTarget,
    setFilterLanguage,
    setFilterSourceLanguage,
    setFilterTargetLanguage,
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
