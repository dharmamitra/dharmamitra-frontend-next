import { getTaggingData } from "./endpoints/tagging"
import { getTextFileMenuData } from "./endpoints/menus/files"
import { getCategoryMenuData } from "./endpoints/menus/category"
import * as streamUtils from "./stream"
import * as DMApiTypes from "./types"

const DMFetchApi = {
  tagging: {
    makeQueryKey: (body: DMApiTypes.TaggingRequestBody) => [
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

export { DMApiTypes, DMFetchApi, streamUtils }
