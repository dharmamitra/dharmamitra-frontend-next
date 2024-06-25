import { getTaggingData } from "./endpoints/tagging"
import * as DMApiTypes from "./types"

const streamPaths = {
  translation: "/next/api/translation-stream",
  search: "/next/api/search-stream",
}

const streamMarkers = {
  lineBreak: "🔽",
  metaLineStart: "⏮️",
  metaLineEnd: "⏭️",
  warning: "⚠️",
  error: "↯",
} as const

const DMFetchApi = {
  tagging: {
    makeQueryKey: (body: DMApiTypes.TaggingRequestBody) => [
      "tagging",
      JSON.stringify(body),
    ],
    call: getTaggingData,
  },
}

export { DMApiTypes, DMFetchApi, streamMarkers, streamPaths }
