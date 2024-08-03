import * as globalParams from "./global/params"
import * as GlobalParamTypes from "./global/types"
import { getCategoryMenuData } from "./search/endpoints/menus/category"
import { getTextFileMenuData } from "./search/endpoints/menus/files"
import { getSearchParallelData } from "./search/endpoints/parallel"
import { getSearchPrimaryData } from "./search/endpoints/primary"
import { getSearchPrimaryExplanation } from "./search/endpoints/primary-explanation/actions"
import * as SearchApiTypes from "./search/types"
import * as streamUtils from "./stream"
import { getTaggingData } from "./translation/endpoints/tagging"
import * as TranslationApiTypes from "./translation/types"

const DMFetchApi = {
  tagging: {
    makeQueryKey: (body: TranslationApiTypes.RequestBody<"/tagging/">) => [
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
  searchParallel: {
    makeQueryKey: (body: SearchApiTypes.RequestBody<"/parallel/">) => [
      "searchParallel",
      JSON.stringify(body),
    ],
    call: getSearchParallelData,
  },
  searchPrimary: {
    makeQueryKey: (body: SearchApiTypes.RequestBody<"/primary/">) => [
      "searchPrimary",
      JSON.stringify(body),
    ],
    call: getSearchPrimaryData,
  },
  searchPrimaryExplanation: {
    makeQueryKey: (body: SearchApiTypes.RequestBody<"/explanation/">) => [
      "searchPrimaryExplanation",
      JSON.stringify(body),
    ],
    call: getSearchPrimaryExplanation,
  },
}

export {
  DMFetchApi,
  globalParams,
  GlobalParamTypes,
  SearchApiTypes,
  streamUtils,
  TranslationApiTypes,
}
