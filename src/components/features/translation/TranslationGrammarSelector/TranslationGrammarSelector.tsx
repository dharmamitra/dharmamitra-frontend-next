import React from "react"
import dynamic from "next/dynamic"
// import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"

const LazyModelSelector = dynamic(() => import("./LazyGrammarSelector"), {
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
