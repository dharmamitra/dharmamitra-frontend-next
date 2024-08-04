import React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { SearchApiTypes } from "@/api"

import ConditionalResultItemExplanation from "./ResultItemExplanation"
import ResultItemHeader from "./ResultItemHeader"

type ResultItemProps = {
  language: string
  segmentnr: string
  title: string
  link: string
  text: string
  primaryRequest?: SearchApiTypes.RequestBody<"/explanation/">
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
  query?: string
  summary?: string
  size: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
}

export default function ResultItem({
  language,
  title,
  link,
  segmentnr,
  text,
  primaryRequest,
  parallelRequest,
  size,
}: ResultItemProps) {
  return (
    <Grid item {...size}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          m: 1.25,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            columnGap: 2,
            rowGap: 1,
            ...(parallelRequest && {
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
            }),
          }}
        >
          <ResultItemHeader
            language={language}
            title={title}
            link={link}
            segmentnr={segmentnr}
          />

          <Typography sx={{ flexGrow: 1, overflowWrap: "anywhere" }}>
            {text}
          </Typography>
        </Box>

        <ConditionalResultItemExplanation
          primaryRequest={primaryRequest}
          parallelRequest={parallelRequest}
        />
      </Box>
    </Grid>
  )
}
