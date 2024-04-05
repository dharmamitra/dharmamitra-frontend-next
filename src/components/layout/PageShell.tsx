import { ReactNode } from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import type { Breakpoint } from "@mui/system"
import { visuallyHidden } from "@mui/utils"

import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
  h1?: ReactNode
  visuallyHiddenH1?: boolean
  maxWidth?: Breakpoint | false
}

export default function PageShell({
  children,
  h1,
  visuallyHiddenH1,
  maxWidth = "md",
}: Props) {
  return (
    <>
      <Navigation />
      <Container component="main" maxWidth={maxWidth} sx={{ mt: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ ...(visuallyHiddenH1 && visuallyHidden), mb: 4 }}
        >
          {h1}
        </Typography>
        {children}
      </Container>
    </>
  )
}
