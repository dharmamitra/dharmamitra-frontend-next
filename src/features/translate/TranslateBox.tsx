"use client"

import React from "react"
import Box from "@mui/material/Box"
import OutlinedInput from "@mui/material/OutlinedInput"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

export default function TranslateBox({ placeholder }: { placeholder: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["translate"],
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      return response.json()
    },
  })

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

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((post: any) => (
          <Box key={post.id} sx={{ my: 3 }}>
            <Typography variant="h5" component="h3">
              {post.title}
            </Typography>
            <Typography>{post.body}</Typography>
          </Box>
        ))}
    </Box>
  )
}
