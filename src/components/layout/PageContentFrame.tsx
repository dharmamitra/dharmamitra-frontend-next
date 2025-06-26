import { ReactNode } from "react"
import Container from "@mui/material/Container"
import { SxProps } from "@mui/material/styles"
import type { Breakpoint } from "@mui/system"

export type PageMaxWidth = Breakpoint | false

export type ContainerStyleProps =
  | {
      maxWidth?: PageMaxWidth
      sx?: SxProps
    }
  | undefined

type PageContainerFrameProps = {
  children?: ReactNode
  maxWidth?: PageMaxWidth
  sx?: SxProps
  contained?: boolean
}

export const stylePageContainer = ({ sx, maxWidth }: ContainerStyleProps = {}) => ({
  maxWidth: maxWidth || "lg",
  sx: {
    flexGrow: 1,
    mt: { xs: 6, md: 8 },
    ...sx,
  },
})

export default function PageContentFrame({
  children,
  maxWidth = "lg",
  sx,
}: PageContainerFrameProps) {
  return (
    <Container component="main" {...stylePageContainer({ sx, maxWidth })}>
      {children}
    </Container>
  )
}
