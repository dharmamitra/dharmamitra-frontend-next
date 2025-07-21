import React from "react"

import { SearchApiTypes } from "@/api"

import ParallelExplanation from "./ParallelExplanation"
import ExplanationFrame from "./ResultItemExplanationFrame"
// import { createChatProps } from "@/features/utils"
// import { streamUtils } from "@/api"

export default function ParallelResultItemExplanation({
  parallelRequest,
}: {
  parallelRequest: SearchApiTypes.RequestBody<"/explanation-parallel/">
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  // TODO: pending BE updates
  // const chatPropsWithId = createChatProps({
  //   id: JSON.stringify(parallelRequest),
  //   localEndpoint: streamUtils.localAPIEndpoints["explanation-parallel"],
  //   requestBody: parallelRequest,
  //   initialInput: parallelRequest.query,
  // })

  return (
    <ExplanationFrame setIsExpanded={setIsExpanded} handleSubmit={() => {}}>
      <ParallelExplanation isExpanded={isExpanded} request={parallelRequest} />
    </ExplanationFrame>
  )
}
