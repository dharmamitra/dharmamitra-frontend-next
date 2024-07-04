import { SearchApiTypes } from "@/api"
import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  CommonSearchParamNames,
  CommonSearchParams,
  SearchEndpoint,
  SearchParamNames,
  SearchTarget,
} from "./types"

export type SearchDataTarget = SearchEndpoint &
  keyof Messages["search"]["targets"]

export const searchDataTargets: SearchDataTarget[] =
  exhaustiveStringTuple<SearchEndpoint>()("parallel", "primary", "secondary")

export const disabledSearchDataTargets: SearchDataTarget[] = [
  "primary",
  "secondary",
]

export type SearchType = CommonSearchParams["search_type"] &
  keyof Messages["search"]["commonParams"]["searchTypes"]

export const searchTypes: SearchType[] = exhaustiveStringTuple<
  CommonSearchParams["search_type"]
>()("regular", "semantic")

export type SearchPostProcessModel = CommonSearchParams["postprocess_model"] &
  keyof Messages["search"]["commonParams"]["postProcessModels"]

export const searchPostProcessModels: SearchPostProcessModel[] =
  // TODO: update tuple typing to enforce parity once `.` key error is addressed
  exhaustiveStringTuple<SearchPostProcessModel>()(
    "llama3",
    // "gpt-3.5", TODO: excluded due to `.` key error
    "gpt-4",
    "claude",
    "none",
  )

// TODO: should be updated to common param on backend update
export type SearchFilterLanguage =
  SearchApiTypes.PrimaryRequestBody["filter_language"] &
    keyof Messages["search"]["commonParams"]["filterLanguages"]

export const searchFilterLanguages: SearchFilterLanguage[] =
  exhaustiveStringTuple<SearchApiTypes.PrimaryRequestBody["filter_language"]>()(
    "all",
    "tibetan",
    "sanskrit",
    "buddhist-chinese",
    "pali",
  )

// TODO: should be updated to common param on backend update
export type SearchLimitsPrimary =
  SearchApiTypes.PrimaryRequestBody["filter_primary"]

export const searchParamsNames: SearchParamNames &
  CommonSearchParamNames &
  SearchTarget = {
  target: "search_target",
  common: {
    search_input: "search_input",
    input_encoding: "input_encoding",
    search_type: "search_type",
    postprocess_model: "postprocess_model",
  },
  parallel: {
    search_input: "search_input",
    input_encoding: "input_encoding",
    search_type: "search_type",
    filter_source_language: "filter_source_language",
    filter_source_data: "filter_source_data",
    postprocess_model: "postprocess_model",
  },
  primary: {
    search_input: "search_input",
    input_encoding: "input_encoding",
    search_type: "search_type",
    filter_language: "filter_language",
    filter_primary: "filter_primary",
    postprocess_model: "postprocess_model",
  },
  secondary: {
    search_input: "search_input",
    input_encoding: "input_encoding",
    search_type: "search_type",
    filter_secondary: "filter_secondary",
    postprocess_model: "postprocess_model",
  },
}
