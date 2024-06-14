import { ReactNode } from "react"
import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import { SxProps } from "@mui/material/styles"
import type { Breakpoint } from "@mui/system"

import Footer from "./Footer"
import NavigationBar from "./NavigationBar"

type Props = {
  children?: ReactNode
  maxWidth?: Breakpoint | false
  sx?: SxProps
  contained?: boolean
}

export default function PageShell({
  children,
  maxWidth = "lg",
  contained = true,
  sx,
}: Props) {
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
        {contained ? (
          <Container
            component="main"
            maxWidth={maxWidth}
            sx={{ flexGrow: 1, mt: { xs: 6, md: 8 } }}
          >
            {children}
          </Container>
        ) : (
          children
        )}
      </Box>
      <Footer />
    </>
  )
}
