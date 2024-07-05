import React from "react"
import Box from "@mui/material/Box"

import SearchPostProcessModelButtons from "./SearchPostProcessModelButtons"
import SearchTargetOptions from "./SearchTargetOptions"
import SearchTypeSwitch from "./SearchTypeSwitch"

type Props = {
  isOpen: boolean
}

export default function SearchOptions({ isOpen }: Props) {
  if (!isOpen) return null

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        my: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <SearchPostProcessModelButtons />
        <SearchTypeSwitch />
      </Box>

      <SearchTargetOptions />
    </Box>
  )
}
