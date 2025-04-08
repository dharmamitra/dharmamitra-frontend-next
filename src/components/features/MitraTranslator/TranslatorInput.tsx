"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useMutation } from "@tanstack/react-query"

import { ACCEPTED_FILE_TYPES_UI_STRING } from "@/components/features/MitraOCR/utils"
import {
  MAX_FILE_INPUT_SIZE,
  MAX_FILE_INPUT_SIZE_MB,
} from "@/components/features/MitraTranslator/utils"
import UploadIcon from "@/components/icons/Upload"
import { useFileUpload } from "@/hooks/useFileUpload"
import { DMFetchApi } from "@/utils/api"
import { type ParsedOCRResponse } from "@/utils/api/search/endpoints/ocr/handlers"
import { TargetLanguage } from "@/utils/api/translation/params"

type TranslationInputFieldProps = {
  input: string
  targetLang: TargetLanguage
  setInput: (event: string) => void
}

const TranslatorInput = ({
  input,
  setInput,
  targetLang,
}: TranslationInputFieldProps) => {
  const t = useTranslations("translation")
  const genericT = useTranslations("generic")

  const placeholder =
    targetLang === "english-explained"
      ? t("placeholders.englishExplained")
      : t("placeholders.default")

  const invalidTypeMessage = genericT("exception.invalidFileType", {
    fileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
  })
  const invalidSizeMessage = genericT("exception.invalidFileSize", {
    maxFileSize: MAX_FILE_INPUT_SIZE_MB,
  })

  const ocrMutation = useMutation<ParsedOCRResponse, Error, File>({
    mutationFn: async (file: File) => {
      return DMFetchApi.ocr.call({
        file,
        transliterateDevanagariToIAST: false,
        transliterateTibetanToWylie: false,
      })
    },
    onSuccess: (data) => {
      if (data.type === "json") {
        if (data.extractedText.length > 5000) {
          throw new Error(
            "Input text is too long for translation. This feature can support approximately 5000 characters.",
          )
        }
        setInput(data.extractedText)
      }

      if (data.type === "file") {
        throw new Error(
          "Input file is too large for translation input. This feature can support approximately 5000 characters.",
        )
      }
    },
    onError: () => {
      // Error handling can be added here if needed
    },
  })

  const {
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop: baseHandleDrop,
    handleFileInput: baseHandleFileInput,
    handleBrowseClick,
    acceptedFileTypes,
  } = useFileUpload({
    onFileSelect: (file) => ocrMutation.mutate(file),
    invalidTypeMessage,
    invalidSizeMessage,
    maxSize: MAX_FILE_INPUT_SIZE,
  })

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={baseHandleDrop}
    >
      <OutlinedInput
        sx={{
          p: 0,
          pt: 1.5,
          display: "grid",
          minHeight: "100%",
          width: "100%",
          alignItems: "flex-start",
          borderTopRightRadius: "none",
          borderBottomRightRadius: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        placeholder={placeholder}
        inputProps={{
          "data-testid": "translation-input",
          "aria-label": t("inputAriaLabel"),
          sx: {
            height: "calc(fit-content) !important",
          },
        }}
        multiline
        value={ocrMutation.isPending ? "Loading..." : input}
        onChange={(event) => setInput(event.target.value)}
        disabled={ocrMutation.isPending}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={baseHandleFileInput}
        accept={acceptedFileTypes}
      />

      {/* Drag overlay - only visible when dragging */}
      {isDragging && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "3px dashed",
            borderColor: "primary.main",
            borderRadius: 3,
            zIndex: 10,
          }}
        >
          <UploadIcon />
          <Typography variant="h6" component="p" color="text.primary">
            {genericT("dragAndDrop")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {genericT("supportedFileTypes", {
              fileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
              maxFileSize: MAX_FILE_INPUT_SIZE_MB,
            })}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 5,
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={handleBrowseClick}
          disabled={ocrMutation.isPending}
          size="small"
        >
          {genericT("browseFiles")}
        </Button>
      </Box>
    </Box>
  )
}

export default TranslatorInput
