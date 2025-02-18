"use client"

import React, { forwardRef } from "react"
import { useChat, UseChatOptions } from "@ai-sdk/react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
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

const wrapperBoxStyles = {
  px: 0,
  py: 1.5,
  height: "100%",
}

const TranslationOutput = forwardRef<HTMLDivElement, TranslationOutputProps>(
  function TranslationOutput({ chatPropsWithId, input }, ref) {
    const { messages, status, error } = useChat(chatPropsWithId)

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

    React.useEffect(() => {
      if (status !== "submitted") return
      setStream(initialParsedStream)
    }, [status, setStream])

    if (status === "submitted" && stream.parsedContent.length < 1) {
      return (
        <Box sx={{ ...wrapperBoxStyles, py: 2.5 }}>
          <LoadingDots />
        </Box>
      )
    }

    if (error) {
      return (
        <Box sx={wrapperBoxStyles}>
          <ExceptionText
            type="error"
            message={error.message}
            sx={{ border: 0, p: 0, m: 0 }}
          />
        </Box>
      )
    }

    return (
      <Box ref={ref} sx={wrapperBoxStyles}>
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
