import apiClient from "./client"
import * as DMApi from "./types"

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

export { DM_FETCH_API, DMApi }
