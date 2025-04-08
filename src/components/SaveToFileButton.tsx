"use client"

import React, { type JSX } from "react"
import { useTranslations } from "next-intl"
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined"
import { IconButton } from "@mui/material"
import { SvgIconProps } from "@mui/material/SvgIcon"
import Tooltip from "@mui/material/Tooltip"

import { saveAsTxtFile } from "@/utils"

interface SaveToFileProps {
  contentRef: React.RefObject<HTMLElement | null>
  ariaLabel?: string
  icon?: JSX.Element
  tooltip?: string
  color?: SvgIconProps["color"]
  fontSize?: SvgIconProps["fontSize"]
  fileName?: string
  sx?: SvgIconProps["sx"]
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

export default function SaveToFileButton({
  contentRef,
  ariaLabel,
  icon,
  tooltip,
  color = "action",
  fontSize = "small",
  fileName,
  sx,
}: SaveToFileProps) {
  const t = useTranslations("generic")
  const title = tooltip || t("saveToFile")

  const [isContent, setIsContent] = React.useState<boolean>(false)

  const saveContent = React.useCallback(async () => {
    const element = contentRef.current
    if (element) {
      const text = getTextWithLinks(element)
      const blob = new Blob([text], { type: "text/plain" })
      saveAsTxtFile(blob, fileName || "mitra-result.txt")
    }
  }, [contentRef, fileName])

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
      <Tooltip title={title} placement="top">
        <span>
          <IconButton
            data-testid={"save-to-file-button"}
            aria-label={ariaLabel || title}
            color="secondary"
            onClick={saveContent}
            disabled={!isContent}
          >
            {icon || (
              <SaveOutlinedIcon color={color} fontSize={fontSize} sx={sx} />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </>
  )
}
