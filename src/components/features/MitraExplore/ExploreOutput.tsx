"use client"

import React, { forwardRef } from "react"
import { useChat } from "@ai-sdk/react"
import Box from "@mui/material/Box"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"

import { ExploreChatPropsWithId } from "./utils"

type ExploreOutputProps = {
  chatPropsWithId: ExploreChatPropsWithId
}

const ExploreOutput = forwardRef<HTMLDivElement, ExploreOutputProps>(function ExploreOutput(
  { chatPropsWithId },
  ref,
) {
  const { messages, status, error } = useChat(chatPropsWithId)

  // Stable array of filtered messages
  const assistantMessages = React.useMemo(
    () => messages.filter((msg) => msg.role === "assistant"),
    [messages],
  )

  return (
    <Box
      sx={{
        pt: status === "submitted" ? 1 : 0,
        pb: 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box ref={ref}>
          {assistantMessages.map((message) => (
            <MemoizedMarkdown
              key={`${chatPropsWithId.id}-${message.id}`}
              id={message.id}
              content={message.content}
            />
          ))}
        </Box>

        {status === "submitted" ? <LoadingDots /> : null}
        {error ? (
          <ExceptionText type="error" message={error.message} sx={{ border: 0, p: 0, m: 0 }} />
        ) : null}
      </Box>
    </Box>
  )
})

export default ExploreOutput
