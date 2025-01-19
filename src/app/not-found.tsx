"use client"

import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"

import Footer from "@/components/layout/Footer/Footer"
import AppBar from "@/components/layout/NavigationBar/AppBar"
import NotFound from "@/components/NotFound"
import theme from "@/utils/theme"

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar isLocalized={false} />
            <NotFound isLocalized={false} />
            <Footer isLocalized={false} />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
