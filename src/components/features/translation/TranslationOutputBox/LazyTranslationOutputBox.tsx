"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import ConditionalWarning from "@/components/Warning"
import useTranslationStream from "@/hooks/translation/useTranslationStream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

export default function TranslationOutput() {
  const t = useTranslations()
  const { parsedStream, exceptionI18nKey, error, isLoading } =
    useTranslationStream()
  const outputRef = React.useRef<HTMLDivElement>(null)

  const errorMessage =
    error && error.errorCode === 504
      ? t.rich("generic.exception.timeout", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })
      : undefined

  if (error) {
    return <Error message={errorMessage} />
  }

  if (exceptionI18nKey && !exceptionI18nKey.includes("Warning")) {
    return <Error message={t(`generic.exception.${exceptionI18nKey}`)} />
  }

  if (isLoading) {
    return <LoadingDots sx={{ m: 2 }} />
  }

  return (
    <>
      <div ref={outputRef}>
        {parsedStream?.map((paragraph, index) => {
          return (
            <Typography
              key={`translation-stream-${index}`}
              sx={{
                whiteSpace: "pre-wrap",
                my: index === 0 ? 0 : 1,
              }}
            >
              {paragraph}
            </Typography>
          )
        })}
      </div>

      <ConditionalWarning i18nExceptionKey={exceptionI18nKey} />

      <BoxBottomElementsRow sx={{ justifyContent: "flex-end" }}>
        <CopyText
          contentRef={outputRef}
          ariaLabel={t("translation.copyTranslation")}
        />
      </BoxBottomElementsRow>
    </>
  )
}
