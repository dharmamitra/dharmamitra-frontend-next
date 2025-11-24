import { use } from "react"
import { notFound } from "next/navigation"
import { useTranslations, hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import { DefaultPageParams, Metadata } from "@/app/types"
import { PageContentFrame } from "@/components/layout"
import { getPageLocaleRoutes, routing } from "@/i18n/routing"

export function generateStaticParams() {
  return getPageLocaleRoutes()
}

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "pages.team.dharmamitra" })

  return {
    title: t("title"),
  }
}

export default function ExampleParallelRouteTeamPage({ params }: DefaultPageParams) {
  const { locale } = use(params)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const t = useTranslations("pages.team.dharmamitra")

  return (
    <PageContentFrame maxWidth="md">
      <hgroup>
        <Typography variant="h1" textAlign="center" mb={1}>
          {t("h1")}:
        </Typography>
        <Typography variant="h2" component="p" textAlign="center" mb={4}>
          Example Parallel Route Team Page
        </Typography>
      </hgroup>

      <Typography>
        Our team is passionate about developing and sharing tools for developling in and sharing the
        Dhamma, for the benefit of any and all beings.
      </Typography>
    </PageContentFrame>
  )
}
