import type { components, paths } from "@/lib/api/search.v1.d"
import { APIGlobalParams, GlobalParamNames } from "@/utils/api/global/types"
import type {
  APIRequestBody,
  APIResponse,
  CommonProperties,
  UniqueProperties,
} from "@/utils/api/helpers"

export type Schema = components["schemas"]
export type SearchEndpoint = keyof paths
export type SearchEndpointName = SearchEndpoint extends `/${infer Key}/`
  ? Key
  : never

export type SourceLanguage = Exclude<Schema["FilterLanguage"], "all">

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

// eslint-disable-next-line no-unused-vars
type ExcludeStreams<T> = T extends `${infer _}stream${infer _}` ? T : never

export type SearchTargets = Exclude<
  SearchEndpointName,
  | ExcludeStreams<SearchEndpointName>
  | "summary"
  | "explanation"
  | "explanation-parallel"
>

export type SearchTarget = SearchTargets & keyof Messages["search"]["targets"]

/**
 *  REQUEST PROPS
 */

export type CommonSearchRequestProps = CommonProperties<
  [
    RequestBody<"/parallel/">,
    RequestBody<"/primary/">,
    RequestBody<"/secondary/">,
  ]
>

export type ConstrainedCommonSearchRequestProps = UniqueProperties<
  [APIGlobalParams, CommonSearchRequestProps]
>

export type UniqueParallelParams = UniqueProperties<
  [CommonSearchRequestProps, RequestBody<"/parallel/">]
>

export type UniquePrimaryParams = UniqueProperties<
  [CommonSearchRequestProps, RequestBody<"/primary/">]
>

export type UniqueSecondaryParams = UniqueProperties<
  [CommonSearchRequestProps, RequestBody<"/secondary/">]
>

export type AllSearchParams = CommonSearchRequestProps &
  UniqueParallelParams &
  UniquePrimaryParams &
  UniqueSecondaryParams

export type CommonSearchParamNames = {
  [K in keyof ConstrainedCommonSearchRequestProps]: K
}

type UniqueParallelParamNames = {
  [K in keyof UniqueParallelParams]: K
}

type UniquePrimaryParamNames = {
  [K in keyof UniquePrimaryParams]: K
}

type UniqueSecondaryParamNames = {
  [K in keyof UniqueSecondaryParams]: K
}

export type SearchParamNames = {
  global: GlobalParamNames
  common: CommonSearchParamNames
  parallel: UniqueParallelParamNames
  primary: UniquePrimaryParamNames
  secondary: UniqueSecondaryParamNames
}

export type LocalParams = {
  search_target: SearchTarget
}

export type SearchTargetParamDefaults = {
  parallel: Omit<
    Record<keyof RequestBody<"/parallel/">, string | undefined>,
    "search_input"
  > &
    LocalParams
  primary: Omit<
    Record<keyof RequestBody<"/primary/">, string | undefined>,
    "search_input"
  > &
    LocalParams
  secondary: Omit<
    Record<keyof RequestBody<"/secondary/">, string | undefined>,
    "search_input"
  > &
    LocalParams
}

export type AllSearchParamDefaults = Omit<
  Record<keyof AllSearchParams, string | undefined>,
  "search_input"
> &
  LocalParams
