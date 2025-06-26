"use client"

import React, { forwardRef } from "react"
import { useChat, UseChatOptions } from "@ai-sdk/react"
import Box from "@mui/material/Box"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"

type TranslationOutputProps = {
  chatPropsWithId: UseChatOptions
}

const TranslationOutput = forwardRef<HTMLDivElement, TranslationOutputProps>(
  function TranslationOutput({ chatPropsWithId }, ref) {
    const { messages, status, error, setMessages } = useChat(chatPropsWithId)

    // Stable array of filtered messages
    const assistantMessages = React.useMemo(
      () => messages.filter((msg) => msg.role === "assistant"),
      [messages],
    )

    // Cleanup messages when component unmounts or when chatPropsWithId changes
    React.useEffect(() => {
      return () => {
        setMessages([])
      }
    }, [chatPropsWithId.id, setMessages])

    if (status === "submitted") {
      return (
        <Box sx={{ py: 2.5 }}>
          <LoadingDots />
        </Box>
      )
    }

    if (error) {
      return <ExceptionText type="error" message={error.message} sx={{ border: 0, p: 0, m: 0 }} />
    }

    return (
      <Box ref={ref}>
        {assistantMessages.map((message) => (
          <MemoizedMarkdown
            key={`${chatPropsWithId.id}-${message.id}`}
            id={message.id}
            content={message.content}
          />
        ))}
      </Box>
    )
  },
)

export default TranslationOutput
