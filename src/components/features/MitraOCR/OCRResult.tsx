import * as React from "react"
// import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { UseMutationResult } from "@tanstack/react-query"

import LoadingDots from "@/components/LoadingDots"

import { OCRResponse } from "./MitraOCR"

type OCRResultProps = {
  ocrMutation: UseMutationResult<OCRResponse, Error, File, unknown>
}

const ResultContainer = ({
  children,
  hasTitleGutter = true,
}: {
  children: React.ReactNode
  hasTitleGutter?: boolean
}) => {
  // const t = useTranslations("search")
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom={hasTitleGutter}>
        Result:
      </Typography>
      {children}
    </Box>
  )
}

export default function OCRResult({ ocrMutation }: OCRResultProps) {
  // const t = useTranslations("search")

  const { data, isSuccess, isError, isPending, error } = ocrMutation

  if (isPending) {
    return (
      <ResultContainer hasTitleGutter={false}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Please note large files can take several minutes to process.
        </Typography>
        <LoadingDots />
      </ResultContainer>
    )
  }

  if (isError) {
    return (
      <ResultContainer>
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error?.message || "Failed to process the file. Please try again."}
        </Typography>
      </ResultContainer>
    )
  }

  if (isSuccess && data && data.pages < 6) {
    return (
      <ResultContainer>
        <Typography
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            bgcolor: "grey.100",
            p: 2,
            borderRadius: 1,
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {data.extractedText}
        </Typography>
      </ResultContainer>
    )
  }

  return null
}
