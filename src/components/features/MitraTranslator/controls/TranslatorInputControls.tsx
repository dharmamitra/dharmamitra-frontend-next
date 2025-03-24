"use client"

import React from "react"
import { UseChatOptions } from "@ai-sdk/react"
import { Box } from "@mui/material"

import ClearButton from "@/components/ClearButton"
import { InputEncodingSelector } from "@/components/features/paramSettings"
import StartStopStreamButton from "@/components/StartStopStreamButton"

type TranslationInputFieldProps = {
  chatPropsWithId: UseChatOptions
  input: string
  isTriggerDisabled: boolean
  setInput: (event: string) => void
  completedQueryIds: Set<string>
  setCompletedQueryIds: React.Dispatch<React.SetStateAction<Set<string>>>
}

export default function TranslatorInputControls(
  props: TranslationInputFieldProps,
) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <InputEncodingSelector />

      <Box sx={{ display: "flex" }}>
        <ClearButton {...props} />
        <StartStopStreamButton {...props} />
      </Box>
    </Box>
  )
}
