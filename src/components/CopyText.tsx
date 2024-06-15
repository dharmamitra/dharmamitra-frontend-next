"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { IconButton } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"

interface CopyTextProps {
  contentRef: React.RefObject<HTMLElement>
  ariaLabel: string
}

export default function CopyText({ contentRef, ariaLabel }: CopyTextProps) {
  const t = useTranslations("generic")
  const [toolTip, setToolTip] = React.useState<string>(t("copy"))

  const copyContent = React.useCallback(async () => {
    const element = contentRef.current
    if (element) {
      const text = element.innerText
      await navigator.clipboard.writeText(text)
      setToolTip(t("copied"))
    }
  }, [contentRef, t])

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <IconButton
          data-testid={"copy-button"}
          aria-label={ariaLabel}
          color="secondary"
          onClick={copyContent}
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
