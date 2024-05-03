import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import { inputEncodings } from "@/utils/api/params"

import OptionsLoading from "../OptionsLoading"
import SettingBlock from "../SettingBlock"

const InputEncodingOptions = dynamic(() => import("./InputEncodingOptions"), {
  loading: () => (
    <OptionsLoading options={inputEncodings} i18nKey="encodings" />
  ),
  ssr: false,
})

export default function TranslationInputEncodingSelector() {
  const t = useTranslations("translation")

  return (
    <SettingBlock
      label={t("encodingSelectLabel")}
      placement="start"
      testId="input-encoding-selector"
    >
      <InputEncodingOptions />
    </SettingBlock>
  )
}
