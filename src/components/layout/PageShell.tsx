import { ReactNode } from "react"
import { Box } from "@mui/material"
import { SxProps } from "@mui/material/styles"

import AppBar from "./AppBar"
import Footer from "./Footer"

type Props = {
  children?: ReactNode
  sx?: SxProps
}

export default function PageShell({ children, sx }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: "100%",
      }}
    >
      <AppBar />
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
