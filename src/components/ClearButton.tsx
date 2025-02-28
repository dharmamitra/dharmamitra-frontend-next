import React from "react"
import { useTranslations } from "next-intl"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

export default function ClearButton({
  input,
  setInput,
}: {
  input: string
  setInput: (input: string) => void
}) {
  const t = useTranslations("generic")
  return (
    <Tooltip title={t("clear")} enterDelay={1500} placement="top">
      <span>
        <IconButton
          aria-label={t("clear")}
          color="secondary"
          disabled={!input}
          onClick={() => {
            setInput("")
          }}
        >
          <HighlightOffIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
