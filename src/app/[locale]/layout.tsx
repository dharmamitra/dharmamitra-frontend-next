import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocaleRoute } from '@/i18n/routing';

import { getTranslations } from "next-intl/server"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { NuqsAdapter } from "nuqs/adapters/react"

import appConfig from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"
import QueryProvider from "@/utils/QueryProvider"
import theme from "@/utils/theme"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(appConfig.siteUrl),
    title: {
      default: t("title"),
      template: `%s · ${appConfig.siteName}`,
    },
    // TODO: handle description for envs.
    description: t("description"),
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default async function LocaleRootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  if (!isValidLocaleRoute(locale)) {
    return notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AppRouterCacheProvider>
              <NuqsAdapter>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {children}
                </ThemeProvider>
              </NuqsAdapter>
            </AppRouterCacheProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
