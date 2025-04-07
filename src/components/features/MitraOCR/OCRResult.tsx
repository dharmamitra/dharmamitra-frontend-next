import * as React from "react"
import { Box, Button, Typography } from "@mui/material"
import { UseMutationResult } from "@tanstack/react-query"

import CopyTextButton from "@/components/CopyTextButton"
import { makeOCROutputFileName } from "@/components/features/MitraOCR/utils"
import LoadingDots from "@/components/LoadingDots"
import SaveToFileButton from "@/components/SaveToFileButton"
import { saveAsTxtFile } from "@/utils"
import { type ParsedOCRResponse } from "@/utils/api/search/endpoints/ocr/handlers"

type OCRResultProps = {
  ocrMutation: UseMutationResult<ParsedOCRResponse, Error, File, unknown>
  fileName?: string
}

const ResultContainer = ({
  children,
  hasTitleGutter = true,
}: {
  children: React.ReactNode
  hasTitleGutter?: boolean
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom={hasTitleGutter}>
        Result:
      </Typography>
      {children}
    </Box>
  )
}

export default function OCRResult({ ocrMutation, fileName }: OCRResultProps) {
  const { data, isSuccess, isError, isPending, error } = ocrMutation
  const contentRef = React.useRef<HTMLElement | null>(null)

  if (isPending) {
    return (
      <ResultContainer hasTitleGutter={false}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Large files can take several minutes to process.
        </Typography>
        <LoadingDots />
      </ResultContainer>
    )
  }

  if (isError) {
    return (
      <ResultContainer>
        <Typography color="error" sx={{ mt: 2 }}>
          {error?.message || "Failed to process the file. Please try again."}
        </Typography>
      </ResultContainer>
    )
  }

  if (isSuccess && data && data.type === "json") {
    return (
      <ResultContainer>
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
            <CopyTextButton
              contentRef={contentRef}
              ariaLabel="Copy extracted text"
              tooltip="Copy extracted text"
            />
            <SaveToFileButton
              contentRef={contentRef}
              ariaLabel="Save extracted text"
              tooltip="Save extracted text"
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
      </ResultContainer>
    )
  }

  if (isSuccess && data && data.type === "file") {
    return (
      <ResultContainer>
        <Typography sx={{ mb: 2 }}>
          The extracted text is large and can be download as a file.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => saveAsTxtFile(data.file, data.fileName)}
        >
          Save text file
        </Button>
      </ResultContainer>
    )
  }

  return null
}
