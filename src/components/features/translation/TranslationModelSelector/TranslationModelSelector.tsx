import React from "react"
import dynamic from "next/dynamic"
// import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"

import { inputEncodings } from "@/utils/api/params"

import OptionsLoading from "../common/OptionsLoading"

const LazyModelSelector = dynamic(() => import("./LazyModelSelector"), {
  loading: () => (
    <OptionsLoading options={inputEncodings} i18nKey="encodings" />
  ),
  ssr: false,
})

export default function TranslationModelSelector() {
  // const t = useTranslations("translation")

  return (
    <Box>
      <LazyModelSelector />
    </Box>
  )
}
