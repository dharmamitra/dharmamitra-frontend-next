import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import appConfig from "@/config"

import OptionsLoading from "../common/OptionsLoading"
import SettingBlock from "../common/SettingBlock"

const LazyTargetLanguageOptionsSelector = dynamic(
  () => import("./LazyTargetLanguageOptionsSelector"),
  {
    loading: () => (
      <OptionsLoading
        options={appConfig.paramOptions.targetLanguages}
        i18nKey="targetLanguages"
      />
    ),
    ssr: false,
  },
)

export default function TranslationTargetLanguageSelector() {
  const t = useTranslations("translation")

  return (
    <SettingBlock
      label={t("targetLanguageSelectLabel")}
      placement="end"
      testId="input-encoding-selector"
    >
      <LazyTargetLanguageOptionsSelector />
    </SettingBlock>
  )
}
