import Image from "next/image"
import { Box, Link } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import appConfig from "@/config"

const linkStyles = {
  display: "flex",
  alignItems: "flex-end",
} as const

const LogoImage = () => {
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
        alt="Logo"
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

export default function Logo({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const { basePath } = appConfig

  if (isLocalized) {
    return (
      <>
        <LocalLink href="/" sx={linkStyles}>
          <LogoImage />
        </LocalLink>
      </>
    )
  }

  return (
    <Link href={basePath} sx={linkStyles}>
      <LogoImage />
    </Link>
  )
}
