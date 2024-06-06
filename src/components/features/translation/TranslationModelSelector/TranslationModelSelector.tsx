import React from "react"
import dynamic from "next/dynamic"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { translationModels } from "@/utils/api/params"

const LazyModelSelector = dynamic(() => import("./LazyModelSelector"), {
  loading: () => (
    <ToggleButtonGroup
      color="primary"
      value={0}
      exclusive
      aria-label="Platform"
    >
      {translationModels.map((model, index) => (
        <ToggleButton key={model + "-model-option-loader"} value={index}>
          {model}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  ),
  ssr: false,
})

export default function TranslationModelSelector() {
  return <LazyModelSelector />
}
