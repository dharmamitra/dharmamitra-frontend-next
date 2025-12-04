"use client"

import React, { forwardRef } from "react"
import Box from "@mui/material/Box"
import { ChatStatus, UIMessage } from "ai"

import DeepResearchPrompt from "./DeepResearchPrompt"

import ExceptionText from "@/components/ExceptionText"
import { getMessageText, TranslationChatPropsWithId } from "@/components/features/utils"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"
import { TargetLanguage } from "@/utils/api/translation/params"

type TranslationOutputProps = {
  targetLang: TargetLanguage
  input: string
  messages: UIMessage[]
  id: string
  status: ChatStatus
  error: Error | undefined
  onDeepResearchClick: () => void
}

const TranslationOutput = forwardRef<HTMLDivElement, TranslationOutputProps>(
  function TranslationOutput(
    { targetLang, input, messages, id, status, error, onDeepResearchClick },
    ref,
  ) {
    // Stable array of filtered messages
    const assistantMessages = React.useMemo(
      () =>
        messages.filter((msg) => {
          return msg.role === "assistant"
        }),
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
                key={`${id}-${message.id}`}
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

        <DeepResearchPrompt
          isRendered={
            /english$|english-explained/.test(targetLang) &&
            assistantMessages.length > 0 &&
            status !== "streaming" &&
            !!input
          }
          onDeepResearchClick={onDeepResearchClick}
        />
      </Box>
    )
  },
)

export default TranslationOutput
