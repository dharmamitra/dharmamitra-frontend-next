"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import { streamMarkers } from "@/api"
import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import LoadingDots from "@/components/LoadingDots"
import Warning from "@/components/Warning"
import useTranslationStream from "@/hooks/useTranslationStream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

const FormatedStream = ({
  translationStream,
}: {
  translationStream: string
}) => {
  const t = useTranslations()
  const paragraphs = translationStream
    ?.split(streamMarkers.lineBreak)
    .filter((p) => p)

  return paragraphs.map((paragraph, index) => {
    const warningPattern = new RegExp(
      String.raw`(^.*?)(${streamMarkers.warning}.*)$`,
    )
    const streamWarningCheck = paragraph.match(warningPattern)

    const [, content, warning] = streamWarningCheck ?? ["", "", ""]

    if (warning) {
      // cast without type checking because next-intl error handling will catch invalid keys.
      const warningI18nKey = warning.replace(
        /[\W]/g,
        "",
      ) as keyof Messages["generic"]["error"]

      return (
        <React.Fragment key={`formated-translation-stream-${index}`}>
          {content ? (
            <Typography
              key={`formated-translation-stream-${index}`}
              component="p"
              sx={{
                whiteSpace: "pre-wrap",
                my: index === 0 ? 0 : 1,
              }}
            >
              {content.trim()}
            </Typography>
          ) : null}
          <Warning message={t(`generic.error.${warningI18nKey}`)} />
        </React.Fragment>
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
        {paragraph.trim()}
      </Typography>
    )
  })
}

export default function TranslationOutput() {
  const t = useTranslations()
  const { translationStream, error, isLoading } = useTranslationStream()
  const outputRef = React.useRef<HTMLDivElement>(null)

  const errorMessage =
    error && error.errorCode === 504
      ? t.rich("generic.error.timeout", {
          newline: (chunks) => (
            <span style={{ display: "block" }}>{chunks}</span>
          ),
        })
      : undefined

  return (
    <>
      {isLoading ? <LoadingDots sx={{ m: 2 }} /> : null}
      {error ? <Error message={errorMessage} /> : null}
      {translationStream ? (
        <div ref={outputRef}>
          <FormatedStream translationStream={translationStream} />
        </div>
      ) : null}
      <BoxBottomElementsRow sx={{ justifyContent: "flex-end" }}>
        <CopyText
          contentRef={outputRef}
          ariaLabel={t("translation.copyTranslation")}
        />
      </BoxBottomElementsRow>
    </>
  )
}
