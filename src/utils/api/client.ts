import createClient from "openapi-fetch"

import type { paths as tempBNv2Paths } from "@/lib/api/bnv2"
import type { paths as searchPaths } from "@/lib/api/search.v1"
import type { paths as translationPaths } from "@/lib/api/translation.v1"

export const defaultTimeout = 15000

const translationBaseUrl = process.env.NEXT_PUBLIC_DM_TRANSLATION_API_BASE_URL
const searchBaseUrl = process.env.NEXT_PUBLIC_DM_SEARCH_API_BASE_URL
/**
 * Temporary API Client to enable file menu dev
 * TODO: remove when api is ready
 */
const tempBNv2BaseUrl = process.env.NEXT_PUBLIC_BN_TEMP_API_BASE_URL

const { GET: GETTrasnslation, POST: POSTTranslation } =
  createClient<translationPaths>({
    baseUrl: translationBaseUrl,
  })

const { GET: tempBNv2GET, POST: tempBNv2POST } = createClient<tempBNv2Paths>({
  baseUrl: tempBNv2BaseUrl,
})

const { GET: GETSearch, POST: POSTSearch } = createClient<searchPaths>({
  baseUrl: searchBaseUrl,
})

export const translationApiClient = {
  GET: GETTrasnslation,
  POST: POSTTranslation,
}

export const searchApiClient = {
  GET: GETSearch,
  POST: POSTSearch,
}

export const tempBNv2Client = {
  GET: tempBNv2GET,
  POST: tempBNv2POST,
}

export const apiClients = {
  Translation: translationApiClient,
  Search: searchApiClient,
  TempBNv2: tempBNv2Client,
}

export default apiClients
