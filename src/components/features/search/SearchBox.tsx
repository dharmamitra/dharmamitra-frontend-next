"use client"

import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"

import { setRows } from "@/features/utils"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames } from "@/utils/api/params"

export default function SearchBox({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  const [, setIsQueryEnabled] = React.useState(false)
  const { input, handleInputChange } = useInputWithUrlParam<string>(
    apiParamsNames.search.search_input,
  )

  return (
    <Box className={className}>
      <OutlinedInput
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          overflow: "clip",
        }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "search",
        }}
        value={input}
        rows={setRows(input)}
        multiline
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && input.length > 0) {
            setIsQueryEnabled(true)
          }
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setIsQueryEnabled(true)
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>Coming soon...</Typography>
      </Box>
    </Box>
  )
}
