"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import useTranslationStream from "@/hooks/useTranslationStream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

export default function TranslationOutput() {
  const t = useTranslations()
  const { translationStream, isError, isLoading } = useTranslationStream()

  const errorMessage =
    isError && isError.errorCode === 504
      ? t.rich("generic.error.timeout", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })
      : undefined

  return (
    <>
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
      <BoxBottomElementsRow sx={{ justifyContent: "flex-end" }}>
        <CopyText
          string={translationStream ?? ""}
          ariaLabel={t("translation.copyTranslation")}
        />
      </BoxBottomElementsRow>
    </>
  )
}
