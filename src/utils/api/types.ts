import type { components, operations } from "@/lib/api/v1.d"

type APISchema = components["schemas"]

type APIRequestBody<OperationName extends keyof operations> =
  operations[OperationName]["requestBody"]["content"]["application/json"]

type APIResponse<OperationName extends keyof operations> =
  200 extends keyof operations[OperationName]["responses"]
    ? operations[OperationName]["responses"][200]["content"]["application/json"]
    : never

/**
 * REQUEST PROPS & API RESPONSE MODELS
 */

// ENDPOINT: /translation/
// TO BE REPLACED WITH current "/translation-exp/"

// ENDPOINT: /translation-exp/
// TODO: coordinate renaming to "translation" once env setup has been deployed
export type APITranslationRequestBody =
  APIRequestBody<"translation_translation_exp__post">
// stream response
export type APITranslationRresponse =
  APIResponse<"search_endpoint_search__post">

// ENDPOINT: /tagging/
export type APITaggingRequestBody = APIRequestBody<"tagging_tagging__post">
export type APITaggingResponse = APIRequestBody<"tagging_tagging__post">

// ENDPOINT: /search/
export type APISearchRequestBody =
  APIRequestBody<"search_endpoint_search__post">
// stream response
export type APISearchRresponse = APIResponse<"search_endpoint_search__post">

/**
 * SEARCH PARAM OPTIONS
 */

export type FilterLanguage = APISchema["FilterLanguage"]
export type FilterPrimary = APISchema["FilterPrimary"]
export type FilterSecondary = APISchema["FilterSecondary"]
export type InputEncoding = APISchema["InputEncoding"]
export type TranslationModel = APISchema["TranslationModel"]
export type PostProcessModel = APISchema["PostProcessModel"]
export type SearchInput = APISchema["SearchInput"]
export type SearchTarget = APISchema["SearchTarget"]
export type SearchType = APISchema["SearchType"]
export type TargetLanguage = APISchema["TargetLanguageExperimental"]

/**
 * API PARAMS
 */
export type APIParamNames = {
  search: Record<keyof APISearchRequestBody, keyof APISearchRequestBody>
  translation: Record<
    keyof APITranslationRequestBody,
    keyof APITranslationRequestBody
  >
  tagging: Record<keyof APITaggingRequestBody, keyof APITaggingRequestBody>
}
