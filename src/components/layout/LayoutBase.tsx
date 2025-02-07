import { ReactNode } from "react"
import Script from "next/script"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"

import { PageShell } from "@/components/layout"
import theme from "@/utils/theme"

type Props = {
  children: ReactNode
  locale: SupportedLocale
}

const FeedbucketScript = () => {
  return (
    <Script
      type="text/javascript"
      src="https://cdn.feedbucket.app/assets/feedbucket.js"
      data-feedbucket="0Dpm0Hi1Il7FCeI5qnst"
    />
  )
}

export default async function LayoutBase({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <FeedbucketScript />
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NextIntlClientProvider messages={messages}>
              <PageShell>{children}</PageShell>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
