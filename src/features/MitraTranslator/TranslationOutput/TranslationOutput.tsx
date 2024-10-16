"use client"

import React, { forwardRef } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useChat, UseChatOptions } from "ai/react"

import {
  initialParsedStream,
  markers,
  ParsedStream,
  parseStream,
} from "@/utils/api/stream"

import FormatedWordAnalysis from "./FormatedWordAnalysis"

type TranslationOutputProps = {
  chatPropsWithId: UseChatOptions
  input: string
}

const TranslationOutput = forwardRef<HTMLDivElement, TranslationOutputProps>(
  function TranslationOutput({ chatPropsWithId, input }, ref) {
    const { messages } = useChat(chatPropsWithId)

    const [stream, setStream] =
      React.useState<ParsedStream>(initialParsedStream)

    React.useEffect(() => {
      messages.forEach((message) => {
        if (message.role !== "assistant") return
        const messageParts = message.content.split("'")
        const messageContent = messageParts.filter(
          (part) => !part.includes("event:"),
        )
        setStream(parseStream(messageContent.join("").trim()))
      })
    }, [messages, setStream])

    React.useEffect(() => {
      setStream(initialParsedStream)
    }, [input, setStream])

    return (
      <Box
        ref={ref}
        sx={{
          px: 0,
          py: 1,
          height: "100%",
        }}
      >
        {stream.parsedContent?.map((paragraph, index) => {
          if (paragraph.startsWith(markers.wordAnalaysis)) {
            return (
              <FormatedWordAnalysis
                key={`translation-stream-${index}`}
                line={paragraph.replace(markers.wordAnalaysis, "")}
              />
            )
          }

          return (
            <Typography
              key={`translation-stream-${index}`}
              sx={{
                whiteSpace: "pre-wrap",
                my: index === 0 ? 0 : 1,
              }}
            >
              {paragraph}
            </Typography>
          )
        })}
      </Box>
    )
  },
)

export default TranslationOutput
