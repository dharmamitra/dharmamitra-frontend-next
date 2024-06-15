"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import Error from "@/components/Error"
import SkeletonGroup from "@/components/SkeletonGroup"
import useTaggingData from "@/hooks/useTaggingData"

import SentenceAccordion from "./SentenceAccordion"

export default function TranslationTaggingOutput() {
  const t = useTranslations()

  const { data, isLoading, isError } = useTaggingData()

  if (isError) {
    return <Error message={t("translation.tagging.unsuccessful")} />
  }

  return (
    <>
      <Typography
        component="h3"
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        {t("translation.tagging.heading")}
      </Typography>

      {isLoading ? <SkeletonGroup /> : null}

      {data?.sentences?.map((sentenceData, sentenceIndex) => (
        <SentenceAccordion
          key={`translation-tagging-sentence-${sentenceIndex}`}
          sentenceIndex={sentenceIndex}
          {...sentenceData}
        />
      ))}
    </>
  )
}
