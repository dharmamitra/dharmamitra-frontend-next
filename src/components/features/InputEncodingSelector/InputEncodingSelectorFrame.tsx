import React from "react"
import { useTranslations } from "next-intl"
import { Box } from "@mui/material"

import SettingBlock from "../translation/common/SettingBlock"
import InputEncodingSelector from "./InputEncodingSelector"

const LabledInputEncodingSelector = () => {
  const t = useTranslations("commonStreamParams")

  return (
    <SettingBlock
      label={t("encodingSelectLabel")}
      placement="start"
      testId="input-encoding-selector"
    >
      <InputEncodingSelector />
    </SettingBlock>
  )
}

type Props = {
  labelled?: boolean
  isOpen?: boolean
}

export default function TranslationInputEncodingSelector({
  labelled,
  isOpen = true,
}: Props) {
  if (!isOpen) return null

  if (labelled) return <LabledInputEncodingSelector />

  return (
    <Box
      sx={{
        display: "inline-flex",
        px: 1,
      }}
    >
      <InputEncodingSelector />
    </Box>
  )
}
