import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { DMApi } from "@/utils/api"

type Props = Omit<
  DMApi.Schema["Sentence"]["grammatical_analysis"][number],
  "unsandhied"
>

export default function SentenceAnalysis({ lemma, tag, meanings }: Props) {
  const t = useTranslations("translation")
  return (
    <>
      <Typography mb={1} variant="body2">
        <Typography fontWeight={600} component="span" variant="body2">
          {t("tagging.lemma")}:{" "}
        </Typography>
        {lemma}
      </Typography>
      <Typography mb={1} variant="body2">
        <Typography fontWeight={600} component="span" variant="body2">
          {t("tagging.tag")}:{" "}
        </Typography>
        {tag}
      </Typography>
      <Box>
        <Typography fontWeight={600} component="span" variant="body2">
          {t("tagging.meanings")}:
        </Typography>
        <Box component="ul" mt={1}>
          {meanings?.map((meaning, meaningIndex) => (
            <Typography
              key={`translation-tagging-meaning-${meaningIndex}`}
              component="li"
              variant="body2"
            >
              {meaning}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  )
}
