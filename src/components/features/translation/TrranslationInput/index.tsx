import React from "react"
import dynamic from "next/dynamic"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"

import customTheming from "@/utils/theme/config"

import BoxBottomElementsRow from "../BoxBottomElementsRow"
import TranslationContentBox from "../TranslationContentBox"

const TranslationInput = dynamic(() => import("./TranslationInput"), {
  loading: () => (
    <TranslationContentBox
      testId="translation-input"
      sx={{
        borderBottomLeftRadius: { md: customTheming.shape.inputRadius },
        width: "100%",
      }}
      isLoader
    >
      <BoxBottomElementsRow sx={{ justifyContent: "space-between", p: 1 }}>
        <HighlightOffIcon color="secondary" />
        <KeyboardDoubleArrowRightIcon color="secondary" />
      </BoxBottomElementsRow>
    </TranslationContentBox>
  ),
  ssr: false,
})

export default function TranslationInputBox() {
  return (
    <TranslationContentBox
      testId="translation-input"
      sx={{
        borderBottomLeftRadius: { md: customTheming.shape.inputRadius },
      }}
    >
      <TranslationInput />
    </TranslationContentBox>
  )
}
