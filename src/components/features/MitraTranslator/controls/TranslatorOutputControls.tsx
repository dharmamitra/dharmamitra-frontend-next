"use client"

import React from "react"
import { Box } from "@mui/material"

import CopyTextButton from "@/components/CopyTextButton"
import { TargetLanguageSelector } from "@/components/features/paramSettings"
import SaveToFileButton from "@/components/SaveToFileButton"

type TranslationInputFieldProps = {
  contentRef: React.RefObject<HTMLElement | null>
}

export default function TranslatorOutputControls({ contentRef }: TranslationInputFieldProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TargetLanguageSelector />

      <Box sx={{ display: "flex" }}>
        <CopyTextButton contentRef={contentRef} />
        <SaveToFileButton contentRef={contentRef} sx={{ fontSize: 26 }} />
      </Box>
    </Box>
  )
}
