import * as React from "react"
import { useMutation } from "@tanstack/react-query"

import { DMFetchApi } from "@/utils/api"
import { type ParsedOCRResponse } from "@/utils/api/search/endpoints/ocr/actions"

import InputBox from "./InputBox"
import OCRResult from "./OCRResult"
import SelectedBoxWithTrigger from "./SelectedBoxWithTrigger"

export default function MitraOCR() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

  const ocrMutation = useMutation<ParsedOCRResponse, Error, File>({
    mutationFn: async (file: File) => {
      return DMFetchApi.ocr.call({
        file,
        transliterateDevanagariToIAST: false,
        transliterateTibetanToWylie: false,
      })
    },
    onError: (error) => {
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
