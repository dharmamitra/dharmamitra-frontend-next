import React from "react"
import dynamic from "next/dynamic"

import customTheming from "@/utils/theme/config"

import TranslationContentBox from "../common/TranslationContentBox"

const TranslationOutput = dynamic(() => import("./TranslationOutput"))

export default function TranslationOutputBox() {
  return (
    <TranslationContentBox
      testId="translation-output"
      sx={{
        backgroundColor: "grey.100",
        overflow: "clip",
        p: 2,
        borderBottomLeftRadius: { xs: customTheming.shape.inputRadius, md: 0 },
        borderBottomRightRadius: customTheming.shape.inputRadius,
      }}
    >
      <TranslationOutput />
    </TranslationContentBox>
  )
}
