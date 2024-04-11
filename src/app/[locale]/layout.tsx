import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

import { I18nMetadataHandlerProps, Metadata } from "@/i18n"
import QueryProvider from "@/utils/QueryProvider"
import theme from "@/utils/theme"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "/"),
    title: {
      default: t("title"),
      template: `%s · Dharmamitra`,
    },
    description: t("description"),
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body>
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
