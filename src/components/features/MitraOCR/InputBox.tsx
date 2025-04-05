import * as React from "react"
// import { useTranslations } from "next-intl"
import { Box, Button, Typography } from "@mui/material"

import UploadIcon from "@/components/icons/Upload"

import {
  ACCEPTED_FILE_TYPES_STRING,
  MAX_FILE_SIZE_MB,
  validateFile,
} from "./utils"

type InputBoxProps = {
  className?: string
  onFileSelect: (file: File) => void
}

export default function InputBox({ className, onFileSelect }: InputBoxProps) {
  // const t = useTranslations("search")
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

      if (validateFile(file)) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const handleFileInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (validateFile(file)) {
        onFileSelect(file)
      }
      // Reset file input value to allow selecting the same file again
      e.target.value = ""
    },
    [onFileSelect],
  )

  const handleBrowseClick = React.useCallback(() => {
    fileInputRef.current?.click()
  }, [])

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
        accept={ACCEPTED_FILE_TYPES_STRING}
      />

      <UploadIcon />

      <Box sx={{ textAlign: "center", mt: 1, mb: 2 }}>
        <Typography variant="h6" component="p" color="text.primary">
          {/* {t("upload.title")} */}
          Drag and drop your file here
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* {t("upload.title")} */}
          Supported file types: PDF, JPG, PNG, WEBP (max size:{" "}
          {MAX_FILE_SIZE_MB}MB)
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ my: 1, maxWidth: "520px" }}
        >
          {/* {t("upload.title")} */}
          Please note that very long files can take a few minutes to process and
          it is advised to break them into smaller chunks.
        </Typography>
      </Box>

      <Button variant="contained" color="inherit" onClick={handleBrowseClick}>
        Browse files
      </Button>
    </Box>
  )
}
