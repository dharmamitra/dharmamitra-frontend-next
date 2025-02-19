import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

export default function ResultsHeading({ results }: { results?: number }) {
  const t = useTranslations("search")

  if (results) {
    return (
      <Typography component="h2" variant="h5" color="text.secondary">
        {results} {t("results").toLowerCase()}
      </Typography>
    )
  }

  return (
    <Typography component="h2" variant="h5" mb={2} color="text.secondary">
      {t("results")}
    </Typography>
  )
}
