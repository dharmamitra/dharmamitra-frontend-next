import { getTaggingData } from "./endpoints/tagging"
import * as DMApiTypes from "./types"

const streamPaths = {
  translation: "/api/translation-stream",
  search: "/api/search-stream",
}

const DMFetchApi = {
  tagging: {
    makeQueryKey: (body: DMApiTypes.TaggingRequestBody) => [
      "tagging",
      JSON.stringify(body),
    ],
    call: getTaggingData,
  },
}

export { DMApiTypes, DMFetchApi, streamPaths }
