import type { components, paths } from "@/lib/api/search"
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

// eslint-disable-next-line no-unused-vars
// type ExcludeStreams<T> = T extends `${infer _}stream${infer _}` ? T : never

export type SearchTargets = Extract<
  SearchEndpointName,
  "primary" | "parallel"
  // | "secondary" // TODO: awaiting BE implementation
>

export type SearchTarget = SearchTargets & keyof Messages["search"]["targets"]

// TODO: <!-- Source Filter Props have been manually defined, pending API update

export type SourceFilterProps = {
  include_files?: string[]
  include_categories?: string[]
  include_collections?: string[]
}

export type SourceFilters = {
  source_filters?: SourceFilterProps
}
export type InputSourceFilters = {
  input_source_filters?: SourceFilterProps
}

// -->

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

type PrimaryRequestBody = Omit<RequestBody<"/primary/">, "limits"> &
  SourceFilters
type ParallelRequestBody = Omit<RequestBody<"/parallel/">, "source_limits"> &
  SourceFilters

export type UniquePrimaryParams = UniqueProperties<
  [CommonSearchRequestProps, PrimaryRequestBody]
>
export type UniqueParallelParams = UniqueProperties<
  [CommonSearchRequestProps, ParallelRequestBody]
>

// export type UniqueSecondaryParams = UniqueProperties<
//   [CommonSearchRequestProps, RequestBody<"/secondary/">]
// >

export type AllSearchApiParams = CommonSearchRequestProps &
  UniqueParallelParams &
  UniquePrimaryParams &
  SourceFilters // temp
// & UniqueSecondaryParams

export type CommonSearchParamNames = {
  [K in keyof ConstrainedCommonSearchRequestProps]: K
}

type UniqueParallelParamNames = {
  [K in keyof UniqueParallelParams]: K
}

type UniquePrimaryParamNames = {
  [K in keyof UniquePrimaryParams]: K
}

// type UniqueSecondaryParamNames = {
//   [K in keyof UniqueSecondaryParams]: K
// }

export type SearchParamNames = {
  global: GlobalParamNames
  local: {
    search_target: "search_target"
  }
  common: CommonSearchParamNames
  parallel: UniqueParallelParamNames
  primary: UniquePrimaryParamNames
  // secondary: UniqueSecondaryParamNames
}

export type LocalParams = {
  search_target: SearchTarget
}

export type SearchTargetParamDefaults = {
  primary: PrimaryRequestBody & SourceFilters
  parallel: ParallelRequestBody & SourceFilters
  // secondary: { status: "AWAITING BE IMPLEMENTATION" }
}

export type AllSearchParams = AllSearchApiParams & LocalParams

export type AllSearchParamDefaults = Omit<
  Record<keyof AllSearchParams, string | undefined>,
  "search_input" | "limits" | "source_limits"
> &
  LocalParams
