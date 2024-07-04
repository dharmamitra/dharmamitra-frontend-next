import * as globalParams from "./global/params"
import { getCategoryMenuData } from "./search/endpoints/menus/category"
import { getTextFileMenuData } from "./search/endpoints/menus/files"
import * as SearchApiTypes from "./search/types"
import * as streamUtils from "./stream"
import { getTaggingData } from "./translation/endpoints/tagging"
import * as TranslationApiTypes from "./translation/types"

const DMFetchApi = {
  tagging: {
    makeQueryKey: (body: TranslationApiTypes.TaggingRequestBody) => [
      "tagging",
      JSON.stringify(body),
    ],
    call: getTaggingData,
  },
  tempMenuSourceTexts: {
    makeQueryKey: (sourceLanguage: string) => [
      "tempMenuSourceTexts",
      JSON.stringify(sourceLanguage),
    ],
    call: getTextFileMenuData,
  },
  tempMenuSourceCategories: {
    makeQueryKey: (sourceLanguage: string) => [
      "tempMenuSourceCategories",
      JSON.stringify(sourceLanguage),
    ],
    call: getCategoryMenuData,
  },
}

export {
  DMFetchApi,
  globalParams,
  SearchApiTypes,
  streamUtils,
  TranslationApiTypes,
}
