import React from "react"
import dynamic from "next/dynamic"
// import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"

import OptionsLoading from "../common/OptionsLoading"

const LazyModelSelector = dynamic(() => import("./LazyGrammarSelector"), {
  loading: () => <OptionsLoading options={["off", "on"]} i18nKey="grammar" />,
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
