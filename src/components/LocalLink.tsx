"use client"

import React, { ComponentProps } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Link as MuiLink, SxProps, Theme } from "@mui/material"
import { alpha, darken, styled } from "@mui/material/styles"

import { Link as NavigationLink } from "@/navigation"

const LocalLinkButton = styled(NavigationLink, {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "sx",
})<{
  variant?: "button" | "outlined-button" | "text-button"
}>(({ theme, variant }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  paddingBlock: theme.spacing(1),
  paddingInline: theme.spacing(1.5),
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  lineHeight: 1.75,
  textTransform: "uppercase",
  textDecoration: "none",
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(["background-color"], {
    duration: theme.transitions.duration.short,
  }),
  ...(variant === "button" && {
    color: theme.palette.common.white,
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: darken(theme.palette.primary.main, 0.15),
    },
  }),
  ...(variant === "text-button" && {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  }),
  ...(variant === "outlined-button" && {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  }),
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
  // TODO: Add support for "button" and "outlined-button"
  variant?: "link" | "button" | "outlined-button" | "text-button"
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
          sx={sx}
          href={href}
          variant={variant}
          aria-current={isActive ? "page" : undefined}
          {...rest}
        >
          {children}
        </LocalLinkButton>
      )}
    </>
  )
}
