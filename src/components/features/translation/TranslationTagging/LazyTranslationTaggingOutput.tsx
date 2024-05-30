"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
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
    <Box
      sx={{
        maxWidth: "1100px",
        mt: 3,
        p: 3,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        {t("tagging.heading")}
      </Typography>

      <Box
        sx={{
          width: "100%",
          px: 3,
          py: 4,
          backgroundColor: (theme) => theme.custom.palette.panel,
        }}
      >
        <>
          {taggingData?.map((sentenceData, sentenceIndex) => (
            <SentenceAccordion
              key={`translation-tagging-sentence-${sentenceIndex}`}
              sentenceIndex={sentenceIndex}
              {...sentenceData}
            />
          ))}
        </>
      </Box>
    </Box>
  )
}
