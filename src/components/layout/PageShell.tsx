import { ReactNode } from "react"
import { Container, Typography } from "@mui/material"
import type { Breakpoint } from "@mui/system"

import Footer from "./Footer"
import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
  title: ReactNode
  maxWidth?: Breakpoint | false
}

export default function PageShell({ children, title, maxWidth = "md" }: Props) {
  return (
    <>
      <Navigation />
      <Container component="main" maxWidth={maxWidth}>
        <Typography variant="h1">{title}</Typography>
        {children}
      </Container>
      <Footer />
    </>
  )
}
