import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import ToolSelectorTabs from "@/components/features/ToolSelectorTabs/ToolSelectorTabs"
import PageShell from "@/components/layout/PageShell"
import TranslationFeature from "@/features/translation"
import useAppConfig from "@/hooks/useAppConfig"
import {
  I18nMetadataHandlerProps,
  pickMessages,
  supportedLocales,
} from "@/i18n"

// TODO: keep an eye on `next-intl` updates to see when `generateStaticParams` can be removed: https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-generatestaticparams-to-applocalelayouttsx
export const generateStaticParams = () => {
  return supportedLocales.map((locale) => ({ locale }))
}

export default function Home({ params: { locale } }: I18nMetadataHandlerProps) {
  unstable_setRequestLocale(locale)
  const { search } = useAppConfig().featureFlags
  const t = useTranslations("Home")

  const messages = useMessages() as Messages
  const translationMessages = pickMessages({
    messages,
    messageKeys: ["translation", "search", "generic"],
  })

  if (search === true) {
    return (
      <NextIntlClientProvider messages={translationMessages}>
        <PageShell maxWidth="xl" sx={{ mb: { xs: 12, md: 34 } }}>
          <ToolSelectorTabs />
        </PageShell>
      </NextIntlClientProvider>
    )
  }

  return (
    <NextIntlClientProvider messages={translationMessages}>
      <PageShell maxWidth="xl" sx={{ mb: { xs: 12, md: 34 } }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          color="primary"
          sx={{
            mb: { xs: 4, lg: 10 },
          }}
        >
          {t("h1")}
        </Typography>

        <TranslationFeature />
      </PageShell>
    </NextIntlClientProvider>
  )
}
