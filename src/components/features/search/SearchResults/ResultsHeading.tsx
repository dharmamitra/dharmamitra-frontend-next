import React from "react"
import { useTranslations } from "next-intl"
import Typography from "@mui/material/Typography"

export default function ResultsHeading() {
  const t = useTranslations("search")

  return (
    <Typography component="h2" variant="h5" mb={2} color="text.secondary">
      {t("results")}
    </Typography>
  )
}
