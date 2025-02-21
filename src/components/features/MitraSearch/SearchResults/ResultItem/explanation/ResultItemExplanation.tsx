import React from "react"

import { SearchApiTypes } from "@/api"

import ParallelResultItemExplanation from "./ParallelResultItemExplanation"
import PrimaryResultItemExplanation from "./PrimaryResultItemExplanation"

export type ResultItemExplanationProps = {
  primaryRequest?: SearchApiTypes.RequestBody<"/explanation/">
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
  isRendered?: boolean
}

export default function ResultItemExplanationRenderer({
  primaryRequest,
  parallelRequest,
  isRendered = true,
}: ResultItemExplanationProps) {
  if (!isRendered) return null

  if (primaryRequest) {
    return <PrimaryResultItemExplanation primaryRequest={primaryRequest} />
  }

  if (parallelRequest) {
    return <ParallelResultItemExplanation parallelRequest={parallelRequest} />
  }

  return null
}
