import React from "react"

import { SearchApiTypes } from "@/api"

import ParallelExplanation from "./ParallelExplanation"
import ExplanationFrame from "./ResultItemExplanationFrame"
// import { createChatProps, LOCAL_API_ENDPOINTS } from "@/utils/api/stream"

export default function ParallelResultItemExplanation({
  parallelRequest,
}: {
  parallelRequest: SearchApiTypes.RequestBody<"/explanation-parallel/">
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  // TODO: pending BE updates
  // const chatPropsWithId = createChatProps({
  //   id: JSON.stringify(parallelRequest),
  //   localEndpoint: LOCAL_API_ENDPOINTS["explanation-parallel"],
  //   requestBody: parallelRequest,
  //   initialInput: parallelRequest.query,
  // })

  return (
    <ExplanationFrame setIsExpanded={setIsExpanded} handleSubmit={() => {}}>
      <ParallelExplanation isExpanded={isExpanded} request={parallelRequest} />
    </ExplanationFrame>
  )
}
