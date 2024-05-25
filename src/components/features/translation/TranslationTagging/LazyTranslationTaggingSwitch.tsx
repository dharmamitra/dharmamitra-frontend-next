"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Switch from "@mui/material/Switch"
import { useSetAtom } from "jotai"

import { isTaggingEnabledAtom } from "@/atoms"
import useTaggingData from "@/hooks/useTaggingData"

export default function LazyTranslationTaggingSwitch() {
  const t = useTranslations("translation")

  const { taggingData } = useTaggingData()

  const [checked, setChecked] = React.useState(false)

  const setTaggingEnabled = useSetAtom(isTaggingEnabledAtom)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setTaggingEnabled(event.target.checked)
  }

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": t("tagging.ariaLabel") }}
      color="secondary"
      disabled={!checked && (!taggingData || taggingData.length === 0)}
    />
  )
}
