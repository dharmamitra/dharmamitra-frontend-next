import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"
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

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function DualFeatureMitraPage() {
  return (
    <>
      <StorageCheck />
      <PageShell maxWidth="xl" sx={{ mb: { xs: 6, md: 14 } }}>
        <Typography component="h1" sx={visuallyHidden}>
          Dharmamitra
        </Typography>
        <DualFeatureMitra />
      </PageShell>
    </>
  )
}


export default function HomePage() {
  const { hasSearch } = useAppConfig().featureFlags
  const t = useTranslations("Home")

  if (hasSearch === true) {
    return <DualFeatureMitraPage />
  }

  return (
    <>
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
    </>
  )
}

