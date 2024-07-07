import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  CommonSearchParamNames,
  CommonSearchParams,
  Schema,
  SearchEndpoint,
  SearchParamNames,
  SearchTarget,
} from "./types"

// eslint-disable-next-line no-unused-vars
type ExcludeStreams<T> = T extends `${infer _}stream${infer _}` ? T : never

type Targets = Exclude<SearchEndpoint, ExcludeStreams<SearchEndpoint>>

export type SearchDataTarget = Targets & keyof Messages["search"]["targets"]

export const searchDataTargets: SearchDataTarget[] =
  exhaustiveStringTuple<Targets>()("parallel", "primary", "secondary")

export const disabledSearchDataTargets: SearchDataTarget[] = ["secondary"]

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
    filter_target_language: "filter_target_language",
    source_limits: "source_limits",
    postprocess_model: "postprocess_model",
  },
  primary: {
    search_input: "search_input",
    input_encoding: "input_encoding",
    search_type: "search_type",
    filter_language: "filter_language",
    limits: "limits",
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
