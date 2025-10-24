import * as React from "react"
import { useTranslations } from "next-intl"
import { Box, Button, Typography } from "@mui/material"
import { UseMutationResult } from "@tanstack/react-query"

import CopyTextButton from "@/components/CopyTextButton"
import { makeOCROutputFileName } from "@/components/features/MitraOCR/utils"
import LoadingDots from "@/components/LoadingDots"
import SaveToFileButton from "@/components/SaveToFileButton"
import { saveAsTxtFile } from "@/utils"
import { type ParsedOCRResponse } from "@/utils/api/search/endpoints/ocr/handlers"

import OCRErrorMessage from "./OCRErrorMessage"
import OCRResultContainer from "./OCRResultContainer"

type OCRResultProps = {
  ocrMutation: UseMutationResult<ParsedOCRResponse, Error, File, unknown>
  fileName?: string
}

export default function OCRResult({ ocrMutation, fileName }: OCRResultProps) {
  const t = useTranslations("generic")
  const ocrT = useTranslations("ocr")
  const { data, isSuccess, isPending } = ocrMutation
  const contentRef = React.useRef<HTMLElement | null>(null)

  if (isPending) {
    return (
      <OCRResultContainer hasTitleGutter={false}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {ocrT("processingTimeNoteShort")}
        </Typography>
        <LoadingDots />
      </OCRResultContainer>
    )
  }

  if (data && data.type === "error") {
    return <OCRErrorMessage ocrError={data} />
  }

  if (isSuccess && data && data.type === "json") {
    return (
      <OCRResultContainer>
        <Box
          sx={{
            bgcolor: "grey.100",
            p: 2,
            borderRadius: 1,
            maxHeight: {
              sx: "400px",
              md: "calc(100vh - 220px)",
            },
            overflow: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CopyTextButton contentRef={contentRef} />
            <SaveToFileButton
              contentRef={contentRef}
              fileName={makeOCROutputFileName(fileName)}
              sx={{ fontSize: 26 }}
            />
          </Box>
          <Box ref={contentRef}>
            <Typography
              component="pre"
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {data.extractedText}
            </Typography>
          </Box>
        </Box>
      </OCRResultContainer>
    )
  }

  if (isSuccess && data && data.type === "file") {
    return (
      <OCRResultContainer>
        <Typography sx={{ mb: 2 }}>{ocrT("largeDownload")}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => saveAsTxtFile(data.file, data.fileName)}
        >
          {t("saveToFile")}
        </Button>
      </OCRResultContainer>
    )
  }

  return null
}
