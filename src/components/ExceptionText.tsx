import * as React from "react"
import { useTranslations } from "next-intl"
import { SxProps, Typography } from "@mui/material"

import { ExceptionMessageKey } from "@/utils/validators"

type BaseProps = {
  sx?: SxProps
  type?: "error" | "warning"
}

function Message({ message, sx, type = "warning" }: BaseProps & { message: string }) {
  return (
    <Typography
      variant="body2"
      py={1}
      px={2}
      border={1}
      color={type === "warning" ? "warning.main" : "error.main"}
      borderColor={type === "warning" ? "warning.main" : "error.main"}
      borderRadius={1}
      display="inline-block"
      my={1}
      sx={sx}
    >
      {message}
    </Typography>
  )
}

type MessageProps = {
  message?: string
  exceptionI18nKey?: never
}

type I18nKeyProps = {
  message?: never
  exceptionI18nKey?: ExceptionMessageKey
}

type ExceptionTextProps = BaseProps & { isRendered?: boolean } & (MessageProps | I18nKeyProps)

export default function ExceptionText({
  isRendered = true,
  exceptionI18nKey,
  message,
  ...props
}: ExceptionTextProps) {
  const t = useTranslations("generic")

  if (!isRendered) return null

  if (exceptionI18nKey) {
    return (
      <Message
        type={exceptionI18nKey.includes("Warning") ? "warning" : "error"}
        message={t(`exception.${exceptionI18nKey}`)}
        {...props}
      />
    )
  }

  if (message) {
    return <Message message={message} {...props} />
  }

  return null
}
