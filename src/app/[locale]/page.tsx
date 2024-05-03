import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"

import PageShell from "@/components/layout/PageShell"
import { supportedLocales } from "@/config"
import TranslationFeature from "@/features/translation"
import { I18nMetadataHandlerProps, pickMessages } from "@/i18n"

/* 
If we need to use query parameters (as in earlier iterations -
see diff for 5b3b300b2b) that are only known
at request time, we need to make sure we're using
dynamic rendering (i.e. no SSG).

export const dynamic = "force-dynamic"
*/

// TODO: keep an eye on `next-intl` updates to see when `generateStaticParams` can be removed: https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-generatestaticparams-to-applocalelayouttsx
export const generateStaticParams = () => {
  return supportedLocales.map((locale) => ({ locale }))
}

export default function Home({ params: { locale } }: I18nMetadataHandlerProps) {
  unstable_setRequestLocale(locale)

  const t = useTranslations("Home")

  const messages = useMessages() as Messages
  const translationMessages = pickMessages({
    messages,
    messageKeys: ["translation", "generic"],
  })

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
