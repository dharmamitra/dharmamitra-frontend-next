import { getTaggingData } from "./endpoints/tagging"
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
}

export { DMApiTypes, DMFetchApi, streamUtils }
