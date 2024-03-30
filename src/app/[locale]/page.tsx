import { useTranslations } from "next-intl"

import { PageShell } from "@/components/layout"
import FeatureSelectorTabs from "@/features/FeatureSelectorTabs"

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
      <FeatureSelectorTabs
        tabIndex={tabIndex}
        tabLabels={{ 0: t("search.tabLabel"), 1: t("translation.tabLabel") }}
        headings={{
          search: t("search.heading"),
          translation: t("translation.heading"),
        }}
        placeholders={{
          search: t("search.placeholder"),
          translation: t("translation.placeholder"),
        }}
      />
    </PageShell>
  )
}
