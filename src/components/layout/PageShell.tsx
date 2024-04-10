import { ReactNode } from "react"
import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import { SxProps } from "@mui/material/styles"
import type { Breakpoint } from "@mui/system"

import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
  maxWidth?: Breakpoint | false
  sx?: SxProps
}

export default function PageShell({ children, maxWidth = "lg", sx }: Props) {
  return (
    <>
      <Navigation />
      <Box sx={{ mb: 12, ...sx }}>
        <Container
          component="main"
          maxWidth={maxWidth}
          sx={{ mt: { xs: 6, md: 8 } }}
        >
          {children}
        </Container>
      </Box>
    </>
  )
}
