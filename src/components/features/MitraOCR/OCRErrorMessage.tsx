import * as React from "react"
import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import OCRResultContainer from "./OCRResultContainer"

import { type ParsedOCRError } from "@/utils/api/search/endpoints/ocr/handlers"

export default function OCRErrorMessage({ ocrError }: { ocrError: ParsedOCRError }) {
  const t = useTranslations("ocr")

  let message = ""
  switch (ocrError.errorCode) {
    case 413:
      message = t("fileTooLarge")
      break
    case 429:
      message = t("tooManyRequests")
      break
    default:
      message = `${t("unknownError")} (${ocrError.errorCode})`
  }

  return (
    <OCRResultContainer>
      <Typography color="error" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </OCRResultContainer>
  )
}
