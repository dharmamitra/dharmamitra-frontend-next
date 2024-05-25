import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import Switch from "@mui/material/Switch"

import LabelledSetting from "../common/LabelledSetting"

const LazyTranslationTaggingSwitch = dynamic(
  () => import("./LazyTranslationTaggingSwitch"),
  {
    loading: () => <Switch checked={false} color="secondary" disabled />,
    ssr: false,
  },
)

export default function TranslationTaggingSwitch() {
  const t = useTranslations("translation")

  return (
    <LabelledSetting label={t("tagging.label")} labelSx={{ ml: 1, mb: 0 }}>
      <LazyTranslationTaggingSwitch />
    </LabelledSetting>
  )
}
