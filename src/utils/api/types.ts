import type { components } from "@/lib/api/v1.d"

/**
 * REQUEST PROPS
 */

// endpoint: /search/
export type SearchRequestProps =
  components["schemas"]["Body_search_endpoint_search__post"]

// endpoint: /translation/
// TODO: Finalize env config handling or use env specific endpoint
export type TranslationRequestProps =
  components["schemas"]["Body_translation_translation_exp__post"]

// endpoint: /translation-exp/
export type TranslationExpRequestProps =
  components["schemas"]["Body_translation_translation_exp__post"]

// endpoint: /translation-exp/
export type TaggingRequestProps =
  components["schemas"]["Body_tagging_tagging__post"]

/**
 * SEARCH PARAM OPTIONS
 */

export type FilterLanguage = components["schemas"]["FilterLanguage"]

export type FilterPrimary = components["schemas"]["FilterPrimary"]

export type FilterSecondary = components["schemas"]["FilterSecondary"]

export type InputEncoding = components["schemas"]["InputEncoding"]

export type TranslationModel = components["schemas"]["TranslationModel"]

export type PostProcessModel = components["schemas"]["PostProcessModel"]

export type SearchInput = components["schemas"]["SearchInput"]

export type SearchTarget = components["schemas"]["SearchTarget"]

export type SearchType = components["schemas"]["SearchType"]

export type TargetLanguage = components["schemas"]["TargetLanguageExperimental"]

/**
 * API PARAMS
 */
export type APIParamNames = {
  search: Record<keyof SearchRequestProps, keyof SearchRequestProps>
  // TODO: coordinate the replacement of `translation` with `translation-exp` (as `translation`)
  //   translation: Record<
  //     keyof TranslationRequestProps,
  //     keyof TranslationRequestProps
  //   >
  translation: Record<
    keyof TranslationExpRequestProps,
    keyof TranslationExpRequestProps
  >
  tagging: Record<keyof TaggingRequestProps, keyof TaggingRequestProps>
}
