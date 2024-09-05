import React from "react"
import Box from "@mui/material/Box"
import Grid, { Grid2Props } from "@mui/material/Grid2"
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
  isParallel?: boolean
  query?: string
  summary?: string
  size: Grid2Props["size"]
}

export default function ResultItem({
  language,
  title,
  link,
  segmentnr,
  text,
  primaryRequest,
  parallelRequest,
  isParallel,
  size,
}: ResultItemProps) {
  const fullResultContentRef = React.useRef<HTMLDivElement>(null)

  return (
    <Grid size={size} ref={fullResultContentRef}>
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
            ...(isParallel && {
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
            fullResultContentRef={fullResultContentRef}
          />

          <Typography
            sx={{
              flexGrow: 1,
              fontSize: "1.25rem !important",
              overflowWrap: "anywhere",
              px: 1,
            }}
          >
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
