"use client"

import React from "react"
import Typography from "@mui/material/Typography"

import { TranslationContentBox } from "@/components/styled"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import useTranslationResults from "@/hooks/useTranslationResults"

export default function TranslationResults() {
  const { data, isLoading, isError } = useTranslationResults()
  const rows = useResponsiveContentRows()

  return (
    <TranslationContentBox
      item
      xs={12}
      md={6}
      rows={rows}
      sx={(theme) => ({
        backgroundColor: "grey.100",
        overflow: "clip",
        p: 2,
        borderBottomLeftRadius: { xs: theme.custom.shape.inputRadius, md: 0 },
        borderBottomRightRadius: theme.custom.shape.inputRadius,
      })}
      data-testid="translation-results"
    >
      {isLoading ? (
        <Typography
          component="p"
          variant="h5"
          data-testid="translation-loading"
        >
          Loading...
        </Typography>
      ) : null}
      {isError ? (
        <Typography component="p" variant="h5" data-testid="translation-error">
          Error
        </Typography>
      ) : null}
      {data ? (
        <Typography
          data-testid="request-translation"
          variant="reader"
          component="p"
          mt={0}
        >
          {data.map((part) => part)}
        </Typography>
      ) : null}
    </TranslationContentBox>
  )
}
