import React from "react"
import { useChat, UseChatOptions } from "@ai-sdk/react"
import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import {
  initialParsedStream,
  ParsedStream,
  parseStream,
} from "@/utils/api/stream"

export type ExplanationProps = {
  isExpanded: boolean
  chatPropsWithId: UseChatOptions
}

export default function PrimaryExplanationStream({
  isExpanded,
  chatPropsWithId,
}: ExplanationProps) {
  const { messages, status, handleSubmit, error } = useChat(chatPropsWithId)

  React.useEffect(() => {
    if (isExpanded) {
      handleSubmit()
    }
  }, [isExpanded, handleSubmit])

  const [stream, setStream] = React.useState<ParsedStream>(initialParsedStream)

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

  if (status === "submitted" && stream.parsedContent.length < 1)
    return (
      <Box pt={1} pb={2}>
        <LoadingDots />
      </Box>
    )

  if (error) {
    return (
      <Typography
        variant="body2"
        color="error.main"
        borderRadius={1}
        display="inline-block"
        my={1}
      >
        {error.message}
      </Typography>
    )
  }

  return (
    <>
      <Box color="grey.800">
        {stream.parsedContent?.map((paragraph, index) => {
          return (
            <Typography
              key={`primary-explanation-stream-${index}`}
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

      <ExceptionText
        isRendered={!!stream.exceptionI18nKey}
        exceptionI18nKey={stream.exceptionI18nKey}
      />
    </>
  )
}
