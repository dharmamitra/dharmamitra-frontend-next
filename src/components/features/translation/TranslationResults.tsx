"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import CopeText from "@/components/CopeText"
// import Error from "@/components/Error"
import {
  BoxBottomElementsRow,
  TranslationContentBox,
} from "@/components/styled"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import useTranslationResults from "@/hooks/useTranslationResults"

export default function TranslationResults() {
  const t = useTranslations("translation")
  const { eventStream } = useTranslationResults()

  const translation = React.useMemo(
    () =>
      eventStream
        ? eventStream.reduce((compliation, part) => compliation + part, "")
        : "",
    [eventStream],
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
      {/* {isError ? <Error /> : null} */}
      {translation ? (
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
