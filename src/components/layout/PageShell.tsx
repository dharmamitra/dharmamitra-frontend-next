import { ReactNode } from "react"
import { cookies } from "next/headers"
import { Box } from "@mui/material"
import { SxProps } from "@mui/material/styles"

import AppBar from "./AppBar"
import Footer from "./Footer"

import { cookieKeys } from "@/utils/constants"

type Props = {
  children?: ReactNode
  sx?: SxProps
}

export default async function PageShell({ children, sx }: Props) {
  const cookieStore = await cookies()
  const showExtensionBanner = cookieStore.get(cookieKeys.extensionBannerClosed)?.value !== "true"
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "100%",
      }}
    >
      <AppBar showExtensionBanner={showExtensionBanner} />
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          ...sx,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
