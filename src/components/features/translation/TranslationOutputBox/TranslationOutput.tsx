"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import useTranslationStream from "@/hooks/useTranslationStream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

const FormatedStream = ({
  translationStream,
}: {
  translationStream: string
}) => {
  const paragraphs = translationStream?.split(/🔽/g).filter((p) => p)

  return paragraphs.map((paragraph, index) => {
    const idiomaticContent = paragraph.match(/(^.*?)(\s-\s.*)$/)

    if (idiomaticContent) {
      return (
        <Typography
          key={`formated-translation-stream-${index}`}
          component="p"
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          <i style={{ fontWeight: 500 }}>{idiomaticContent[1]}</i>
          {idiomaticContent[2]}
        </Typography>
      )
    }

    return (
      <Typography
        key={`formated-translation-stream-${index}`}
        component="p"
        sx={{
          whiteSpace: "pre-wrap",
          my: index === 0 ? 0 : 1,
        }}
      >
        {paragraph}
      </Typography>
    )
  })
}

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
        <FormatedStream translationStream={translationStream} />
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
