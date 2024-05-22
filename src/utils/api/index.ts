import * as DMApi from "./types"
import apiClient from "./client"

const DM_FETCH_API = {
  tagging: {
    makeQueryKey: (body: DMApi.TaggingRequestBody) => [
      "tagging",
      JSON.stringify(body),
    ],
    call: async (body: DMApi.TaggingRequestBody) => {
      const { data } = await apiClient.POST(`/tagging/`, {
        body,
      })

      return data
    },
  },
}

export { DMApi, DM_FETCH_API }
