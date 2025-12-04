import { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"

import { SupportedLocale } from "@/app/types"
import { PageShell } from "@/components/layout"
import theme from "@/utils/theme"

type Props = {
  children: ReactNode
  locale: SupportedLocale
}

const baseStyles = {
  width: "100%",
  height: "100%",
} as const

export default async function LayoutBase({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html lang={locale} style={baseStyles}>
      <body style={baseStyles}>
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
