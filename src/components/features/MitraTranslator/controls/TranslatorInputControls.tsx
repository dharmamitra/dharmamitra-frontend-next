"use client"

import React from "react"
import { Box } from "@mui/material"
import { ChatStatus, UIMessage } from "ai"

import AttachFileButton from "@/components/AttachFileButton"
import ClearButton from "@/components/ClearButton"
import { InputEncodingSelector } from "@/components/features/paramSettings"
import StartStopStreamButton from "@/components/StartStopStreamButton"

type TranslationInputFieldProps = {
  queryId: string
  input: string
  isTriggerDisabled: boolean
  setInput: (event: string) => void
  completedQueryIds: Set<string>
  setCompletedQueryIds: React.Dispatch<React.SetStateAction<Set<string>>>
  onFileButtonClick?: () => void
  fileUploadDisabled?: boolean
  acceptedFileTypes?: string
  // Chat helpers from parent
  sendMessage: (message: { text: string }) => void
  stop: () => void
  status: ChatStatus
  messages: UIMessage[]
}

export default function TranslatorInputControls(props: TranslationInputFieldProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <InputEncodingSelector />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {props.onFileButtonClick && (
          <AttachFileButton
            onClick={props.onFileButtonClick}
            disabled={props.fileUploadDisabled || Boolean(props.input)}
            acceptedFileTypes={props.acceptedFileTypes}
            color="secondary"
          />
        )}
        <ClearButton {...props} />
        <StartStopStreamButton {...props} />
      </Box>
    </Box>
  )
}
