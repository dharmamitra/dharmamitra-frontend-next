"use client"

import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"

export default function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <Box>
      <OutlinedInput
        sx={{
          width: "100%",
        }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "search",
        }}
        rows={3}
        multiline
      />
    </Box>
  )
}
