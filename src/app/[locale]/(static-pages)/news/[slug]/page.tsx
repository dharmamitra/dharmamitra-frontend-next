import { use } from "react"
import { setRequestLocale } from "next-intl/server"
import ArrowBack from "@mui/icons-material/ArrowBack"
import { Box, Button, Divider, Typography } from "@mui/material"

import {
  getNewsPost,
  getStaticNewsPostsParams,
} from "@/app/[locale]/(static-pages)/news/utils"
import { DefaultPageParams, NewsPostParams } from "@/app/types"
import { PageContentFrame } from "@/components/layout"
import LocalLink from "@/components/LocalLink"
import { formatDate } from "@/utils"

export const dynamicParams = false

export async function generateStaticParams({ params }: DefaultPageParams) {
  const { locale } = await params
  const posts = await getStaticNewsPostsParams(locale)
  return posts
}

export async function generateMetadata({ params }: NewsPostParams) {
  const { locale, slug } = await params
  const result = await getNewsPost({ slug, locale })

  if (result.error) {
    throw new Error(result.error.message)
  }

  const { title } = result.post

  return {
    title,
  }
}

export default function NewsPostPage({ params }: NewsPostParams) {
  const { locale, slug } = use(params)
  setRequestLocale(locale)

  const result = use(getNewsPost({ slug, locale }))

  if (result.error) {
    throw new Error(result.error.message)
  }

  const { title, date, content, type, location } = result.post

  return (
    <PageContentFrame
      maxWidth="md"
      sx={{
        mt: 5,
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBack />}
        size="small"
        sx={{
          pl: 0,
          m: 0,
          mb: 5,
          color: "text.secondary",
        }}
      >
        <LocalLink href="/news">Back to news</LocalLink>
      </Button>

      <Box component="article" sx={{ pb: { xs: 4, md: 8 } }}>
        <Box component="header" mb={4}>
          <Typography variant="body2" color="text.secondary">
            {formatDate({ date, locale, options: { month: "long" } })}
          </Typography>

          <Typography variant="h1" mt={2}>
            {title}
          </Typography>

          <Typography color="text.secondary">
            {type}
            {location && `, ${location}`}
          </Typography>
        </Box>
        <Divider sx={{ mb: 6 }} />

        {content}
      </Box>
    </PageContentFrame>
  )
}
