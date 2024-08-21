import type { components, paths } from "@/lib/api/translation.v1.d"
import { APIGlobalParams, GlobalParamNames } from "@/utils/api/global/types"
import type {
  APIRequestBody,
  APIRequestParams,
  APIResponse,
  CommonProperties,
  FilterGetEndpoints,
  FilterPostEndpoints,
  UniqueProperties,
} from "@/utils/api/helpers"

export type Schema = components["schemas"]
export type TranslationEndpoint = keyof paths
export type TranslationPostEndpoint = FilterPostEndpoints<paths>
export type TranslationGetEndpoint = FilterGetEndpoints<paths>

/**
 * REQUEST & RESPONSE MODELS
 */

export type RequestBody<Endpoint extends TranslationPostEndpoint> =
  APIRequestBody<paths[Endpoint]["post"]>

export type PostResponse<Endpoint extends TranslationPostEndpoint> =
  APIResponse<paths[Endpoint]["post"]>

export type RequestParams<Endpoint extends TranslationGetEndpoint> =
  APIRequestParams<paths[Endpoint]["get"]>

export type GetResponse<Endpoint extends TranslationGetEndpoint> = APIResponse<
  paths[Endpoint]["get"]
>

/**
 *  REQUEST PROPS
 */

export type CommonTranslationParams = CommonProperties<
  [RequestBody<"/translation/">, RequestBody<"/tagging/">]
>

export type ConstrainedCommonTranslationParams = UniqueProperties<
  [APIGlobalParams, CommonTranslationParams]
>

export type UniqueTranslationEndpointParams = UniqueProperties<
  [CommonTranslationParams, RequestBody<"/translation/">]
>

export type UniqueTaggingParams = UniqueProperties<
  [CommonTranslationParams, RequestBody<"/tagging/">]
>

export type AllTranslationParams = CommonTranslationParams &
  UniqueTranslationEndpointParams &
  UniqueTaggingParams

export type CommonTranslationParamsNames = {
  [K in keyof ConstrainedCommonTranslationParams]: K
}

export type UniqueTranslationEndpointParamsNames = {
  [K in keyof RequestBody<"/translation/">]: K
}

export type UniqueTaggingParamsNames = {
  [K in keyof RequestBody<"/tagging/">]: K
}

export type TranslationParamNames = {
  global: GlobalParamNames
  common: CommonTranslationParamsNames
  translation: UniqueTranslationEndpointParamsNames
  tagging: UniqueTaggingParamsNames
}

export type TranslationParamDefaults = Omit<
  Record<keyof AllTranslationParams, string | boolean | undefined>,
  "input_sentence"
>
