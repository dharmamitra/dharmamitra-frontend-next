import React from "react"
import dynamic from "next/dynamic"

import customTheming from "@/utils/theme/config"

import TranslationContentBox from "../common/TranslationContentBox"

const LazyTranslationOutput = dynamic(
  () => import("./LazyTranslationOutputBox"),
)

export default function TranslationOutputBox() {
  return (
    <TranslationContentBox
      testId="translation-output"
      sx={{
        backgroundColor: customTheming.palette.panel,
        p: 2,
        borderBottomLeftRadius: { xs: customTheming.shape.inputRadius, md: 0 },
        borderBottomRightRadius: customTheming.shape.inputRadius,
      }}
    >
      <LazyTranslationOutput />
    </TranslationContentBox>
  )
}
