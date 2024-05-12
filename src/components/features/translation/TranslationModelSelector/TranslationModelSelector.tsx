import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"

import { translationModels } from "@/utils/api/params"

import OptionsLoading from "../common/OptionsLoading"

const LazyModelSelector = dynamic(() => import("./LazyModelSelector"), {
  loading: () => (
    <OptionsLoading options={translationModels} i18nKey="models" />
  ),
  ssr: false,
})

export default function TranslationModelSelector() {
  const t = useTranslations("translation")

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        height: "min-content",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "14px !important",
        }}
        component="span"
      >
        {t("modelLabel")}:
      </Typography>
      <LazyModelSelector />
    </Box>
  )
}
