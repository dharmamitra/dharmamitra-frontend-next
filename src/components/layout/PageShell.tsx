import { ReactNode } from "react"
import { Container, Typography } from "@mui/material"
import type { Breakpoint } from "@mui/system"
import { visuallyHidden } from "@mui/utils"

import Footer from "./Footer"
import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
  title?: ReactNode
  visuallyHiddenTitle?: boolean
  maxWidth?: Breakpoint | false
}

export default function PageShell({
  children,
  title,
  visuallyHiddenTitle,
  maxWidth = "md",
}: Props) {
  return (
    <>
      <Navigation />
      {/* mt for absolute nav offset */}
      <Container component="main" maxWidth={maxWidth} sx={{ mt: 14 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ ...(visuallyHiddenTitle && visuallyHidden) }}
        >
          {title}
        </Typography>
        {children}
      </Container>
      <Footer />
    </>
  )
}
