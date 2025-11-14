import React from "react"
import { useLocale } from "next-intl"
import { useChat } from "@ai-sdk/react"

import { SearchApiTypes } from "@/api"
import { createChatProps, LOCAL_API_ENDPOINTS } from "@/utils/api/stream"

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

  const chatPropsWithId = React.useMemo(() => {
    return createChatProps({
      id: JSON.stringify(primarySearchResult),
      localEndpoint: LOCAL_API_ENDPOINTS["explanation-primary"],
      requestBody: { ...primarySearchResult, locale },
      initialInput: primarySearchResult.query,
    })
  }, [primarySearchResult, locale])

  const { handleSubmit } = useChat(chatPropsWithId)

  return (
    <ExplanationFrame setIsExpanded={setIsExpanded} handleSubmit={handleSubmit} sx={{ pb: 1 }}>
      {isExpanded ? <PrimaryExplanationStream chatPropsWithId={chatPropsWithId} /> : null}
    </ExplanationFrame>
  )
}
