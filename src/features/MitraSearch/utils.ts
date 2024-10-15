import { SearchApiTypes } from "@/api"
import { searchTargetDefaultParams } from "@/utils/api/search/params"

import { searchInputId } from "./SearchInput"

export function createPrimarySearchRequestBody(
  params: Partial<SearchApiTypes.RequestBody<"/primary/">>,
) {
  return { ...searchTargetDefaultParams.primary, ...params }
}

export function createParallelSearchRequestBody(
  params: Partial<SearchApiTypes.RequestBody<"/parallel/">>,
) {
  return { ...searchTargetDefaultParams.parallel, ...params }
}

export function handleSearchKeyPress(
  event: KeyboardEvent,
  triggerFn: () => void,
) {
  const { key, ctrlKey, shiftKey } = event

  if (key === "Enter" && !ctrlKey && !shiftKey) {
    const input = document.getElementById(searchInputId)

    if (!input || !(input instanceof HTMLTextAreaElement) || !input.value)
      return

    if (
      input === document.activeElement ||
      document.activeElement?.tagName === "BODY"
    ) {
      triggerFn()
    }
  }
}
