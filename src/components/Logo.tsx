import * as React from "react"
import Image from "next/image"
import { Box } from "@mui/material"

import logo from "@/assets/dm-logo-flat.png"
import LocalLink from "@/components/LocalLink"

export default function Logo() {
  return (
    <Box sx={{ flexGrow: 1, py: 1 }}>
      <LocalLink
        href="/"
        sx={{
          textDecoration: "none",
          display: "block",
          width: { xs: "175px", sm: "200px", md: "240px" },
        }}
      >
        <Image
          src={logo}
          alt="Dharmamitra"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </LocalLink>
    </Box>
  )
}
