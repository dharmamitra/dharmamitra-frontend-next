"use client"

import React from "react"
import { useTranslations } from "next-intl"
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import { TranslationApiTypes } from "@/utils/api"

type CopyButtonsProps = {
  grammaticalAnalysis: TranslationApiTypes.Schema["Sentence"]["grammatical_analysis"]
  sentence: string
}

export default function CopyButtons({ grammaticalAnalysis, sentence }: CopyButtonsProps) {
  const [copyUnisandhiSuccess, setCopyUnisandhiSuccess] = React.useState(false)
  const [copyAllSuccess, setCopyAllSuccess] = React.useState(false)
  const [copyError, setCopyError] = React.useState(false)

  const t = useTranslations()

  const unsandhiedItems = grammaticalAnalysis.map((item) => item.unsandhied)

  const handleCopyUnsandhied = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `${t("translation.tagging.unsandhied")}:\n${unsandhiedItems.join(" ")}`,
      )
      setCopyUnisandhiSuccess(true)
      setCopyError(false)
      setTimeout(() => {
        setCopyUnisandhiSuccess(false)
      }, 2000)
    } catch {
      setCopyError(true)
      setTimeout(() => {
        setCopyError(false)
      }, 2000)
    }
  }, [t, unsandhiedItems])

  const handleCopyAll = React.useCallback(async () => {
    try {
      // Format the complete data for all unsandhied
      const allText = [
        `${t("translation.tagging.originalSentence")}:\n${sentence}\n`,
        `${t("translation.tagging.unsandhied")}:\n${unsandhiedItems.join(" ")}`,
        ...grammaticalAnalysis.map((item, index) => {
          const { unsandhied, lemma, tag, meanings } = item
          const meaningsText = meanings ? meanings.join("\n- ") : ""

          return [
            `\n#${index + 1}: ${unsandhied}`,
            lemma ? `${t("translation.tagging.lemma")}: ${lemma}` : "",
            tag ? `${t("translation.tagging.tag")}: ${tag}` : "",
            meaningsText ? `${t("translation.tagging.meanings")}:\n- ${meaningsText}` : "",
          ]
            .filter(Boolean)
            .join("\n")
        }),
      ]
        .filter(Boolean)
        .join("\n")

      await navigator.clipboard.writeText(allText)
      setCopyAllSuccess(true)
      setCopyError(false)
      setTimeout(() => {
        setCopyAllSuccess(false)
      }, 2000)
    } catch {
      setCopyError(true)
      setTimeout(() => {
        setCopyError(false)
      }, 2000)
    }
  }, [t, grammaticalAnalysis, sentence, unsandhiedItems])

  const getTooltipTitle = React.useCallback(
    (isSuccess: boolean, defaultTitle: string) => {
      if (copyError) return t("generic.copyError")
      return isSuccess ? t("generic.copied") : defaultTitle
    },
    [copyError, t],
  )

  return (
    <Box
      sx={{
        display: "flex",
        mb: 2,
      }}
    >
      <Tooltip
        title={getTooltipTitle(copyUnisandhiSuccess, t("translation.tagging.copy.unsandhied"))}
      >
        <IconButton
          onClick={handleCopyUnsandhied}
          size="small"
          sx={{ mr: 1 }}
          color={copyError ? "error" : copyUnisandhiSuccess ? "success" : "default"}
        >
          <NoteAltOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title={getTooltipTitle(copyAllSuccess, t("generic.copyAll"))}>
        <IconButton
          onClick={handleCopyAll}
          size="small"
          color={copyError ? "error" : copyAllSuccess ? "success" : "default"}
        >
          <AssignmentOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
