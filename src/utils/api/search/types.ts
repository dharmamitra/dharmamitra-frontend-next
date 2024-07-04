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

export type ParallelRequestBody = APIRequestBody<paths["/parallel/"]["post"]>
export type ParallelRresponse = APIResponse<paths["/parallel/"]["post"]>

export type PrimaryRequestBody = APIRequestBody<paths["/primary/"]["post"]>
export type PrimaryRresponse = APIResponse<paths["/primary/"]["post"]>

export type SecondaryRequestBody = APIRequestBody<paths["/secondary/"]["post"]>
export type SecondaryRresponse = APIResponse<paths["/secondary/"]["post"]>

// /**
//  *  API ENDPPOINTS & PARAMS NAMES
//  */

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

export type SearchTarget = {
  target: "search_target"
}
