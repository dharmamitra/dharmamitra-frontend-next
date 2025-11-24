import React from "react"
import Image from "next/image"
import { Box, Link } from "@mui/material"

import tsadraLogo from "@/assets/logos/tsadra.png"
import LocalLink from "@/components/LocalLink"
import appConfig from "@/config"
import { linkAttrs } from "@/utils/constants"

const linkStyles = {
  display: "flex",
  alignItems: "flex-end",
  textDecoration: "none",
} as const

const MitraLogoImage = () => {
  const {
    basePath,
    assetPaths: { logoLarge },
  } = appConfig

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "264px", lg: "324px", xl: "334px" },
        height: "auto",
      }}
    >
      <Image
        src={basePath + logoLarge.src}
        alt="Mitra Logo"
        sizes="(max-width: 1200px) 264px, (max-width: 1536px) 324px, 334px"
        priority
        width={logoLarge.width}
        height={logoLarge.height}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Box>
  )
}

const LogoBlock = ({ mitraLogo }: { mitraLogo: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 2, md: 4 },
      }}
    >
      {mitraLogo}

      <Link
        href="https://tsadra.org/"
        {...linkAttrs}
        sx={{
          ...linkStyles,
          height: "auto",
          width: "100%",
          maxWidth: { xs: "140px", lg: "180px" },
        }}
      >
        <Image
          src={tsadraLogo}
          alt="Tsadra Foundation Logo"
          sizes="(max-width: 1200px) 140px, 180px"
          width={tsadraLogo.width}
          height={tsadraLogo.height}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Link>
    </Box>
  )
}

export default function LogoBlockComponent({ isLocalized = true }: { isLocalized?: boolean }) {
  const { basePath } = appConfig

  if (isLocalized) {
    return (
      <LogoBlock
        mitraLogo={
          <LocalLink href="/" sx={linkStyles}>
            <MitraLogoImage />
          </LocalLink>
        }
      />
    )
  }

  return (
    <LogoBlock
      mitraLogo={
        <Link href={basePath} sx={linkStyles}>
          <MitraLogoImage />
        </Link>
      }
    />
  )
}
