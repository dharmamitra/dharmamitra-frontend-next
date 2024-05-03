"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

export default function CopyText({
  string,
  ariaLabel,
}: {
  string: string
  ariaLabel: string
}) {
  const t = useTranslations("generic")
  const [toolTip, setToolTip] = React.useState<string>(t("copy"))

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <IconButton
          data-testid={"copy-button"}
          aria-label={ariaLabel}
          color="secondary"
          onClick={async () => {
            setToolTip(t("copied"))
            await navigator.clipboard.writeText(string)
          }}
          onMouseLeave={() =>
            setTimeout(() => {
              setToolTip(t("copy"))
            }, 500)
          }
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}
