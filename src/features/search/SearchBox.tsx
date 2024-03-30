"use client"

import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

import DM_API from "@/api"

export default function SearchBox({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  const [isQueryEnabled, setIsQueryEnabled] = React.useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.search.makeQueryKey({
      searchInput: placeholder,
      queryParams: {},
    }),
    queryFn: () =>
      DM_API.search.call({ searchInput: placeholder, queryParams: {} }),
    enabled: isQueryEnabled,
  })

  return (
    <Box className={className}>
      <OutlinedInput
        sx={{
          width: "100%",
        }}
        placeholder={placeholder}
        inputProps={{
          "aria-label": "search",
        }}
        rows={1}
        multiline
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
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error</Typography>}
        {JSON.stringify(data as string)}
      </Box>
    </Box>
  )
}
