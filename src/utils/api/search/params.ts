import { defaultInputEncoding } from "@/utils/api/global/params"
import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  AllSearchApiParams,
  AllSearchParamDefaults,
  Schema,
  SearchParamNames,
  SearchTarget,
  SearchTargets,
} from "./types"

export type { AllSearchApiParams, AllSearchParamDefaults, SearchTarget }

/**
 * LOCAL PARAMS
 */

export const searchTargets: SearchTarget[] = exhaustiveStringTuple<SearchTargets>()(
  "primary",
  "parallel",
)
export const defaultSearchTarget = "primary" as const
export const disabledSearchTargets: SearchTarget[] = []

/**
 * API PARAMS
 */

export type SearchType = AllSearchApiParams["search_type"] &
  keyof Messages["search"]["commonParams"]["searchTypes"]

export const searchTypes: SearchType[] = exhaustiveStringTuple<AllSearchApiParams["search_type"]>()(
  "regular",
  "semantic",
)
export const defaultSearchType: SearchType = "semantic"

export type SearchPostProcessModel = Schema["PostProcessModel"]

export const searchPostProcessModels: SearchPostProcessModel[] =
  exhaustiveStringTuple<SearchPostProcessModel>()(
    "llama3",
    "gpt-3.5", // TODO: see if needs to be included in Messages following BE update ( excluded due to `.` key error)
    "gpt-4",
    "claude",
    "none",
  )

export type SearchFilterLanguage = Schema["FilterLanguage"] &
  keyof Messages["search"]["commonParams"]["filterLanguages"]

export const searchFilterLanguages: SearchFilterLanguage[] = exhaustiveStringTuple<
  Schema["FilterLanguage"]
>()(
  "all",
  "bo", // tibetan
  "sa", // sankrit
  "zh", // chinese
  "pa", // pali
)
export const defaultSourceLanguage = "all" as const

export const searchParamsNames: SearchParamNames = {
  local: {
    search_target: "search_target",
  },
  api: {
    do_ranking: "do_ranking",
    input_encoding: "input_encoding",
    search_input: "search_input",
    search_type: "search_type",
    filter_source_language: "filter_source_language",
    filter_target_language: "filter_target_language",
    source_filters: "source_filters",
  },
}

const {
  local: { search_target },
  api: {
    input_encoding,
    search_type,
    filter_source_language,
    filter_target_language,
    source_filters,
  },
} = searchParamsNames

export const allSearchDefaultParams: AllSearchParamDefaults = {
  [search_target]: defaultSearchTarget,
  [search_type]: defaultSearchType,
  [input_encoding]: defaultInputEncoding,
  [filter_source_language]: defaultSourceLanguage,
  [filter_target_language]: defaultSourceLanguage,
  [source_filters]: undefined,
  do_ranking: true,
}
