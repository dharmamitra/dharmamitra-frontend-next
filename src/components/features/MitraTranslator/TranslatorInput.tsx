"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { Alert, AlertTitle } from "@mui/material"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useMutation } from "@tanstack/react-query"

import { ACCEPTED_FILE_TYPES_UI_STRING } from "@/components/features/MitraOCR/utils"
import {
  MAX_FILE_INPUT_SIZE,
  MAX_FILE_INPUT_SIZE_MB,
  MAX_INPUT_CHARACTERS,
  MAX_INPUT_PAGE_EQUIVALENT,
} from "@/components/features/MitraTranslator/utils"
import UploadIcon from "@/components/icons/Upload"
import { useTargetLangParamWithLocalStorage } from "@/hooks/params/useTargetLangParamWithLocalStorage"
import { useFileUpload } from "@/hooks/useFileUpload"
import { DMFetchApi } from "@/utils/api"
import { type ParsedOCRResponse } from "@/utils/api/search/endpoints/ocr/handlers"

const OCR_LENGTH_ERROR_NAME = "OcrLengthError"

type TranslationInputFieldProps = {
  input: string
  setInput: (event: string) => void
  fileInputRef?: React.RefObject<HTMLInputElement | null>
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onFileUploadStateChange?: (isPending: boolean) => void
}

const TranslatorInput = ({
  input,
  setInput,
  fileInputRef: externalFileInputRef,
  onDragOver: externalHandleDragOver,
  onDragLeave: externalHandleDragLeave,
  onDrop: externalHandleDrop,
  onFileUploadStateChange,
}: TranslationInputFieldProps) => {
  const t = useTranslations("translation")
  const genericT = useTranslations("generic")

  const [targetLanguageParam] = useTargetLangParamWithLocalStorage()

  const invalidTypeMessage = genericT("exception.invalidFileType", {
    fileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
  })
  const invalidSizeMessage = genericT("exception.invalidFileSize", {
    maxFileSize: MAX_FILE_INPUT_SIZE_MB,
  })
  const ocrLengthErrorMessage = t("ocr.lengthErrorText", {
    maxInputCharacters: MAX_INPUT_CHARACTERS,
    maxInputPageEquivalent: MAX_INPUT_PAGE_EQUIVALENT,
  })

  const ocrMutation = useMutation<ParsedOCRResponse, Error, File>({
    mutationFn: async (file: File) => {
      onFileUploadStateChange?.(true)
      const response = await DMFetchApi.ocr.call({
        file,
        transliterateDevanagariToIAST: false,
        transliterateTibetanToWylie: false,
      })

      if (
        (response.type === "json" && response.extractedText.length > MAX_INPUT_CHARACTERS) ||
        response.type === "file"
      ) {
        throw {
          message: ocrLengthErrorMessage,
          name: OCR_LENGTH_ERROR_NAME,
        } satisfies Error
      }

      return response
    },
    onSuccess: (data) => {
      onFileUploadStateChange?.(false)
      if (data.type === "json") {
        setInput(data.extractedText)
      }
    },
    onError: () => {
      onFileUploadStateChange?.(false)
      // TODO: Error handling
    },
  })

  const {
    isDragging: rawIsDragging,
    fileInputRef: internalFileInputRef,
    handleDragOver: baseHandleDragOver,
    handleDragLeave: baseHandleDragLeave,
    handleDrop: baseHandleDrop,
    handleFileInput: baseHandleFileInput,
    acceptedFileTypes,
  } = useFileUpload({
    onFileSelect: (file) => ocrMutation.mutate(file),
    invalidTypeMessage,
    invalidSizeMessage,
    maxSize: MAX_FILE_INPUT_SIZE,
  })

  // Add a small debounce to isDragging state to prevent flickering
  // The ref tracks the drag timeout for debouncing
  const dragTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  React.useEffect(() => {
    if (rawIsDragging) {
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current)
        dragTimeoutRef.current = null
      }
      setIsDragging(true)
    } else {
      dragTimeoutRef.current = setTimeout(() => {
        setIsDragging(false)
        dragTimeoutRef.current = null
      }, 50) // 50ms debounce
    }

    return () => {
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current)
      }
    }
  }, [rawIsDragging])

  const fileInputRef = externalFileInputRef || internalFileInputRef

  const internalHandleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      baseHandleDragOver(e)
    },
    [baseHandleDragOver],
  )

  const internalHandleDragLeave = React.useCallback(
    (e: React.DragEvent) => {
      baseHandleDragLeave(e)
    },
    [baseHandleDragLeave],
  )

  const internalHandleDrop = React.useCallback(
    (e: React.DragEvent) => {
      baseHandleDrop(e)
    },
    [baseHandleDrop],
  )

  const handleDragOver = externalHandleDragOver || internalHandleDragOver
  const handleDragLeave = externalHandleDragLeave || internalHandleDragLeave
  const handleDrop = externalHandleDrop || internalHandleDrop

  const standardPlaceholder = t("placeholders.default", {
    acceptedFileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
  })
  const deepResearchPlaceholder = t("placeholders.deepResearch")

  const placeholder =
    targetLanguageParam === "english-deep-research" ? deepResearchPlaceholder : standardPlaceholder

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {ocrMutation.error ? (
        <Alert severity="error" onClose={() => ocrMutation.reset()}>
          <AlertTitle>
            {ocrMutation.error.name === OCR_LENGTH_ERROR_NAME
              ? t("ocr.lengthErrorTitle")
              : t("ocr.unknownErrorTitle")}
          </AlertTitle>
          {ocrMutation.error.message}
        </Alert>
      ) : null}

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
        value={ocrMutation.isPending ? genericT("processing") : input}
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

      {/* Drag overlay only visible when dragging - uses opacity transitions 
      instead of conditional rendering to prevent flickering */}
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
          backgroundColor: "white",
          border: "3px dashed",
          borderColor: "divider",
          borderRadius: 3,
          zIndex: 10,
          opacity: isDragging ? 1 : 0,
          visibility: isDragging ? "visible" : "hidden",
          transition: "opacity 0.15s ease, visibility 0.15s ease",
          pointerEvents: isDragging ? "auto" : "none",
        }}
      >
        <Box
          inert={true}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            inert={true}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                pt: 1.5,
              }}
            >
              <UploadIcon size={1.6} />
            </Box>
            <Box>
              <Typography variant="h6" component="p" color="text.primary" textAlign="left">
                {genericT("dragAndDrop")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.rich("ocr.dragAndDropOverlay", {
                  fileTypes: ACCEPTED_FILE_TYPES_UI_STRING,
                  maxFileSize: MAX_FILE_INPUT_SIZE_MB,
                  maxInputCharacters: MAX_INPUT_CHARACTERS,
                  maxInputPageEquivalent: MAX_INPUT_PAGE_EQUIVALENT,
                  br: () => <br />,
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TranslatorInput
