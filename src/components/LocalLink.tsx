"use client"

import React, { ComponentProps } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Link as MuiLink, SxProps, Theme } from "@mui/material"
import { alpha, styled } from "@mui/material/styles"

import type { AppPathnames } from "@/config"
import { Link as NavigationLink } from "@/navigation"

const LocalLinkButton = styled(NavigationLink)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  paddingBlock: theme.spacing(1),
  paddingInline: theme.spacing(1.5),
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  lineHeight: 1.75,
  textTransform: "uppercase",
  textDecoration: "none",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "transparent",
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}))

const NavigationLinkForwardRef = React.forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NavigationLink<AppPathnames>>
>((props, ref) => <NavigationLink {...props} ref={ref} />)
NavigationLinkForwardRef.displayName = "NavigationLinkForwardRef"

export default function LocalLink<Pathname extends AppPathnames>({
  href,
  children,
  sx,
  variant = "link",
  ...rest
}: ComponentProps<typeof NavigationLink<Pathname>> & {
  sx?: SxProps<Theme>
  // TODO: Add support for "button" and "outline-button"
  variant?: "link" | "button" | "outline-button" | "text-button"
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/"
  const isActive = pathname === href

  return (
    <>
      {variant === "link" ? (
        <MuiLink
          sx={sx}
          href={href}
          aria-current={isActive ? "page" : undefined}
          {...rest}
          component={NavigationLinkForwardRef}
        >
          {children}
        </MuiLink>
      ) : (
        <LocalLinkButton
          href={href}
          aria-current={isActive ? "page" : undefined}
        >
          {children}
        </LocalLinkButton>
      )}
    </>
  )
}
