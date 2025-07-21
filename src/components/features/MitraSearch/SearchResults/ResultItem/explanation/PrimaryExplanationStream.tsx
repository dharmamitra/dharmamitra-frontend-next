import React from "react"
import { useChat, UseChatOptions } from "@ai-sdk/react"
import { Box } from "@mui/material"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"

export type ExplanationProps = {
  chatPropsWithId: UseChatOptions
}

export default function PrimaryExplanationStream({ chatPropsWithId }: ExplanationProps) {
  const { messages, status, error } = useChat(chatPropsWithId)

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
          key={`${chatPropsWithId.id}-${message.id}`}
          id={message.id}
          content={message.content}
        />
      ))}
    </Box>
  )
}
