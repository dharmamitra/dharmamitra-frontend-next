import React from "react"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { inputEncodings, modelTypes } from "@/utils/api/global/params"
import { TargetLanguage } from "@/utils/api/translation/params"

import TranslatorLayout from "../TranslatorLayout"
import OptionsLoading from "./OptionsLoading"

export default function ExtendedMitraTranslatorLoading({
  targetLanguages,
}: {
  targetLanguages: TargetLanguage[]
}) {
  return (
    <>
      <ToggleButtonGroup
        color="secondary"
        value={0}
        exclusive
        aria-label="Model"
      >
        {modelTypes.slice(0, 4).map((model, index) => (
          <ToggleButton
            key={model + "-model-option-loader"}
            value={index}
            sx={{ filter: "blur(1px)" }}
          >
            {model}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TranslatorLayout
        inputControls={
          <OptionsLoading options={inputEncodings} keyBase="input-encoding" />
        }
        outputContoles={
          <OptionsLoading options={targetLanguages} keyBase="target-language" />
        }
        inputBlock={null}
        outputBlock={null}
      />
    </>
  )
}
