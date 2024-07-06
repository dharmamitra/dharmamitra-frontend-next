import React from "react"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { SearchApiTypes } from "@/api"

type ResultText = {
  before: string
  main: string
  after: string
}

type Result = {
  language: string
  segmentnr: string
  title: string
  link: string
  text: ResultText
}

function Result({ language, title, segmentnr, text }: Result) {
  return (
    <Grid item xs={6}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, m: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "grey.200",
            px: 1,
            py: 0.5,
            borderRadius: "4px",
          }}
        >
          <div>
            <Typography variant="subtitle1" fontWeight={600} p="0">
              {title}
            </Typography>
            <Typography variant="body2" color="grey.800">
              {segmentnr}
            </Typography>
          </div>
          <Chip label={language} variant="outlined" />
        </Box>

        <Typography>
          {text.before}
          {text.main}
          {text.after}
        </Typography>
      </Box>
    </Grid>
  )
}

export default function ParralelSearchResultItems({
  results,
}: {
  results: SearchApiTypes.ParallelRresponse["results"]
}) {
  return (
    <Box>
      {results.map((result, index) => (
        <Grid
          container
          key={`parallel-result-${index}`}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            mb: 3,
          }}
        >
          <Result
            language={result.src_lang}
            title={result.src_title}
            segmentnr={result.src_segmentnr}
            link={result.src_link}
            text={{
              before: result.src_text.text_before,
              main: result.src_text.text_main,
              after: result.src_text.text_after,
            }}
          />
          <Result
            language={result.tgt_lang}
            title={result.tgt_title}
            segmentnr={result.tgt_segmentnr}
            link={result.tgt_link}
            text={{
              before: result.tgt_text.text_before,
              main: result.tgt_text.text_main,
              after: result.tgt_text.text_after,
            }}
          />
        </Grid>
      ))}
    </Box>
  )
}
