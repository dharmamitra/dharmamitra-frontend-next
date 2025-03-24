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
    const { messages, status, error } = useChat(chatPropsWithId)

    if (status === "submitted") {
      return (
        <Box sx={{ py: 2.5 }}>
          <LoadingDots />
        </Box>
      )
    }

    if (error) {
      return (
        <ExceptionText
          type="error"
          message={error.message}
          sx={{ border: 0, p: 0, m: 0 }}
        />
      )
    }

    return (
      <Box ref={ref}>
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            {message.role === "assistant" ? (
              <MemoizedMarkdown id={message.id} content={message.content} />
            ) : null}
          </React.Fragment>
        ))}
      </Box>
    )
  },
)

export default TranslationOutput
