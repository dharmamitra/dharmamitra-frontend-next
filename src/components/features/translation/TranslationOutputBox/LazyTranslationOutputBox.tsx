"use client"

import React from "react"
import { useTranslations } from "next-intl"

import CopyText from "@/components/CopyText"
import Error from "@/components/Error"
import FormatedStream from "@/components/FormatedStream"
import LoadingDots from "@/components/LoadingDots"
import useTranslationStream from "@/hooks/translation/useTranslationStream"
import { errorPattern, pasrseStreamContent } from "@/utils/api/stream"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

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
          <FormatedStream
            componentId="translation"
            stream={translationStream}
          />
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
