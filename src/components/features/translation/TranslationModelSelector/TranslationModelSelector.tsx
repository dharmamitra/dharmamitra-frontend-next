import React from "react"
import dynamic from "next/dynamic"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { translationModels } from "@/utils/api/params"

const LazyModelSelector = dynamic(() => import("./LazyModelSelector"), {
  loading: () => (
    <ToggleButtonGroup
      color="secondary"
      value={0}
      exclusive
      aria-label="Platform"
    >
      {translationModels.map((model, index) => (
        <ToggleButton
          key={model + "-model-option-loader"}
          value={index}
          sx={{ filter: "blur(1px)" }}
        >
          {model === "NO" ? "no Model" : model}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  ),
  ssr: false,
})

export default function TranslationModelSelector() {
  return <LazyModelSelector />
}
