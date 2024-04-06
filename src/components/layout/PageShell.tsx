import { ReactNode } from "react"
import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import { SxProps } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import type { Breakpoint } from "@mui/system"
import { visuallyHidden } from "@mui/utils"

import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
  h1?: ReactNode
  visuallyHiddenH1?: boolean
  maxWidth?: Breakpoint | false
  sx?: SxProps
}

export default function PageShell({
  children,
  h1,
  visuallyHiddenH1,
  maxWidth = "md",
  sx,
}: Props) {
  return (
    <>
      <Navigation />
      <Box sx={sx}>
        <Container component="main" maxWidth={maxWidth} sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            color="primary"
            sx={{
              ...(visuallyHiddenH1 && visuallyHidden),
              mb: { xs: 4, lg: 10 },
            }}
          >
            {h1}
          </Typography>
          {children}
        </Container>
      </Box>
    </>
  )
}
