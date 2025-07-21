import React from "react"
import { useLocale } from "next-intl"

import { SearchApiTypes, streamUtils } from "@/api"
import { createChatProps } from "@/components/features/utils"

import PrimaryExplanationStream from "./PrimaryExplanationStream"
import ExplanationFrame from "./ResultItemExplanationFrame"

export type ResultItemExplanationProps = {
  primarySearchResult?: SearchApiTypes.Response<"/primary/">["results"][0]
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
  isRendered: boolean
}

export default function PrimaryResultItemExplanation({
  primarySearchResult,
}: {
  primarySearchResult: SearchApiTypes.Response<"/primary/">["results"][0]
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const locale = useLocale()

  const chatPropsWithId = createChatProps({
    id: JSON.stringify(primarySearchResult),
    localEndpoint: streamUtils.localAPIEndpoints["explanation-primary"],
    requestBody: { ...primarySearchResult, locale },
    initialInput: primarySearchResult.query,
  })

  return (
    <ExplanationFrame setIsExpanded={setIsExpanded} sx={{ pb: 1 }}>
      <PrimaryExplanationStream isExpanded={isExpanded} chatPropsWithId={chatPropsWithId} />
    </ExplanationFrame>
  )
}
