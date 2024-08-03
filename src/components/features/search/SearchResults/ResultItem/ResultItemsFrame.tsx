import React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

import { SearchApiTypes } from "@/api"

import ResultItemExplanation from "../ResultItem/ResultItemExplanation"

export default function ResultItemsFrame({
  children,
  explanationProps,
}: {
  children: React.ReactNode
  explanationProps?: {
    segmentnr: string
    parallelRequest: SearchApiTypes.RequestBody<"/explanation-parallel/">
  }
}) {
  if (explanationProps) {
    const { segmentnr, parallelRequest } = explanationProps

    return (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          mb: 3,
        }}
      >
        <Grid container>{children}</Grid>
        <Box px={2} mt={3}>
          <ResultItemExplanation
            segmentnr={segmentnr}
            parallelRequest={parallelRequest}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Grid
      container
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        mb: 3,
      }}
    >
      {children}
    </Grid>
  )
}
