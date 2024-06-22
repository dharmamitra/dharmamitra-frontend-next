import type { components, paths } from "@/lib/api/v1.d"

export type Schema = components["schemas"]

/**
 * HELPERS
 */

export type APIRequestBody<operation> = "requestBody" extends keyof operation
  ? "content" extends keyof operation["requestBody"]
    ? "application/json" extends keyof operation["requestBody"]["content"]
      ? operation["requestBody"]["content"]["application/json"]
      : never
    : never
  : never

export type APIRequestParams<operation> = "parameters" extends keyof operation
  ? "query" extends keyof operation["parameters"]
    ? operation["parameters"]["query"]
    : never
  : never

export type APIResponse<operation> = "responses" extends keyof operation
  ? 200 extends keyof operation["responses"]
    ? "content" extends keyof operation["responses"][200]
      ? "application/json" extends keyof operation["responses"][200]["content"]
        ? operation["responses"][200]["content"]["application/json"]
        : never
      : never
    : never
  : never

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

export type SearchRequestBody = APIRequestBody<paths["/search/"]["post"]>
export type SearchRresponse = APIResponse<
  // stream response
  paths["/search/"]["post"]
>

/**
 *  API PARAMS NAMES
 */
export type ParamNames = {
  search: Record<keyof SearchRequestBody, keyof SearchRequestBody>
  translation: Record<
    keyof TranslationRequestBody,
    keyof TranslationRequestBody
  >
  tagging: Record<keyof TaggingRequestBody, keyof TaggingRequestBody>
}

type CommonProperties<T, U> = {
  [K in keyof T & keyof U]: T[K] | U[K]
}

export type CommonStreamParams = {
  commonStreamParams: CommonProperties<
    ParamNames["search"],
    ParamNames["translation"]
  >
}

/**
 *
 */

type Encoding = keyof Messages["commonStreamParams"]["encodings"]
type TargetLanguage = keyof Messages["translation"]["targetLanguages"]
export type CustomSelectOption = Encoding | TargetLanguage
