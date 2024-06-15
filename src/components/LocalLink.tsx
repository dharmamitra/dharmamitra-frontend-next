"use client"

import React, { ComponentProps } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Button, Link as MuiLink, SxProps, Theme } from "@mui/material"
import { ButtonProps } from "@mui/material/Button"

import { Link as NavigationLink } from "@/navigation"

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
  buttonVariant,
  buttoColor = "inherit",
  ...rest
}: ComponentProps<typeof NavigationLink> & {
  sx?: SxProps<Theme>
  variant?: "link" | "button"
  buttonVariant?: ButtonProps["variant"]
  buttoColor?: ButtonProps["color"]
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
        <Button
          href={href.toString()}
          sx={sx}
          variant={buttonVariant}
          color={buttoColor}
          LinkComponent={NavigationLink}
          // {...rest}
        >
          {children}
        </Button>
      )}
    </>
  )
}
