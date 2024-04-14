"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import {
  BoxBottomElementsRow,
  TranslationContentBox,
} from "@/components/styled"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import useTranslationStream from "@/hooks/useTranslationStream"

export default function TranslationResults() {
  const t = useTranslations()
  const { translationStream, isError, isLoading } = useTranslationStream()

  const rows = useResponsiveContentRows()

  const errorMessage =
    isError && isError.errorCode === 504
      ? t.rich("generic.error.timeout", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })
      : undefined

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
      {isLoading ? <LoadingDots sx={{ m: 2 }} /> : null}
      {isError ? <Error message={errorMessage} /> : null}
      {translationStream ? (
        <Typography
          data-testid="request-translation"
          variant="reader"
          component="p"
          mt={0}
        >
          {translationStream}
        </Typography>
      ) : null}
      <BoxBottomElementsRow spread="flex-end">
        <CopyText
          string={translationStream ?? ""}
          ariaLabel={t("translation.copyTranslation")}
        />
      </BoxBottomElementsRow>
    </TranslationContentBox>
  )
}
