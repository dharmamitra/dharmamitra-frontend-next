"use client"

import React from "react"
import { Box } from "@mui/material"

import CopyTextButton from "@/components/CopyTextButton"

import TargetLanguageSelector from "../../uiSettings/TargetLanguageSelector"

type TranslationInputFieldProps = {
  contentRef: React.RefObject<HTMLElement>
}

export default function TranslatorOutputControls({
  contentRef,
}: TranslationInputFieldProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TargetLanguageSelector />

      <CopyTextButton contentRef={contentRef} />
    </Box>
  )
}
