"use client"

import React from "react"
import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

const tooltipEnterStyles = {
  fontSize: "1.1rem",
  lineHeight: 0.75,
  paddingBottom: "0.1rem",
  verticalAlign: "middle",
}

interface StartStopStreamButtonProps {
  input: string
  isStreaming: boolean
  onStart: () => void
  onStop: () => void
}

export default function StartStopStreamButton({
  input,
  isStreaming,
  onStart,
  onStop,
}: StartStopStreamButtonProps) {
  const t = useTranslations()

  return (
    <>
      {isStreaming ? (
        <Tooltip title={`${t("generic.stop")} (Esc)`} placement="top">
          <IconButton
            aria-label={t("generic.stop")}
            color="secondary"
            onClick={onStop}
          >
            <StopCircleIcon />
          </IconButton>
        </Tooltip>
      ) : (
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
              onClick={onStart}
              disabled={!input.match(/\S+/g)?.length}
            >
              <PlayCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </>
  )
}
