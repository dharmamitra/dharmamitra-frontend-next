import * as React from "react"
import Image from "next/image"
import { Link } from "@mui/material"

import tsadraLogo from "@/assets/logos/tsadra.png"
import { linkAttrs } from "@/utils/constants"

const getLinkStyles = (width: number) => {
  return {
    textDecoration: "none",
    display: "block",
    overflow: "hidden",
    width: {
      xs: `${width * 0.11}px`,
      sm: `${width * 0.15}px`,
      md: `${width * 0.175}px`,
    },
  }
}

export default function SponsorLogo() {
  return (
    <Link
      href="https://tsadra.org/"
      sx={getLinkStyles(tsadraLogo.width)}
      {...linkAttrs}
    >
      <Image
        src={tsadraLogo}
        alt="Tsadra Foundation Logo"
        sizes="100vw"
        width={tsadraLogo.width * 0.175}
        height={tsadraLogo.height * 0.175}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Link>
  )
}
