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

export function TsadraLogo() {
  return (
    <Link href="https://tsadra.org/" {...linkAttrs} sx={linkStyles}>
      <Image
        src={tsadraLogo}
        alt="Tsadra Foundation Logo"
        sizes="(max-width: 1200px) 220px, 286px"
        width={tsadraLogo.width}
        height={tsadraLogo.height}
        style={{
          width: "auto",
          height: "100%",
        }}
      />
    </Link>
  )
}

export default function LogoBlock({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const { basePath } = appConfig

  if (isLocalized) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
          gap: { xs: 2, md: 6 },
        }}
      >
        <LocalLink href="/" sx={linkStyles}>
          <MitraLogoImage />
        </LocalLink>
        <TsadraLogo />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        gap: { xs: 2, md: 6 },
      }}
    >
      <Link href={basePath} sx={linkStyles}>
        <MitraLogoImage />
      </Link>
      <TsadraLogo />
    </Box>
  )
}
