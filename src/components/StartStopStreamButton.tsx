"use client"

import React from "react"
import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { ChatStatus, UIMessage } from "ai"

import { tooltipEnterStyles } from "@/components/styled-ssr-safe"

interface StartStopStreamButtonProps {
  queryId: string
  input: string
  isTriggerDisabled: boolean
  completedQueryIds: Set<string>
  setCompletedQueryIds: React.Dispatch<React.SetStateAction<Set<string>>>
  // Chat helpers from parent
  sendMessage: (message: { text: string }) => void
  stop: () => void
  status: ChatStatus
  messages: UIMessage[]
}

export default function StartStopStreamButton({
  queryId,
  input,
  isTriggerDisabled,
  setCompletedQueryIds,
  sendMessage,
  stop,
  status,
  messages,
}: StartStopStreamButtonProps) {
  const t = useTranslations()

  React.useEffect(() => {
    if (status === "ready" && messages.length > 0 && queryId) {
      setCompletedQueryIds((prev) => new Set(prev).add(queryId))
    }
  }, [status, messages, queryId, setCompletedQueryIds])

  if (status === "submitted") {
    return (
      <Tooltip title={`${t("generic.stop")} (Esc)`} placement="top">
        <IconButton aria-label={t("generic.stop")} color="secondary" onClick={stop}>
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
                {`${t("translation.translate")}`} (Ctrl +<span style={tooltipEnterStyles}>↵</span>)
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
            onClick={() => sendMessage({ text: input })}
            disabled={isTriggerDisabled}
          >
            <PlayCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    </span>
  )
}
