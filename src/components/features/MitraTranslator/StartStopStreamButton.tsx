"use client"

import React from "react"
import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useChat, UseChatOptions } from "ai/react"

import { tooltipEnterStyles } from "@/components/styled-ssr-safe"

interface StartStopStreamButtonProps {
  chatPropsWithId: UseChatOptions
  input: string
}

export default function StartStopStreamButton({
  chatPropsWithId,
  input,
}: StartStopStreamButtonProps) {
  const t = useTranslations()

  const { stop, setInput, isLoading, handleSubmit } = useChat(chatPropsWithId)

  React.useEffect(() => {
    // Ensures handlers are able to be called
    setInput(input)
  }, [input, setInput])

  const handleAbort = React.useCallback(() => {
    stop()
    setInput(input)
  }, [stop, input, setInput])

  if (isLoading) {
    return (
      <Tooltip title={`${t("generic.stop")} (Esc)`} placement="top">
        <IconButton
          aria-label={t("generic.stop")}
          color="secondary"
          onClick={handleAbort}
        >
          <StopCircleIcon />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip
      title={
        <span>
          {`${t("translation.translate")}`} (Ctrl +
          <span style={tooltipEnterStyles}>↵</span>)
        </span>
      }
      placement="top"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [-24, 0],
              },
            },
          ],
        },
      }}
    >
      <span>
        <IconButton
          aria-label={t("translation.translate")}
          color="secondary"
          onClick={handleSubmit}
          disabled={!input.match(/\S+/g)?.length}
        >
          <PlayCircleIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
