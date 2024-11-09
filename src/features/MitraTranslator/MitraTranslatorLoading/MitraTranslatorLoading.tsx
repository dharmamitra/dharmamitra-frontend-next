import React from "react"

import useAppConfig from "@/hooks/useAppConfig"
import { inputEncodings } from "@/utils/api/global/params"

import TranslatorLayout from "../TranslatorLayout"
import ExtendedMitraTranslatorLoading from "./ExtendedMitraTranslatorLoading"
import OptionsLoading from "./OptionsLoading"

export default function MitraTranslatorLoading() {
  const {
    customParamOptions: { targetLanguages: servedTargetLanguages },
    featureFlags: { hasTranslateExtendedOptions },
  } = useAppConfig()

  if (hasTranslateExtendedOptions) {
    return (
      <ExtendedMitraTranslatorLoading targetLanguages={servedTargetLanguages} />
    )
  }

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
