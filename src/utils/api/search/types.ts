import type { components, paths } from "@/lib/api/search.v1.d"
import type {
  APIRequestBody,
  APIResponse,
  CommonProperties,
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

// TODO: Model name should be fixed on backend `FilterPrimary` > `Limits
export type SearchLimits = Schema["FilterPrimary"]

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

export type SearchParamNames = {
  parallel: Record<keyof ParallelRequestBody, keyof ParallelRequestBody>
  primary: Record<keyof PrimaryRequestBody, keyof PrimaryRequestBody>
  secondary: Record<keyof SecondaryRequestBody, keyof SecondaryRequestBody>
}

export type CommonSearchParamNames = {
  common: Record<keyof CommonSearchParams, keyof CommonSearchParams>
}

export type SearchTargetLocalParamName = {
  target: "search_target"
}
