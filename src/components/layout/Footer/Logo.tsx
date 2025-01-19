import Image from "next/image"
import { Box, Link } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import useAppConfig from "@/hooks/useAppConfig"

const linkStyles = {
  display: "flex",
  alignItems: "flex-end",
  height: "100%",
} as const

const LogoImage = () => {
  const {
    basePath,
    assetPaths: { logoLarge },
  } = useAppConfig()
  return (
    <Box
      sx={{
        maxWidth: { xs: "264px", lg: "324px", xl: "334px" },
        maxHeight: { xs: "264px", md: "170px", lg: "unset" },
      }}
    >
      <Image
        src={basePath + logoLarge.src}
        alt="Logo"
        sizes="100vw"
        style={{
          width: "100%",
          height: "100%",
        }}
        width={logoLarge.width}
        height={logoLarge.height}
      />
    </Box>
  )
}

export default function Logo({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const { basePath } = useAppConfig()

  if (isLocalized) {
    return (
      <LocalLink href="/" sx={linkStyles}>
        <LogoImage />
      </LocalLink>
    )
  }

  return (
    <Link href={basePath} sx={linkStyles}>
      <LogoImage />
    </Link>
  )
}
