"use client"

import React, { ComponentProps } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Link as MuiLink, SxProps, Theme } from "@mui/material"
import { alpha, styled } from "@mui/material/styles"

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
  ComponentProps<typeof NavigationLink>
>((props, ref) => <NavigationLink {...props} ref={ref} />)
NavigationLinkForwardRef.displayName = "NavigationLinkForwardRef"

export default function LocalLink({
  href,
  children,
  sx,
  variant = "link",
  // eslint-disable-next-line no-unused-vars -- this is just to exclude the "as" prop
  as,
  ...rest
}: ComponentProps<typeof NavigationLink> & {
  sx?: SxProps<Theme>
  // TODO: Add support for "button" and "outline-button"
  variant?: "link" | "button" | "outline-button" | "text-button"
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/"
  const isActive = pathname === href

  if (href.toString().startsWith("http")) {
    Object.assign(rest, { target: "_blank", rel: "noopener noreferrer" })
  }

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
          {...rest}
        >
          {children}
        </LocalLinkButton>
      )}
    </>
  )
}
