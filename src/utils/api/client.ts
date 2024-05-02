import createClient from "openapi-fetch"

import appConfig from "@/config"
import type { paths } from "@/lib/api/v1.d"

const { GET, POST } = createClient<paths>({
  baseUrl: appConfig.apiUrl,
})

const apiClient = {
  GET,
  POST,
}

export default apiClient
