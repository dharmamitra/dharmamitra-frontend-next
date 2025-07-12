import React from "react"
import Box from "@mui/material/Box"

import SearchTypeCheckbox from "../../../paramSettings/SearchTypeCheckbox"
// import SearchPostProcessModelButtons from "./SearchPostProcessModelButtons"
import TargetControls from "./TargetControls"

type Props = {
  isOpen: boolean
}

export default function SubInputSearchControls({ isOpen }: Props) {
  if (!isOpen) return null

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: 2,
        my: 4,
      }}
    >
      {/* Disabled for Summer 2025 release. Due to be re-enabled in due course. */}
      {/* <TargetControls /> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* TODO: <SearchPostProcessModelButtons /> awaiting BE */}
        <SearchTypeCheckbox />
      </Box>
    </Box>
  )
}
