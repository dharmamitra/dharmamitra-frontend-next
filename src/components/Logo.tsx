import * as React from "react"
import Image from "next/image"
import { Box, Link } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import useAppConfig from "@/hooks/useAppConfig"

const getLinkStyles = (width: number) => {
  return {
    textDecoration: "none",
    display: "block",
    width: {
      xs: `${width * 0.73}px`,
      sm: `${width * 0.82}px`,
      md: `${width}px`,
    },
  }
}

const LogoImage = () => {
  const {
    basePath,
    assetPaths: { logo },
  } = useAppConfig()

  return (
    <Image
      src={basePath + logo.src}
      alt="Logo"
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
      }}
      width={logo.width}
      height={logo.height}
      priority
    />
  )
}

export default function Logo({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const {
    basePath,
    assetPaths: { logo },
  } = useAppConfig()

  return (
    <Box sx={{ flexGrow: 1, py: 1 }}>
      {isLocalized ? (
        <LocalLink href="/" sx={getLinkStyles(logo.width)}>
          <LogoImage />
        </LocalLink>
      ) : (
        <Link href={basePath} sx={getLinkStyles(logo.width)}>
          <LogoImage />
        </Link>
      )}
    </Box>
  )
}
