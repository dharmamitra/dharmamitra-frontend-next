import * as React from "react"
import Image from "next/image"
import { Box } from "@mui/material"

import logo from "@/assets/dm-logo-flat.png"
import LocalLink from "@/components/LocalLink"

export default function Logo() {
  return (
    <Box sx={{ flexGrow: 1, py: 1 }}>
      <LocalLink href="/" sx={{ textDecoration: "none" }}>
        <Image src={logo} alt="Dharmamitra" width={240} />
      </LocalLink>
    </Box>
  )
}
