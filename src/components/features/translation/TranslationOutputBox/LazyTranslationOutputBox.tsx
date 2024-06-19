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

type ErrorMessageKey = keyof Messages["generic"]["error"]

const warningPattern = new RegExp(
  String.raw`(^.*?)(${streamMarkers.warning}.*)$`,
)

const errorPattern = new RegExp(String.raw`(^.*?)(${streamMarkers.error}.*)$`)

const pasrseStreamContent = (string: string, regExp: RegExp) => {
  const exceptionCheck = string.match(regExp)
  const [, content, exception] = exceptionCheck ?? ["", "", ""]
  let exceptionI18nKey: ErrorMessageKey | undefined

  if (exception) {
    // cast without type checking because next-intl error handling will catch invalid keys.
    exceptionI18nKey = exception.replace(/[\W]/g, "") as ErrorMessageKey
  }

  return { content, exceptionI18nKey }
}

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
    const { content, exceptionI18nKey } = pasrseStreamContent(
      paragraph,
      warningPattern,
    )

    if (exceptionI18nKey) {
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
          <Warning message={t(`generic.error.${exceptionI18nKey}`)} />
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

  const { exceptionI18nKey } = pasrseStreamContent(
    translationStream ?? "",
    errorPattern,
  )

  if (error) {
    return <Error message={errorMessage} />
  }

  if (exceptionI18nKey) {
    return <Error message={t(`generic.error.${exceptionI18nKey}`)} />
  }

  return (
    <>
      {isLoading ? <LoadingDots sx={{ m: 2 }} /> : null}

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
