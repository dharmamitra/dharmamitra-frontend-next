"use client"

import { forwardRef } from "react"
import Box from "@mui/material/Box"
import { ChatStatus, UIMessage } from "ai"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"
import { getMessageText } from "@/utils/api/stream"

type ExploreOutputProps = {
  messages: UIMessage[]
  id: string
  status: ChatStatus
  error: Error | undefined
}

const ExploreOutput = forwardRef<HTMLDivElement, ExploreOutputProps>(function ExploreOutput(
  { messages, id, status, error },
  ref,
) {
  const assistantMessages = messages.filter((msg) => msg.role === "assistant")

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
          {assistantMessages.map((message, index) => (
            <MemoizedMarkdown
              key={`${id}-${message.id}-${index}`}
              id={message.id}
              content={getMessageText(message)}
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
