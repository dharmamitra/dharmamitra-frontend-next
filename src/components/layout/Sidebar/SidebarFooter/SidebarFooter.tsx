"use client"

import Box from "@mui/material/Box"

import { SIDEBAR_TRANSITION_DURATION } from "../constants"

import Credit from "./Credit"
import { Socials } from "./Socials"

type Props = {
  isRendered?: boolean
}

export default function SidebarFooter({ isRendered = true }: Props) {
  return (
    <Box
      sx={{
        pb: 2,
        opacity: isRendered ? 1 : 0,
        transition: `opacity ${SIDEBAR_TRANSITION_DURATION}ms ease`,
      }}
    >
      <Socials sx={{ justifyContent: "center" }} />
      <Credit />
    </Box>
  )
}
