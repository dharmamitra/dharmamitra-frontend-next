import type { components, paths } from "@/lib/api/search.v1.d"
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

// TODO: update when fixed on backend
type TempParallelRequestFix = {
  filter_target_language: Schema["FilterLanguage"] | undefined
}

export type ParallelRequestBody = APIRequestBody<paths["/parallel/"]["post"]> &
  TempParallelRequestFix
export type ParallelRresponse = APIResponse<paths["/parallel/"]["post"]> &
  TempParallelRequestFix

export type PrimaryRequestBody = APIRequestBody<paths["/primary/"]["post"]>
export type PrimaryRresponse = APIResponse<paths["/primary/"]["post"]>

export type SecondaryRequestBody = APIRequestBody<paths["/secondary/"]["post"]>
export type SecondaryRresponse = APIResponse<paths["/secondary/"]["post"]>

// /**
//  *  API ENDPPOINTS & PARAMS NAMES
//  */

export type SearchLimits = Schema["Limits"]

type Endpoint = keyof paths
export type SearchEndpoint = Endpoint extends `/${infer Key}/` ? Key : never

export type CommonSearchParams = CommonProperties<
  [ParallelRequestBody, PrimaryRequestBody, SecondaryRequestBody]
>
// export type SearchParamsCommonToAll = PropertiesCommonToAll<
//   [ParallelRequestBody, PrimaryRequestBody, SecondaryRequestBody]
// >
// export type CommonSearchParams = CommonProperties<
//   [ParallelRequestBody, PrimaryRequestBody, SecondaryRequestBody]
// >

export type UniqueParallelParams = UniqueProperties<
  [CommonSearchParams, ParallelRequestBody]
>

export type UniquePrimaryParams = UniqueProperties<
  [CommonSearchParams, PrimaryRequestBody]
>

export type UniqueSecondaryParams = UniqueProperties<
  [CommonSearchParams, SecondaryRequestBody]
>

export type CommonSearchParamNames = {
  common: Record<keyof CommonSearchParams, keyof CommonSearchParams>
}

type UniqueParallelParamNames = Record<
  keyof UniqueParallelParams,
  keyof UniqueParallelParams
>

type UniquePrimaryParamNames = Record<
  keyof UniquePrimaryParams,
  keyof UniquePrimaryParams
>

type UniqueSecondaryParamNames = Record<
  keyof UniqueSecondaryParams,
  keyof UniqueSecondaryParams
>

export type SearchParamNames = {
  parallel: UniqueParallelParamNames
  primary: UniquePrimaryParamNames
  secondary: UniqueSecondaryParamNames
}

export type SearchTargetLocalParamName = {
  target: "search_target"
}
