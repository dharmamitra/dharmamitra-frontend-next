import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Box } from "@mui/material"

import { inputEncodings } from "@/utils/api/translation/params"

import OptionsLoading from "../translation/common/OptionsLoading"
import SettingBlock from "../translation/common/SettingBlock"

const InputEncodingSelector = dynamic(
  () => import("./LazyInputEncodingSelector"),
  {
    loading: () => (
      <OptionsLoading options={inputEncodings} keyBase="input-encoding" />
    ),
    ssr: false,
  },
)

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

export default function InputEncodingSelectorFrame({
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
