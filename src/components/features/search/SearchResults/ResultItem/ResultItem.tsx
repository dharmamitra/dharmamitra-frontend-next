import React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import ConditionalResultItemExplanation from "./ResultItemExplanation"
import ResultItemHeader from "./ResultItemHeader"
import ConditionalResultItemTranslation from "./ResultItemTranslation"

type ResultItemProps = {
  language: string
  segmentnr: string
  title: string
  link: string
  text: string
  isPrimaryQuery?: boolean
  isParallelQuery?: boolean
  query?: string
  summary?: string
  translation?: string
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export default function ResultItem({
  language,
  title,
  link,
  segmentnr,
  text,
  translation,
  isPrimaryQuery,
  query,
  summary,
  ...sizes
}: ResultItemProps) {
  return (
    <Grid item {...sizes}>
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

        <ConditionalResultItemTranslation translation={translation} />

        <ConditionalResultItemExplanation
          isPrimaryQuery={isPrimaryQuery}
          segmentnr={segmentnr}
          query={query}
          summary={summary}
        />
      </Box>
    </Grid>
  )
}
