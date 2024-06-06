"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

import { type DMApi } from "@/api"

import SentenceAccordion from "./SentenceAccordion"

export default function TranslationTaggingOutput({
  taggingData,
}: {
  taggingData: DMApi.TaggingResponse
}) {
  const t = useTranslations("translation")

  if (!taggingData) return null

  return (
    <>
      <Typography
        component="h3"
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        {t("tagging.heading")}
      </Typography>

      {taggingData?.map((sentenceData, sentenceIndex) => (
        <SentenceAccordion
          key={`translation-tagging-sentence-${sentenceIndex}`}
          sentenceIndex={sentenceIndex}
          {...sentenceData}
        />
      ))}
    </>
  )
}
