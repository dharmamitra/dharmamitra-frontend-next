import { searchInputId } from "./SearchInput"

import { SearchApiTypes } from "@/api"
import { allSearchDefaultParams } from "@/utils/api/search/params"

export function createPrimarySearchRequestBody(
  params: Partial<SearchApiTypes.RequestBody<"/primary/">>,
) {
  return { ...allSearchDefaultParams, ...params }
}

export function createParallelSearchRequestBody(
  params: Partial<SearchApiTypes.RequestBody<"/parallel/">>,
) {
  return { ...allSearchDefaultParams, ...params }
}

export function handleSearchKeyPress(event: KeyboardEvent, triggerFn: () => void) {
  const { key, ctrlKey, shiftKey } = event

  if (key === "Enter" && !ctrlKey && !shiftKey) {
    const input = document.getElementById(searchInputId)

    if (!input || !(input instanceof HTMLTextAreaElement) || !input.value) return

    if (input === document.activeElement || document.activeElement?.tagName === "BODY") {
      triggerFn()
    }
  }
}

export const MAX_PRIMARY_RESULTS = 50
