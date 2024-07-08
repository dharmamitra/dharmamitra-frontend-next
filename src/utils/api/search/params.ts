import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  CommonSearchParamNames,
  CommonSearchParams,
  Schema,
  SearchEndpoint,
  SearchParamNames,
  SearchTargetLocalParamName,
} from "./types"

// eslint-disable-next-line no-unused-vars
type ExcludeStreams<T> = T extends `${infer _}stream${infer _}` ? T : never

type Targets = Exclude<SearchEndpoint, ExcludeStreams<SearchEndpoint>>

export type SearchTarget = Targets & keyof Messages["search"]["targets"]

export const searchTargets: SearchTarget[] = exhaustiveStringTuple<Targets>()(
  "parallel",
  "primary",
  "secondary",
)

export const disabledSearchTargets: SearchTarget[] = ["secondary"]

export type SearchType = CommonSearchParams["search_type"] &
  keyof Messages["search"]["commonParams"]["searchTypes"]

export const searchTypes: SearchType[] = exhaustiveStringTuple<
  CommonSearchParams["search_type"]
>()("regular", "semantic")

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

export const searchParamsNames: SearchParamNames &
  CommonSearchParamNames &
  SearchTargetLocalParamName = {
  target: "search_target",
  common: {
    search_input: "search_input",
    input_encoding: "input_encoding",
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
