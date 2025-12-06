import React from "react"
import { Box } from "@mui/material"
import { ChatStatus, UIMessage } from "ai"

import ExceptionText from "@/components/ExceptionText"
import { getMessageText } from "@/components/features/utils"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"

export type ExplanationProps = {
  id: string
  messages: UIMessage[]
  status: ChatStatus
  error: Error | undefined
}

export default function ExplanationStream({ id, messages, status, error }: ExplanationProps) {
  const assistantMessages = React.useMemo(
    () => messages.filter((msg) => msg.role === "assistant"),
    [messages],
  )

  if (status === "submitted" && assistantMessages.length === 0) {
    return (
      <Box pt={1} pb={2}>
        <LoadingDots />
      </Box>
    )
  }

  if (error) {
    return <ExceptionText type="error" message={error.message} sx={{ border: 0, p: 0, m: 0 }} />
  }

  return (
    <Box>
      {assistantMessages.map((message) => (
        <MemoizedMarkdown
          key={`${id}-${message.id}`}
          id={message.id}
          content={getMessageText(message)}
        />
      ))}
    </Box>
  )
}
