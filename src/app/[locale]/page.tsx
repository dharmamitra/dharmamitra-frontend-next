import * as React from "react"
import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import { PageShell } from "@/components/layout"
import FeatureSelector, {
  FeatureTabPanel,
} from "@/features/core/FeatureSelector"
import SearchBox from "@/features/core/SearchBox"

// As we're using query parameters that are only known
// at request time, we need to make sure we're using
// dynamic rendering (i.e. no SSG).
export const dynamic = "force-dynamic"

type Props = {
  searchParams?: {
    view?: "search" | "translate"
    page?: string
  }
}

export default function Home({ searchParams }: Props) {
  const t = useTranslations("Home")

  const tabIndex = searchParams?.view === "translate" ? 1 : 0

  return (
    <PageShell title={t("title")} visuallyHiddenTitle>
      <FeatureSelector
        tabIndex={tabIndex}
        tabLabels={{ 0: t("search.tabLabel"), 1: t("translate.tabLabel") }}
      >
        <FeatureTabPanel value={tabIndex} index={0}>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            sx={{ mt: 2, mb: 5 }}
          >
            {t("search.heading")}
          </Typography>
          <SearchBox placeholder={t("search.placeholder")} />
        </FeatureTabPanel>
        <FeatureTabPanel value={tabIndex} index={1}>
          <Typography
            component="h2"
            variant="h4"
            align="center"
            sx={{ mt: 2, mb: 5 }}
          >
            {t("translate.placeholder")}
          </Typography>
        </FeatureTabPanel>
      </FeatureSelector>
    </PageShell>
  )
}
