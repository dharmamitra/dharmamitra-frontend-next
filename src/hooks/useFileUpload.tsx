import React from "react"

import { ACCEPTED_FILE_TYPES_STRING, validateFile } from "@/components/features/MitraOCR/utils"

type FileUploadHookProps = {
  onFileSelect: (file: File) => void
  invalidTypeMessage: string
  invalidSizeMessage: string
  maxSize: number
}

/**
 * A hook for handling file uploads with drag and drop functionality
 */
export function useFileUpload({
  onFileSelect,
  invalidTypeMessage,
  invalidSizeMessage,
  maxSize,
}: FileUploadHookProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]

      if (validateFile(file, { invalidTypeMessage, invalidSizeMessage }, maxSize)) {
        onFileSelect(file)
      }
    },
    [onFileSelect, invalidTypeMessage, invalidSizeMessage, maxSize],
  )

  const handleFileInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (validateFile(file, { invalidTypeMessage, invalidSizeMessage }, maxSize)) {
        onFileSelect(file)
      }
      // Reset file input value to allow selecting the same file again
      e.target.value = ""
    },
    [onFileSelect, invalidTypeMessage, invalidSizeMessage, maxSize],
  )

  const handleBrowseClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return {
    isDragging,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    handleBrowseClick,
    acceptedFileTypes: ACCEPTED_FILE_TYPES_STRING,
  }
}
