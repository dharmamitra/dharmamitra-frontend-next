import * as React from "react"
import { useTranslations } from "next-intl"
import { Box, Button, Typography } from "@mui/material"

import UploadIcon from "@/components/icons/Upload"
import { useFileUpload } from "@/hooks/useFileUpload"

import {
  ACCEPTED_FILE_TYPES_UI_STRING,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
} from "./utils"

type InputBoxProps = {
  className?: string
  onFileSelect: (file: File) => void
}

export default function InputBox({ className, onFileSelect }: InputBoxProps) {
  const t = useTranslations("generic")
  const ocrT = useTranslations("ocr")
  const invalidTypeMessage = t("exception.invalidFileType", {
    fileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
  })
  const invalidSizeMessage = t("exception.invalidFileSize", {
    maxFileSize: MAX_FILE_SIZE_MB,
  })

  const {
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    handleBrowseClick,
    acceptedFileTypes,
  } = useFileUpload({
    onFileSelect,
    invalidTypeMessage,
    invalidSizeMessage,
    maxSize: MAX_FILE_SIZE,
  })

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "3px dashed",
        borderColor: isDragging ? "primary.main" : "divider",
        borderRadius: 3,
        p: 4,
        pb: 6,
        transition: "border-color 0.2s ease",
      }}
      className={className}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInput}
        accept={acceptedFileTypes}
      />

      <UploadIcon />

      <Box sx={{ textAlign: "center", mt: 1, mb: 2 }}>
        <Typography variant="h6" component="p" color="text.primary">
          {t("dragAndDrop")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("supportedFileTypes", {
            fileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
            maxFileSize: MAX_FILE_SIZE_MB,
          })}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ my: 1, maxWidth: "520px" }}
        >
          {ocrT("processingTimeNote")}
        </Typography>
      </Box>

      <Button variant="contained" color="inherit" onClick={handleBrowseClick}>
        {t("browseFiles")}
      </Button>
    </Box>
  )
}
