import { ReactNode } from "react"
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

export default async function LayoutBase({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
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
