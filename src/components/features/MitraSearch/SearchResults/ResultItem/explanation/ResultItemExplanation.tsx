import React from "react"

import { SearchApiTypes } from "@/api"

import ParallelResultItemExplanation from "./ParallelResultItemExplanation"
import PrimaryResultItemExplanation from "./PrimaryResultItemExplanation"

export type ResultItemExplanationProps = {
  primarySearchResult?: SearchApiTypes.Response<"/primary/">["results"][0]
  // parallelRequest?: SearchApiTypes.Response<"/explanation-parallel/">
  isRendered?: boolean
}

/**
 * @todo:
 * - Add parallel explanation support when available from BE
 * - Clean up related code both up and down the component tree
 */
export default function ResultItemExplanation({
  primarySearchResult,
  // parallelRequest,
  isRendered = true,
}: ResultItemExplanationProps) {
  if (!isRendered) return null

  if (primarySearchResult) {
    return <PrimaryResultItemExplanation primarySearchResult={primarySearchResult} />
  }

  // if (parallelRequest) {
  //   return <ParallelResultItemExplanation parallelRequest={parallelRequest} />
  // }

  return null
}
