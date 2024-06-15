"use client"

import React from "react"
import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useSetAtom } from "jotai"

import { abortTranslationQueryAtom, triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useTranslationStream from "@/hooks/useTranslationStream"
import { apiParamsNames } from "@/utils/api/params"

const tooltipEnterStyles = {
  fontSize: "1.1rem",
  lineHeight: 0.75,
  paddingBottom: "0.1rem",
  verticalAlign: "middle",
}

export default function LazyStartStopButton() {
  const t = useTranslations()

  const { input } = useInputWithUrlParam<string>(
    apiParamsNames.translation.input_sentence,
  )

  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)
  const setAbortTranslationQuery = useSetAtom(abortTranslationQueryAtom)

  const { isStreaming } = useTranslationStream()

  return (
    <>
      {isStreaming ? (
        <Tooltip title={`${t("generic.stop")} (Esc)`} placement="top">
          <IconButton
            aria-label={t("generic.stop")}
            color="secondary"
            onClick={() => setAbortTranslationQuery(true)}
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
              onClick={() => {
                setTriggerTranslationQuery(true)
              }}
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
