import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

const creditAttributes = {
  variant: "body2",
  textAlign: "center",
  mt: 1,
  color: "text.secondary",
} as const

const LocalizedCredit = () => {
  const t = useTranslations("sidebar")
  return <Typography {...creditAttributes}>{t("credit")}</Typography>
}

const FallbackCredit = () => {
  return <Typography {...creditAttributes}>{"Powered by Gemini API"}</Typography>
}

export default function Credit({ isLocalized = true }: { isLocalized?: boolean }) {
  return <>{isLocalized ? <LocalizedCredit /> : <FallbackCredit />}</>
}
