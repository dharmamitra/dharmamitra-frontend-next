"use client"

import React from "react"
import { Box } from "@mui/material"
import { UseChatOptions } from "ai/react"

import ClearButton from "@/components/ClearButton"
import InputEncodingSelector from "@/components/features/uiSettings/InputEncodingSelector"
import StartStopStreamButton from "@/components/StartStopStreamButton"

type TranslationInputFieldProps = {
  chatPropsWithId: UseChatOptions
  input: string
  // eslint-disable-next-line no-unused-vars
  setInput: (event: string) => void
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

      <Box>
        <ClearButton {...props} />
        <StartStopStreamButton {...props} />
      </Box>
    </Box>
  )
}
