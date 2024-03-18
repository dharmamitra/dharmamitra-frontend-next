"use client"

import React, { ComponentProps } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Link as MuiLink, SxProps, Theme } from "@mui/material"

import type { AppPathnames } from "@/config"
import { Link as NavigationLink } from "@/navigation"

const NavigationLinkForwardRef = React.forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NavigationLink<AppPathnames>>
>((props, ref) => <NavigationLink {...props} ref={ref} />)
NavigationLinkForwardRef.displayName = "NavigationLinkForwardRef"

export default function LocalLink<Pathname extends AppPathnames>({
  href,
  children,
  sx,
  ...rest
}: ComponentProps<typeof NavigationLink<Pathname>> & { sx?: SxProps<Theme> }) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/"
  const isActive = pathname === href

  return (
    <MuiLink
      sx={sx}
      href={href}
      aria-current={isActive ? "page" : undefined}
      {...rest}
      component={NavigationLinkForwardRef}
    >
      {children}
    </MuiLink>
  )
}
