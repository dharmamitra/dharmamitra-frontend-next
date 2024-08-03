import type { components, paths } from "@/lib/api/translation.v1.d"
import { APIGlobalParams, GlobalParamNames } from "@/utils/api/global/types"
import type {
  APIRequestBody,
  APIResponse,
  CommonProperties,
  UniqueProperties,
} from "@/utils/api/helpers"

export type Schema = components["schemas"]
export type TranslationEndpoint = keyof paths

/**
 * REQUEST & RESPONSE MODELS
 */

export type RequestBody<Endpoint extends keyof paths> = APIRequestBody<
  paths[Endpoint]["post"]
>

export type Response<Endpoint extends keyof paths> = APIResponse<
  paths[Endpoint]["post"]
>

// TODO: coordinate renaming current "/translation-exp/" with `/translation/

/**
 *  REQUEST PROPS
 */

export type CommonTranslationParams = CommonProperties<
  [RequestBody<"/translation-exp/">, RequestBody<"/tagging/">]
>

export type ConstrainedCommonTranslationParams = UniqueProperties<
  [APIGlobalParams, CommonTranslationParams]
>

export type UniqueTranslationEndpointParams = UniqueProperties<
  [CommonTranslationParams, RequestBody<"/translation-exp/">]
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
  [K in keyof RequestBody<"/translation-exp/">]: K
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
