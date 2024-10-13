import React from "react"
import Box from "@mui/material/Box"

import SearchPrecisionCheckbox from "./SearchPrecisionCheckbox"
// import SearchPostProcessModelButtons from "./SearchPostProcessModelButtons"
import SearchTargetOptions from "./SearchTargetOptions"

type Props = {
  isOpen: boolean
}

export default function SearchOptions({ isOpen }: Props) {
  if (!isOpen) return null

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        my: 4,
      }}
    >
      <SearchTargetOptions />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* TODO: <SearchPostProcessModelButtons /> awaiting BE */}
        <SearchPrecisionCheckbox />
      </Box>
    </Box>
  )
}
