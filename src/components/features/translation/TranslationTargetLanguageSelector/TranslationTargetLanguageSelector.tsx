import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import { allTargetLanguages } from "@/utils/api/translation/params"

import OptionsLoading from "../common/OptionsLoading"
import SettingBlock from "../common/SettingBlock"

const LazyTargetLanguageOptionsSelector = dynamic(
  () => import("./LazyTranslationTargetLanguageSelector"),
  {
    loading: () => (
      <OptionsLoading options={allTargetLanguages} keyBase="target-language" />
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
