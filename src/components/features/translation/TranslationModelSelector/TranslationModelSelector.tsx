import React from "react"
import dynamic from "next/dynamic"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { translationModels } from "@/utils/api/translation/params"

const LazyModelSelector = dynamic(() => import("./LazyModelSelector"), {
  loading: () => (
    <ToggleButtonGroup color="secondary" value={0} exclusive aria-label="Model">
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

type Props = {
  isEnabled: boolean
}

export default function TranslationModelSelector({ isEnabled }: Props) {
  if (!isEnabled) return null

  return <LazyModelSelector />
}
