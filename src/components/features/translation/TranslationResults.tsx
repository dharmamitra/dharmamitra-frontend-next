"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import CopeText from "@/components/CopeText"
import Error from "@/components/Error"
import {
  BoxBottomElementsRow,
  TranslationContentBox,
} from "@/components/styled"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import useTranslationResults from "@/hooks/useTranslationResults"

export default function TranslationResults() {
  const t = useTranslations("translation")
  const { translationEventStream, isError } = useTranslationResults()

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
      {isError ? <Error /> : null}
      {translationEventStream ? (
        <Typography
          data-testid="request-translation"
          variant="reader"
          component="p"
          mt={0}
        >
          {translationEventStream}
        </Typography>
      ) : null}
      <BoxBottomElementsRow spread="flex-end">
        <CopeText
          string={translationEventStream}
          ariaLabel={t("copyTranslation")}
        />
      </BoxBottomElementsRow>
    </TranslationContentBox>
  )
}
