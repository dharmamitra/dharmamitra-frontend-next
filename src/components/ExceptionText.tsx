import * as React from "react"
import { useTranslations } from "next-intl"
import { SxProps, Typography } from "@mui/material"

import { ErrorMessageKey } from "@/utils/validators"

type Props = {
  exceptionI18nKey: ErrorMessageKey | undefined
  sx?: SxProps
}

export default function ExceptionText({ exceptionI18nKey, sx }: Props) {
  const t = useTranslations("generic")

  if (!exceptionI18nKey) return null

  return (
    <Typography
      variant="body2"
      color="error.main"
      py={1}
      px={2}
      border={1}
      borderColor="error.main"
      borderRadius={1}
      display="inline-block"
      my={1}
      sx={sx}
    >
      {t(`error.${exceptionI18nKey}`)}
    </Typography>
  )
}
