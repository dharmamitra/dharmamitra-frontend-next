import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import OptionsLoading from "../OptionsLoading"
import SettingBlock from "../SettingBlock"

const TargetLanguageOptions = dynamic(() => import("./TargetLanguageOptions"), {
  loading: () => <OptionsLoading />,
  ssr: false,
})

export default function TranslationTargetLanguageSelector() {
  const t = useTranslations("translation")

  return (
    <SettingBlock
      label={t("targetLanguageSelectLabel")}
      placement="end"
      testId="input-encoding-selector"
    >
      <TargetLanguageOptions />
    </SettingBlock>
  )
}
