"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { useChat, UseChatOptions } from "@ai-sdk/react"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import { tooltipEnterStyles } from "@/components/styled-ssr-safe"

interface StartStopStreamButtonProps {
  chatPropsWithId: UseChatOptions
  input: string
  isTriggerDisabled: boolean
  completedQueryIds: Set<string>
  setCompletedQueryIds: React.Dispatch<React.SetStateAction<Set<string>>>
}

export default function StartStopStreamButton({
  chatPropsWithId,
  input,
  isTriggerDisabled,
  setCompletedQueryIds,
}: StartStopStreamButtonProps) {
  const t = useTranslations()

  const queryId = chatPropsWithId.id

  // TODO: review & fix message duplication & empty messages case
  const { stop, setInput, status, handleSubmit, messages } =
    useChat(chatPropsWithId)

  React.useEffect(() => {
    // Ensures handlers are able to be called
    setInput(input)
  }, [input, setInput])

  const handleTranslate = React.useCallback(() => {
    handleSubmit(undefined, { allowEmptySubmit: true })
  }, [handleSubmit])

  const handleAbort = React.useCallback(() => {
    stop()
    setInput(input)
  }, [stop, input, setInput])

  React.useEffect(() => {
    if (status === "ready" && messages.length > 0 && queryId) {
      setCompletedQueryIds((prev) => new Set(prev).add(queryId))
    }
  }, [status, messages, queryId, setCompletedQueryIds])

  if (status === "submitted") {
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
    <span>
      <Tooltip
        title={
          <span>
            {isTriggerDisabled ? (
              <>{t("translation.triggerDisabled")}</>
            ) : (
              <>
                {`${t("translation.translate")}`} (Ctrl +
                <span style={tooltipEnterStyles}>↵</span>)
              </>
            )}
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
            onClick={handleTranslate}
            disabled={isTriggerDisabled}
          >
            <PlayCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    </span>
  )
}
