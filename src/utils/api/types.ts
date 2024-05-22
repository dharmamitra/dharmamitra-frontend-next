import type { components, operations } from "@/lib/api/v1.d"

type Schema = components["schemas"]

type RequestBody<OperationName extends keyof operations> =
  operations[OperationName]["requestBody"]["content"]["application/json"]

type Response<OperationName extends keyof operations> =
  200 extends keyof operations[OperationName]["responses"]
    ? operations[OperationName]["responses"][200]["content"]["application/json"]
    : never

/**
 * REQUEST PROPS &  APIRESPONSE MODELS
 */

// ENDPOINT: /translation/
// TO BE REPLACED WITH current "/translation-exp/"

// ENDPOINT: /translation-exp/
// TODO: coordinate renaming to "translation" once env setup has been deployed
export type TranslationRequestBody =
  RequestBody<"translation_translation_exp__post">
// stream response
export type TranslationRresponse = Response<"search_endpoint_search__post">

// ENDPOINT: /tagging/
export type TaggingRequestBody = RequestBody<"tagging_tagging__post">
export type TaggingResponse = RequestBody<"tagging_tagging__post">

// ENDPOINT: /search/
export type SearchRequestBody = RequestBody<"search_endpoint_search__post">
// stream response
export type SearchRresponse = Response<"search_endpoint_search__post">

/**
 * SEARCH PARAM OPTIONS
 */

export type FilterLanguage = Schema["FilterLanguage"]
export type FilterPrimary = Schema["FilterPrimary"]
export type FilterSecondary = Schema["FilterSecondary"]
export type InputEncoding = Schema["InputEncoding"]
export type TranslationModel = Schema["TranslationModel"]
export type PostProcessModel = Schema["PostProcessModel"]
export type SearchInput = Schema["SearchInput"]
export type SearchTarget = Schema["SearchTarget"]
export type SearchType = Schema["SearchType"]
export type TargetLanguage = Schema["TargetLanguageExperimental"]

/**
 *  APIPARAMS
 */
export type APIParamNames = {
  search: Record<keyof SearchRequestBody, keyof SearchRequestBody>
  translation: Record<
    keyof TranslationRequestBody,
    keyof TranslationRequestBody
  >
  tagging: Record<keyof TaggingRequestBody, keyof TaggingRequestBody>
}
