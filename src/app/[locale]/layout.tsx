import type { Metadata } from "next"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

import QueryProvider from "@/utils/QueryProvider"
import theme from "@/utils/theme"

export const metadata: Metadata = {
  title: "Dharma Mitra",
  description: "Exploring the teachings of the Buddha",
  icons: {
    icon: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.png` }],
  },
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
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
