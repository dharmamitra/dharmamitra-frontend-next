import { use } from "react"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Box, Button, Typography } from "@mui/material"

import {
  DefaultPageParams,
  Metadata,
  UnsupportedNewsPostParams,
} from "@/app/types"
import { PageContentFrame } from "@/components/layout"

export async function generateMetadata({
  params,
}: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "News" })

  return {
    title: t("title"),
  }
}

export default function NewsPage({ params }: UnsupportedNewsPostParams) {
  const { locale, unsupported } = use(params)
  setRequestLocale(locale)

  const t = useTranslations("News")

  return (
    <PageContentFrame maxWidth="md">
      <Typography variant="h1" textAlign="center" mb={4}>
        {t("h1")}
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
        <Typography variant="body1" textAlign="center">
          {t("localeNotAvailable")}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          href={`/news/${unsupported}`}
        >
          {t("goToDefaultLocale")}
        </Button>
      </Box>
    </PageContentFrame>
  )
}
