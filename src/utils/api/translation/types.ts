import type { components, paths } from "@/lib/api/translation.v1.d"
import type {
  APIRequestBody,
  APIResponse,
  CommonProperties,
  UniqueProperties,
} from "@/utils/api/helpers"

export type Schema = components["schemas"]

/**
 * REQUEST & RESPONSE MODELS
 */

// /translation/ TO BE REPLACED WITH current "/translation-exp/"

// TODO: coordinate renaming to "translation" once env setup has been deployed
export type TranslationRequestBody = APIRequestBody<
  paths["/translation-exp/"]["post"]
>
export type TranslationRresponse = APIResponse<
  // stream response
  paths["/translation-exp/"]["post"]
>

export type TaggingRequestBody = APIRequestBody<paths["/tagging/"]["post"]>
export type TaggingResponse = APIResponse<paths["/tagging/"]["post"]>

/**
 *  PARAMS
 */

export type CommonTranslationParams = CommonProperties<
  [TranslationRequestBody, TaggingRequestBody]
>

export type UniqueTranslationEndpointParams = UniqueProperties<
  [CommonTranslationParams, TranslationRequestBody]
>

export type UniqueTaggingParams = UniqueProperties<
  [CommonTranslationParams, TaggingRequestBody]
>

export type AllTranslationParams = CommonTranslationParams &
  UniqueTranslationEndpointParams &
  UniqueTaggingParams

export type CommonTranslationParamsNames = {
  [K in keyof CommonTranslationParams]: K
}

export type UniqueTranslationEndpointParamsNames = {
  [K in keyof TranslationRequestBody]: K
}

export type UniqueTaggingParamsNames = {
  [K in keyof TaggingRequestBody]: K
}

export type TranslationParamNames = {
  common: CommonTranslationParamsNames
  translation: UniqueTranslationEndpointParamsNames
  tagging: UniqueTaggingParamsNames
}

export type TranslationParamDefaults = Omit<
  Record<keyof AllTranslationParams, string | boolean | undefined>,
  "input_sentence"
>
