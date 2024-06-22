import createClient from "openapi-fetch"

import type { paths } from "@/lib/api/v1.d"
import type { paths as tempBNv2Paths } from "@/lib/api/bnv2"

const baseUrl = process.env.NEXT_PUBLIC_DM_API_BASE_URL

const { GET, POST } = createClient<paths>({
  baseUrl,
})

const apiClient = {
  GET,
  POST,
}

/**
 * Temporary API Client to enable file menu dev
 * TODO: remove when api is ready
 */
const tempBNv2BaseUrl = process.env.NEXT_PUBLIC_BN_TEMP_API_BASE_URL

const { GET: tempBNv2GET, POST: tempBNv2POST } = createClient<tempBNv2Paths>({
  baseUrl: tempBNv2BaseUrl,
})

export const tempBNv2Client = {
  GET: tempBNv2GET,
  POST: tempBNv2POST,
}

export default apiClient
