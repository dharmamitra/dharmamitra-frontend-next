import React from "react"
import Box from "@mui/material/Box"

import SearchDataTargetOptions from "./SearchDataTargetOptions"

type Props = {
  isOpen: boolean
}

export default function SearchOptions({ isOpen }: Props) {
  if (!isOpen) return null

  return (
    <Box sx={{ my: 4 }}>
      <SearchDataTargetOptions />
    </Box>
  )
}
