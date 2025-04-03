import * as React from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"

import { DMFetchApi } from "@/utils/api"

import InputBox from "./InputBox"
import OCRResult from "./OCRResult"
import SelectedBoxWithTrigger from "./SelectedBoxWithTrigger"

export type OCRResponse = {
  extractedText: string
  pages: number
}

export default function MitraOCR() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

  const ocrMutation = useMutation<OCRResponse, Error, File>({
    mutationFn: async (file: File) =>
      DMFetchApi.ocr.call({
        file,
        transliterateDevanagariToIAST: false,
        transliterateTibetanToWylie: false,
      }),
    onError: (error) => {
      // Log the actual error for debugging
      // eslint-disable-next-line no-console
      console.error("OCR processing error:", error)
    },
  })

  const handleFileSelect = React.useCallback((file: File) => {
    setSelectedFile(file)
  }, [])

  const handleExtractText = React.useCallback(() => {
    if (selectedFile) {
      ocrMutation.mutate(selectedFile)
    }
  }, [ocrMutation, selectedFile])

  const handleClearFile = React.useCallback(() => {
    setSelectedFile(null)
    ocrMutation.reset()
  }, [ocrMutation])

  return (
    <>
      {selectedFile ? (
        <SelectedBoxWithTrigger
          file={selectedFile}
          onClear={handleClearFile}
          onTrigger={handleExtractText}
          isTriggerDisabled={ocrMutation.isPending || ocrMutation.isSuccess}
        />
      ) : (
        <InputBox onFileSelect={handleFileSelect} />
      )}

      <OCRResult ocrMutation={ocrMutation} />
    </>
  )
}
