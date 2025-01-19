import { ReactNode } from "react"
import { Box } from "@mui/material"
import { SxProps } from "@mui/material/styles"

import Footer from "./Footer"
import NavigationBar from "./NavigationBar"

type Props = {
  children?: ReactNode
  sx?: SxProps
}

export default function PageShell({ children, sx }: Props) {
  return (
    <>
      <NavigationBar />
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
    </>
  )
}
