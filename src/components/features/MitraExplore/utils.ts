import { SearchApiTypes } from "@/api"
import { SupportedLocale } from "@/app/types"
import { allSearchDefaultParams } from "@/utils/api/search/params"
import { ChatPropsWithId } from "@/utils/api/stream"

type ExploreRequestBody = SearchApiTypes.Schema["SearchRequest"] & {
  locale: SupportedLocale
}

type ExploreRequestBodyParams = Partial<ExploreRequestBody> &
  Pick<ExploreRequestBody, "search_input" | "locale">

export type ExploreChatPropsWithId = ChatPropsWithId<ExploreRequestBody>

export function createExploreRequestBody(params: ExploreRequestBodyParams) {
  const body: ExploreRequestBody = { ...allSearchDefaultParams, ...params }
  return body
}
