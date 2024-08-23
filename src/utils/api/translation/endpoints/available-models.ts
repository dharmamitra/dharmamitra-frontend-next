import apiClients from "@/utils/api/client"

export const getAvailableModelsData = async () => {
  const { data, error, response } =
    await apiClients.Translation.GET(`/available-models/`)

  if (error) {
    throw { error, response }
  }

  return data ? data.models : []
}
