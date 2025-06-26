import createClient from "openapi-fetch"

import type { paths as BNv2Paths } from "@/lib/api/bn"
import type { paths as SearchPaths } from "@/lib/api/search"
import type { paths as TranslationPaths } from "@/lib/api/translation"

export const defaultTimeout = 20000

export const translationBaseUrl = process.env.NEXT_PUBLIC_DM_TRANSLATION_API_BASE_URL
export const searchBaseUrl = process.env.NEXT_PUBLIC_DM_SEARCH_API_BASE_URL
/**
 * Temporary API Client to enable file menu dev
 * TODO: remove when api is ready
 */
const BNv2BaseUrl = process.env.NEXT_PUBLIC_BN_V2_API_BASE_URL

const { GET: GETTrasnslation, POST: POSTTranslation } = createClient<TranslationPaths>({
  baseUrl: translationBaseUrl,
})

const { GET: BNv2GET, POST: BNv2POST } = createClient<BNv2Paths>({
  baseUrl: BNv2BaseUrl,
})

const { GET: GETSearch, POST: POSTSearch } = createClient<SearchPaths>({
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

export const BNv2Client = {
  GET: BNv2GET,
  POST: BNv2POST,
}

export const apiClients = {
  Translation: translationApiClient,
  Search: searchApiClient,
  BNv2: BNv2Client,
}

export default apiClients
