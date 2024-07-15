import type { components, paths } from "@/lib/api/search.v1.d"
import { APIGlobalParams, GlobalParamNames } from "@/utils/api/global/types"
import type {
  APIRequestBody,
  APIResponse,
  CommonProperties,
  UniqueProperties,
} from "@/utils/api/helpers"

export type Schema = components["schemas"]

// /**
//  * REQUEST & RESPONSE MODELS
//  */

export type ParallelRequestBody = APIRequestBody<paths["/parallel/"]["post"]>
export type ParallelRresponse = APIResponse<paths["/parallel/"]["post"]>

export type PrimaryRequestBody = APIRequestBody<paths["/primary/"]["post"]>
export type PrimaryRresponse = APIResponse<paths["/primary/"]["post"]>

export type SecondaryRequestBody = APIRequestBody<paths["/secondary/"]["post"]>
export type SecondaryRresponse = APIResponse<paths["/secondary/"]["post"]>

/**
 *  API ENDPPOINTS & AUXILIARY PARAMS
 */

type Endpoint = keyof paths
export type SearchEndpoint = Endpoint extends `/${infer Key}/` ? Key : never

export type SourceLanguage = Exclude<Schema["FilterLanguage"], "all">

// Local only (not set in request body)

// eslint-disable-next-line no-unused-vars
type ExcludeStreams<T> = T extends `${infer _}stream${infer _}` ? T : never

export type SearchTargets = Exclude<
  SearchEndpoint,
  ExcludeStreams<SearchEndpoint>
>

export type SearchTarget = SearchTargets & keyof Messages["search"]["targets"]

/**
 *  PARAMS
 */

export type CommonSearchParams = CommonProperties<
  [ParallelRequestBody, PrimaryRequestBody, SecondaryRequestBody]
>

export type ConstrainedCommonSearchParams = UniqueProperties<
  [APIGlobalParams, CommonSearchParams]
>

export type UniqueParallelParams = UniqueProperties<
  [CommonSearchParams, ParallelRequestBody]
>

export type UniquePrimaryParams = UniqueProperties<
  [CommonSearchParams, PrimaryRequestBody]
>

export type UniqueSecondaryParams = UniqueProperties<
  [CommonSearchParams, SecondaryRequestBody]
>

export type AllSearchParams = CommonSearchParams &
  UniqueParallelParams &
  UniquePrimaryParams &
  UniqueSecondaryParams

export type CommonSearchParamNames = {
  [K in keyof ConstrainedCommonSearchParams]: K
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
    Record<keyof ParallelRequestBody, string | undefined>,
    "search_input"
  > &
    LocalParams
  primary: Omit<
    Record<keyof PrimaryRequestBody, string | undefined>,
    "search_input"
  > &
    LocalParams
  secondary: Omit<
    Record<keyof SecondaryRequestBody, string | undefined>,
    "search_input"
  > &
    LocalParams
}

export type AllSearchParamDefaults = Omit<
  Record<keyof AllSearchParams, string | undefined>,
  "search_input"
> &
  LocalParams
