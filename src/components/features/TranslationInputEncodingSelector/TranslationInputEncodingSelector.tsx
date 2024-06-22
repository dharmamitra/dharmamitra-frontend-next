import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Box } from "@mui/material"

import { inputEncodings } from "@/utils/api/params"

import OptionsLoading from "../translation/common/OptionsLoading"
import SettingBlock from "../translation/common/SettingBlock"

const LazyTranslationInputEncodingSelector = dynamic(
  () => import("./LazyTranslationInputEncodingSelector"),
  {
    loading: () => (
      <OptionsLoading
        options={inputEncodings}
        i18nKey="commonStreamParams.encodings"
      />
    ),
    ssr: false,
  },
)

type Props = {
  labelled?: boolean
  isOpen?: boolean
}

export default function TranslationInputEncodingSelector({
  labelled,
  isOpen = true,
}: Props) {
  const t = useTranslations("commonStreamParams")

  if (!isOpen) return null

  return (
    <>
      {labelled ? (
        <SettingBlock
          label={t("encodingSelectLabel")}
          placement="start"
          testId="input-encoding-selector"
        >
          <LazyTranslationInputEncodingSelector />
        </SettingBlock>
      ) : (
        <Box
          sx={{
            display: "inline-flex",
            px: 1,
          }}
        >
          <LazyTranslationInputEncodingSelector />
        </Box>
      )}
    </>
  )
}
