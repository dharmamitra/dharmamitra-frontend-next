"use client"

import React, { ComponentProps } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Button, Link as MuiLink, SxProps, Theme } from "@mui/material"
import { ButtonProps } from "@mui/material/Button"

import { Link as NavigationLink } from "@/i18n/routing"
import { linkAttrs } from "@/utils/constants"

const NavigationLinkForwardRef = React.forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NavigationLink>
>((props, ref) => <NavigationLink {...props} ref={ref} />)
NavigationLinkForwardRef.displayName = "NavigationLinkForwardRef"

/**
 * A link component that works with the i18n routing system.
 * The `href` prop should give the default locale path.
 */
export default function LocalLink({
  href,
  children,
  sx,
  variant = "link",
  buttonVariant,
  buttoColor = "inherit",
}: ComponentProps<typeof NavigationLink> & {
  sx?: SxProps<Theme>
  variant?: "link" | "button"
  buttonVariant?: ButtonProps["variant"]
  buttoColor?: ButtonProps["color"]
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
          {...(href.toString().startsWith("http") && linkAttrs)}
          component={NavigationLinkForwardRef}
        >
          {children}
        </MuiLink>
      ) : (
        <Button
          href={href.toString()}
          sx={sx}
          variant={buttonVariant}
          color={buttoColor}
          LinkComponent={NavigationLink}
        >
          {children}
        </Button>
      )}
    </>
  )
}
