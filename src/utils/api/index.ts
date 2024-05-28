import apiClient from "./client"
import * as DMApi from "./types"

const DMFetchApi = {
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

export { DMApi, DMFetchApi }
