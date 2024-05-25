import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import Switch from "@mui/material/Switch"

import LabelledSetting from "../common/LabelledSetting"

const LazyModelSelector = dynamic(() => import("./LazyGrammarSelector"), {
  loading: () => <Switch checked={false} color="secondary" disabled />,
  ssr: false,
})

export default function TranslationModelSelector() {
  const t = useTranslations("translation")

  return (
    <LabelledSetting label={t("grammarLabel")} labelSx={{ ml: 1, mb: 0 }}>
      <LazyModelSelector />
    </LabelledSetting>
  )
}
