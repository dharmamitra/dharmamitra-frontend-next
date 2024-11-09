import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"
import visuallyHidden from "@mui/utils/visuallyHidden"

import PageShell from "@/components/layout/PageShell"
import StorageCheck from "@/components/StorageCheck"
import DualFeatureMitra from "@/features/DualFeatureMitra"
import MitraTranslator from "@/features/MitraTranslator"
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

export default function HomePage({
  params: { locale },
}: I18nMetadataHandlerProps) {
  unstable_setRequestLocale(locale)
  const { hasSearch } = useAppConfig().featureFlags
  const t = useTranslations("Home")

  const allMessages = useMessages() as Messages
  const messages = pickMessages({
    messages: allMessages,
    messageKeys: ["translation", "search", "globalParams", "generic"],
  })

  if (hasSearch === true) {
    return <DualFeatureMitraPage messages={messages} />
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <StorageCheck />
      <PageShell maxWidth="xl" sx={{ mb: { xs: 6, md: 14 } }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            mb: { xs: 4, lg: 10 },
          }}
        >
          {t("h1")}
        </Typography>

        <MitraTranslator />
      </PageShell>
    </NextIntlClientProvider>
  )
}

function DualFeatureMitraPage({ messages }: { messages: Partial<Messages> }) {
  return (
    <NextIntlClientProvider messages={messages}>
      <StorageCheck />
      <PageShell maxWidth="xl" sx={{ mb: { xs: 6, md: 14 } }}>
        <Typography component="h1" sx={visuallyHidden}>
          Dharmamitra
        </Typography>
        <DualFeatureMitra />
      </PageShell>
    </NextIntlClientProvider>
  )
}
