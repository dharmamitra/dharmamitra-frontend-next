import type { components, paths } from "@/lib/api/translation.v1.d"
import { APIRequestBody, APIResponse } from "@/utils/api/helpers"

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
 *  API PARAMS NAMES
 */
export type TranslationParamNames = {
  translation: Record<
    keyof TranslationRequestBody,
    keyof TranslationRequestBody
  >
  tagging: Record<keyof TaggingRequestBody, keyof TaggingRequestBody>
}
