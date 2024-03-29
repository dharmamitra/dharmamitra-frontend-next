import createClient from "openapi-fetch"

import type { paths } from "@/lib/api/v1.d"

const { GET, POST } = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
})

const apiClient = {
  GET,
  POST,
}

export default apiClient
