import { use } from "react"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Box, Button, Typography } from "@mui/material"

import { getNewsPosts } from "@/app/[locale]/(static-pages)/news/utils"
import { DefaultPageParams, Metadata } from "@/app/types"
import { PageContentFrame } from "@/components/layout"
import Timeline from "@/components/Timeline"
import { defaultLocale } from "@/i18n"

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "News" })

  return {
    title: t("title"),
  }
}

export default function NewsPage({ params }: DefaultPageParams) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations("News")
  const result = use(getNewsPosts(locale))

  if (result.error) {
    throw new Error(result.error.message)
  }

  const { posts } = result

  if (locale !== defaultLocale && !posts.length) {
    return (
      <PageContentFrame maxWidth="md">
        <Typography variant="h1" textAlign="center" mb={4}>
          {t("h1")}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={8}>
          <Typography variant="body1" textAlign="center">
            {t("localeNotAvailable")}
          </Typography>
          <Button variant="contained" color="secondary" href="/news">
            {t("goToDefaultLocale")}
          </Button>
        </Box>
      </PageContentFrame>
    )
  }

  return (
    <PageContentFrame sx={{ pb: { xs: 4, md: 8 } }}>
      <Typography variant="h1" textAlign="center" mb={8}>
        {t("h1")}
      </Typography>

      {posts.length > 0 ? (
        <Timeline items={posts} />
      ) : (
        <Typography variant="body1" textAlign="center">
          {t("noNews")}
        </Typography>
      )}
    </PageContentFrame>
  )
}
