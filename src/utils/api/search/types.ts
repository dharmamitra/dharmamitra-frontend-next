import type { components, paths } from "@/lib/api/search"
import type { APIRequestBody, APIResponse } from "@/utils/api/helpers"

export type Schema = components["schemas"]
export type SearchEndpoint = keyof paths
export type SearchEndpointName = SearchEndpoint extends `/${infer Key}/`
  ? Key
  : never

export type SourceLanguage = Exclude<Schema["FilterLanguage"], "all" | "aa">

/**
 * REQUEST & RESPONSE GENERICS
 */

export type RequestBody<Endpoint extends keyof paths> = APIRequestBody<
  paths[Endpoint]["post"]
>

export type Response<Endpoint extends keyof paths> = APIResponse<
  paths[Endpoint]["post"]
>

/**
 *  LOCAL PARAMS
 *  (not set in request body)
 *
 */

// type ExcludeStreams<T> = T extends `${infer _}stream${infer _}` ? T : never

export type SearchTargets = Extract<
  SearchEndpointName,
  "primary" | "parallel"
  // | "secondary" // TODO: awaiting BE implementation
>

export type SearchTarget = SearchTargets & keyof Messages["search"]["targets"]

/**
 *  REQUEST PROPS
 */

export type AllSearchApiParams = RequestBody<"/primary/"> &
  RequestBody<"/parallel/">
// RequestBody<"/secondary/">

type AssertAllKeys<T> = {
  [K in keyof T]-?: K
}

type AllSearchApiParamsParamNames = AssertAllKeys<AllSearchApiParams>

export type SearchParamNames = {
  local: {
    search_target: "search_target"
  }
  api: AllSearchApiParamsParamNames
}

export type LocalParams = {
  search_target: SearchTarget
}

export type AllSearchParams = AllSearchApiParams & LocalParams

export type AllSearchParamDefaults = Omit<AllSearchParams, "search_input"> &
  LocalParams
