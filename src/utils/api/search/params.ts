import {
  defaultInputEncoding,
  globalParamsNames,
} from "@/utils/api/global/params"
import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  AllSearchApiParams,
  AllSearchParamDefaults,
  CommonSearchRequestProps,
  Schema,
  SearchParamNames,
  SearchTarget,
  SearchTargetParamDefaults,
  SearchTargets,
} from "./types"

export type {
  AllSearchApiParams,
  AllSearchParamDefaults,
  SearchTarget,
  SearchTargetParamDefaults,
}

/**
 * LOCAL PARAMS
 */

export const searchTargets: SearchTarget[] =
  exhaustiveStringTuple<SearchTargets>()("primary", "parallel")
export const defaultSearchTarget = "primary" as const
export const disabledSearchTargets: SearchTarget[] = []

/**
 * API PARAMS
 */

export type SearchType = CommonSearchRequestProps["search_type"] &
  keyof Messages["search"]["commonParams"]["searchTypes"]

export const searchTypes: SearchType[] = exhaustiveStringTuple<
  CommonSearchRequestProps["search_type"]
>()("regular", "semantic")
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

export const searchFilterLanguages: SearchFilterLanguage[] =
  exhaustiveStringTuple<Schema["FilterLanguage"]>()(
    "aa", // all
    "bo", // tibetan
    "sa", // sankrit
    "zh", // chinese
    "pa", // pali
  )
export const defaultSearchFilterLanguage = "aa" as const

export const searchParamsNames: SearchParamNames = {
  global: globalParamsNames,
  local: {
    search_target: "search_target",
  },
  common: {
    search_input: "search_input",
    search_type: "search_type",
  },
  primary: {
    filter_language: "filter_language",
    source_filters: "source_filters",
  },
  parallel: {
    filter_source_language: "filter_source_language",
    filter_target_language: "filter_target_language",
    source_filters: "source_filters",
  },

  // secondary: {
  //   filter_secondary: "filter_secondary",
  //   postprocess_model: "postprocess_model",
  // },
}

const {
  global: {
    api: { input_encoding },
  },
  local: { search_target },
  common: { search_type, search_input },
  parallel: { filter_source_language, filter_target_language },
  primary: { filter_language },
  // secondary: { filter_secondary, postprocess_model },
} = searchParamsNames

export const searchTargetDefaultParams: SearchTargetParamDefaults = {
  primary: {
    [search_input]: "",
    [search_type]: defaultSearchType,
    [input_encoding]: defaultInputEncoding,
    [filter_language]: defaultSearchFilterLanguage,
    source_filters: undefined,
  },
  parallel: {
    [search_input]: "",
    [search_type]: defaultSearchType,
    [input_encoding]: defaultInputEncoding,
    [filter_source_language]: defaultSearchFilterLanguage,
    [filter_target_language]: defaultSearchFilterLanguage,
    source_filters: undefined,
  },
  // secondary: { status: "AWAITING BE IMPLEMENTATION" },
}

export const allSearchDefaultParams: AllSearchParamDefaults = {
  [search_target]: defaultSearchTarget,
  [search_type]: defaultSearchType,
  [input_encoding]: defaultInputEncoding,
  [filter_source_language]: defaultSearchFilterLanguage,
  [filter_target_language]: defaultSearchFilterLanguage,
  [filter_language]: defaultSearchFilterLanguage,
  source_filters: undefined,
}
