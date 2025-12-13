import * as globalParams from "./global/params"
import * as GlobalParamTypes from "./global/types"
import { getDbSourceMenuData } from "./nexus/menudata"
import { getOCRDataCall } from "./search/endpoints/ocr/call"
import { getSearchPrimaryData } from "./search/endpoints/primary"
import { getSearchPrimaryExplanation } from "./search/endpoints/primary-explanation/actions"
import * as SearchApiTypes from "./search/types"
import { getAvailableModelsData } from "./translation/endpoints/available-models"
import { getTaggingData } from "./translation/endpoints/tagging"
import * as TranslationApiTypes from "./translation/types"
import * as streamUtils from "./stream"

const baseSearchApiUrl = process.env.NEXT_PUBLIC_DM_SEARCH_API_BASE_URL

const DMFetchApi = {
  translationModels: {
    makeQueryKey: () => ["translationModels"],
    call: getAvailableModelsData,
  },
  tagging: {
    makeQueryKey: (body: TranslationApiTypes.RequestBody<"/tagging/">) => [
      "tagging",
      JSON.stringify(body),
    ],
    call: getTaggingData,
  },
  dbSourceMenuData: {
    makeQueryKey: (sourceLanguage: string) => ["dbMenuSourceTexts", sourceLanguage],
    call: getDbSourceMenuData,
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
  ocr: {
    makeQueryKey: (file: File) => ["ocr", file.name],
    call: getOCRDataCall,
  },
}

export {
  baseSearchApiUrl,
  DMFetchApi,
  globalParams,
  GlobalParamTypes,
  SearchApiTypes,
  streamUtils,
  TranslationApiTypes,
}
