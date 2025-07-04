import createClient from "openapi-fetch"

import type { paths as NexusPaths } from "@/lib/api/nexus"
import type { paths as SearchPaths } from "@/lib/api/search"
import type { paths as TranslationPaths } from "@/lib/api/translation"

export const defaultTimeout = 20000

export const translationBaseUrl = process.env.NEXT_PUBLIC_DM_TRANSLATION_API_BASE_URL
export const searchBaseUrl = process.env.NEXT_PUBLIC_DM_SEARCH_API_BASE_URL
/**
 * Temporary API Client to enable file menu dev
 * TODO: remove when api is ready
 */
const NexusBaseUrl = process.env.NEXT_PUBLIC_DHARAMNEXUS_API_BASE_URL

const { GET: GETTrasnslation, POST: POSTTranslation } = createClient<TranslationPaths>({
  baseUrl: translationBaseUrl,
})

const { GET: GETNexus, POST: POSTNexus } = createClient<NexusPaths>({
  baseUrl: NexusBaseUrl,
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

export const NexusClient = {
  GET: GETNexus,
  POST: POSTNexus,
}

export const apiClients = {
  Translation: translationApiClient,
  Search: searchApiClient,
  Nexus: NexusClient,
}

export default apiClients
