"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Fade, IconButton } from "@mui/material"

import { Popper, PopperMsgBox } from "@/components/styled"

export default function CopyText({
  string,
  ariaLabel,
}: {
  string: string
  ariaLabel: string
}) {
  const t = useTranslations("generic")
  const [copyPopperAnchorEl, setCopyPopperAnchorEl] =
    React.useState<HTMLElement | null>(null)

  return (
    <>
      <IconButton
        data-testid={"copy-button"}
        aria-label={ariaLabel}
        color="secondary"
        onClick={async (e) => {
          setCopyPopperAnchorEl(e.currentTarget)
          await navigator.clipboard.writeText(string)
        }}
        onMouseLeave={() => setCopyPopperAnchorEl(null)}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>

      <Popper
        open={Boolean(copyPopperAnchorEl)}
        anchorEl={copyPopperAnchorEl}
        placement="top"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [-6, 20],
            },
          },
        ]}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <PopperMsgBox>{t("copied")}</PopperMsgBox>
          </Fade>
        )}
      </Popper>
    </>
  )
}
