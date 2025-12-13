import React from "react"
import { useLocale } from "next-intl"

import ExplanationStream from "./ExplanationStream"
import ResultItemExplanationFrame from "./ResultItemExplanationFrame"

import { SearchApiTypes } from "@/api"
import { useCachedChat } from "@/hooks/useCachedChat"
import { createChatProps, localAPIEndpoints } from "@/utils/api/stream"

type SearchResult = SearchApiTypes.Response<"/primary/">["results"][0]
type ExplanationRequestBody = SearchResult & { locale: string }

export default function ResultItemExplanation({ searchResult }: { searchResult: SearchResult }) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const locale = useLocale()

  const chatPropsWithId = React.useMemo(() => {
    return createChatProps<ExplanationRequestBody>({
      id: JSON.stringify(searchResult),
      localEndpoint: localAPIEndpoints["explanation-primary"],
      requestBody: { ...searchResult, locale },
    })
  }, [searchResult, locale])

  // Single useChat instance shared with child component
  const { sendMessage, messages, status, error } = useCachedChat(chatPropsWithId)

  const handleExpand = () => {
    sendMessage({ text: searchResult.query })
  }

  return (
    <ResultItemExplanationFrame
      setIsExpanded={setIsExpanded}
      onExpand={handleExpand}
      sx={{ pb: 1 }}
    >
      {isExpanded ? (
        <ExplanationStream
          id={chatPropsWithId.id}
          messages={messages}
          status={status}
          error={error}
        />
      ) : null}
    </ResultItemExplanationFrame>
  )
}
