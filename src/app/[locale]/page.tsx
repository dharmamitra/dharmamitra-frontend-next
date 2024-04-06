import { useTranslations } from "next-intl"

import { PageShell } from "@/components/layout"
import TranslationFeature from "@/features/translation"

// As we're using query parameters that are only known
// at request time, we need to make sure we're using
// dynamic rendering (i.e. no SSG).
export const dynamic = "force-dynamic"

export default function Home() {
  const t = useTranslations("Home")

  return (
    <PageShell h1={t("h1")} maxWidth="xl" visuallyHiddenH1>
      <TranslationFeature />
    </PageShell>
  )
}
