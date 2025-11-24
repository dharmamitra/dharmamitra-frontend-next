"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

import SentenceAccordion from "./SentenceAccordion"

import { DMFetchApi } from "@/api"
import Error from "@/components/Error"
import SkeletonGroup from "@/components/SkeletonGroup"
import useTaggingRequestBody from "@/hooks/translation/useTaggingRequestBody"
import { linkAttrs } from "@/utils/constants"

export default function TranslationTaggingOutput() {
  const t = useTranslations()

  const requestBody = useTaggingRequestBody()

  const { data, isLoading, isError } = useQuery({
    queryKey: DMFetchApi.tagging.makeQueryKey(requestBody),
    queryFn: () => {
      return DMFetchApi.tagging.call(requestBody)
    },
    enabled: false,
  })

  if (isError) {
    return <Error message={t("translation.tagging.unsuccessful")} />
  }

  return (
    <>
      <Typography component="h3" variant="h5" sx={{ fontWeight: "bold" }}>
        {t("translation.tagging.heading")}
      </Typography>

      <Typography variant="body2" mt={1} mb={4} sx={{ color: "text.secondary" }}>
        {t.rich("translation.tagging.credit", {
          link: (chunks) => (
            <Link
              sx={{ fontWeight: 500 }}
              href="http://www.sanskrit-linguistics.org/dcs/"
              {...linkAttrs}
            >
              {chunks}
            </Link>
          ),
        })}
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
