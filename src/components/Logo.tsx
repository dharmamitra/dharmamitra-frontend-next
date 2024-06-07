import * as React from "react"
import Image from "next/image"
import { Box } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import useAppConfig from "@/hooks/useAppConfig"

export default function Logo() {
  const {
    basePath,
    assetPaths: { logo },
  } = useAppConfig()

  return (
    <Box sx={{ flexGrow: 1, py: 1 }}>
      <LocalLink
        href="/"
        sx={{
          textDecoration: "none",
          display: "block",
          width: {
            xs: `${logo.width * 0.73}px`,
            sm: `${logo.width * 0.82}px`,
            md: `${logo.width}px`,
          },
        }}
      >
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
      </LocalLink>
    </Box>
  )
}
