import {
  defaultInputEncoding,
  globalParamsNames,
} from "@/utils/api/global/params"
import { exhaustiveStringTuple } from "@/utils/typescript"

import { defaultSearchTarget, localParamNames } from "./local"
import {
  AllSearchParamDefaults,
  AllSearchParams,
  CommonSearchRequestProps,
  Schema,
  SearchParamNames,
  SearchTarget,
  SearchTargetParamDefaults,
} from "./types"

export type {
  AllSearchParamDefaults,
  AllSearchParams,
  SearchTarget,
  SearchTargetParamDefaults,
}

export type SearchType = CommonSearchRequestProps["search_type"] &
  keyof Messages["search"]["commonParams"]["searchTypes"]

export const searchTypes: SearchType[] = exhaustiveStringTuple<
  CommonSearchRequestProps["search_type"]
>()("regular", "semantic")
export const defaultSearchType = "semantic"

export type SearchPostProcessModel = Schema["PostProcessModel"]

export const searchPostProcessModels: SearchPostProcessModel[] =
  // TODO: update tuple typing to enforce parity once `.` key error is addressed
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
    "all",
    "tib",
    "skt",
    "chn",
    "pli",
  )
export const defaultSearchFilterLanguage = "all"

export const searchParamsNames: SearchParamNames = {
  global: globalParamsNames,
  common: {
    search_input: "search_input",
    search_type: "search_type",
  },
  parallel: {
    filter_source_language: "filter_source_language",
    filter_target_language: "filter_target_language",
    source_limits: "source_limits",
  },
  primary: {
    filter_language: "filter_language",
    limits: "limits",
  },
  secondary: {
    filter_secondary: "filter_secondary",
    postprocess_model: "postprocess_model",
  },
}

const {
  global: {
    api: { input_encoding },
  },
  common: { search_type },
  parallel: { filter_source_language, filter_target_language, source_limits },
  primary: { filter_language, limits },
  secondary: { filter_secondary, postprocess_model },
} = searchParamsNames

const { search_target } = localParamNames

export const targetSearchDefaultParams: SearchTargetParamDefaults = {
  parallel: {
    [search_target]: defaultSearchTarget,
    [search_type]: defaultSearchType,
    [input_encoding]: defaultInputEncoding,
    [filter_source_language]: defaultSearchFilterLanguage,
    [filter_target_language]: defaultSearchFilterLanguage,
    [source_limits]: undefined,
  },
  primary: {
    [search_target]: defaultSearchTarget,
    [search_type]: defaultSearchType,
    [input_encoding]: defaultInputEncoding,
    [filter_language]: defaultSearchFilterLanguage,
    [limits]: undefined,
  },
  secondary: {
    [search_target]: defaultSearchTarget,
    [search_type]: defaultSearchType,
    [input_encoding]: defaultInputEncoding,
    [filter_secondary]: undefined,
    [postprocess_model]: "TODO",
  },
}
export const allSearchDefaultParams: AllSearchParamDefaults = {
  [search_target]: defaultSearchTarget,
  [search_type]: defaultSearchType,
  [input_encoding]: defaultInputEncoding,
  [filter_source_language]: defaultSearchFilterLanguage,
  [filter_target_language]: defaultSearchFilterLanguage,
  [source_limits]: undefined,
  [filter_language]: defaultSearchFilterLanguage,
  [limits]: undefined,
  [filter_secondary]: undefined,
  [postprocess_model]: undefined,
}
