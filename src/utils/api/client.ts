import createClient from "openapi-fetch"

import type { paths } from "@/lib/api/v1.d"

const baseUrl = process.env.NEXT_PUBLIC_DM_API_BASE_URL

const { GET, POST } = createClient<paths>({
  baseUrl,
})

const apiClient = {
  GET,
  POST,
}

export default apiClient
