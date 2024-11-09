import React from "react"

import { SearchApiTypes, streamUtils } from "@/api"
import { createChatProps } from "@/features/utils"

import PrimaryExplanationStream from "./PrimaryExplanationStream"
import ExplanationFrame from "./ResultItemExplanationFrame"

export type ResultItemExplanationProps = {
  primaryRequest?: SearchApiTypes.RequestBody<"/explanation/">
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
  isRendered: boolean
}

export default function PrimaryResultItemExplanation({
  primaryRequest,
}: {
  primaryRequest: SearchApiTypes.RequestBody<"/explanation/">
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const chatPropsWithId = createChatProps({
    id: JSON.stringify(primaryRequest),
    localEndpoint: streamUtils.paths["explanation-primary"],
    requestBody: primaryRequest,
    initialInput: primaryRequest.query,
  })

  return (
    <ExplanationFrame setIsExpanded={setIsExpanded} sx={{ pb: 1 }}>
      <PrimaryExplanationStream
        isExpanded={isExpanded}
        chatPropsWithId={chatPropsWithId}
      />
    </ExplanationFrame>
  )
}
