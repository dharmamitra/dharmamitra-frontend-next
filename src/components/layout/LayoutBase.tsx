import { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"

import { SupportedLocale } from "@/app/types"
import theme from "@/utils/theme"

type Props = {
  children: ReactNode
  locale: SupportedLocale
}

const baseStyles = {
  width: "100%",
  height: "100%",
} as const

/**
 * Base layout providing theme, i18n, and MUI cache.
 * Does not include client dependent AppLayout
 */
export default async function LayoutBase({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html lang={locale} style={baseStyles}>
      <body style={baseStyles}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
