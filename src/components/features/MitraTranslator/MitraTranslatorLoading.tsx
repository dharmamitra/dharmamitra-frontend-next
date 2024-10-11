import React from "react"

import useAppConfig from "@/hooks/useAppConfig"
import { inputEncodings } from "@/utils/api/global/params"

import OptionsLoading from "./common/OptionsLoading"
import TranslatorLayout from "./TranslatorLayout"

export default function MitraTranslatorLoading() {
  const { targetLanguages: servedTargetLanguages } =
    useAppConfig().customParamOptions
  return (
    <TranslatorLayout
      inputControls={
        <OptionsLoading options={inputEncodings} keyBase="input-encoding" />
      }
      outputContoles={
        <OptionsLoading
          options={servedTargetLanguages}
          keyBase="target-language"
        />
      }
      inputBlock={null}
      outputBlock={null}
    />
  )
}
