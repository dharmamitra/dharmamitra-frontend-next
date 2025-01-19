"use client"

import React, { type JSX } from "react"
import { useTranslations } from "next-intl"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { IconButton } from "@mui/material"
import { SvgIconProps } from "@mui/material/SvgIcon"
import Tooltip from "@mui/material/Tooltip"

interface CopyTextProps {
  contentRef: React.RefObject<HTMLElement | null>
  ariaLabel?: string
  icon?: JSX.Element
  tooltip?: string
  color?: SvgIconProps["color"]
}

const blockElements = [
  "DIV",
  "P",
  "UL",
  "OL",
  "LI",
  "BLOCKQUOTE",
  "PRE",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BR",
  "HR",
]

const getTextWithLinks = (node: Node): string => {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return node.textContent || ""
    case Node.ELEMENT_NODE: {
      const elementNode = node as HTMLElement
      if (elementNode.tagName === "A") {
        const { textContent, href } = elementNode as HTMLAnchorElement
        return `${textContent} (${href})`
      }
      const isBlockElement = blockElements.includes(elementNode.tagName)
      const childText = Array.from(elementNode.childNodes)
        .map(getTextWithLinks)
        .join("")
      return isBlockElement ? `${childText}\n` : childText
    }
    default:
      return ""
  }
}

export default function CopyTextButton({
  contentRef,
  ariaLabel,
  icon,
  tooltip,
  color,
}: CopyTextProps) {
  const t = useTranslations("generic.copy")
  const [toolTip, setToolTip] = React.useState<string>(tooltip || t("default"))
  const [isContent, setIsContent] = React.useState<boolean>(false)

  const copyContent = React.useCallback(async () => {
    const element = contentRef.current
    if (element) {
      const text = getTextWithLinks(element)
      await navigator.clipboard.writeText(text)
      setToolTip(t("copied"))
    }
  }, [contentRef, t])

  React.useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const updateContentState = () => {
      setIsContent(Boolean(element.textContent))
    }

    updateContentState()

    const observer = new MutationObserver(updateContentState)
    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [contentRef])

  return (
    <>
      <Tooltip title={toolTip} placement="top">
        <span>
          <IconButton
            data-testid={"copy-button"}
            aria-label={ariaLabel || t("default")}
            color="secondary"
            onClick={copyContent}
            disabled={!isContent}
            onMouseLeave={() =>
              setTimeout(() => {
                setToolTip(tooltip || t("default"))
              }, 500)
            }
          >
            {icon || <ContentCopyIcon color={color} fontSize="small" />}
          </IconButton>
        </span>
      </Tooltip>
    </>
  )
}
