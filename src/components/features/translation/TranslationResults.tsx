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
import TextSkeleton from "@/components/TextSkeleton"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import useTranslationResults from "@/hooks/useTranslationResults"

export default function TranslationResults() {
  const t = useTranslations("translation")
  const { data, isLoading, isError } = useTranslationResults()

  const translation = React.useMemo(
    () =>
      data ? data.reduce((compliation, part) => compliation + part, "") : "",
    [data],
  )

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
      {isLoading ? <TextSkeleton /> : null}
      {isError ? <Error /> : null}
      {data ? (
        <Typography
          data-testid="request-translation"
          variant="reader"
          component="p"
          mt={0}
        >
          {translation}
        </Typography>
      ) : null}
      <BoxBottomElementsRow spread="flex-end">
        <CopeText string={translation} ariaLabel={t("copyTranslation")} />
      </BoxBottomElementsRow>
    </TranslationContentBox>
  )
}
