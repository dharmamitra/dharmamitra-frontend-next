import React from "react"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

import { SourceLanguage } from "@/utils/api/search/types"
import { sourceLangColors } from "@/utils/constants"

import ResultItemTranslation from "./ResultItemTranslation"

type Result = {
  language: string
  segmentnr: string
  title: string
  link: string
  text: string
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
  // eslint-disable-next-line no-unused-vars
  summary,
  ...sizes
}: Result) {
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              bgcolor: "grey.200",
              p: 1,
              gap: 1,
              borderRadius: "4px",
            }}
          >
            <div>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                p="0"
                mb={1}
                color="grey.900"
                sx={{
                  display: "inline-block",
                  overflowWrap: "anywhere",
                  lineHeight: "1.25",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="grey.800"
                component="a"
                href={link}
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "block",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                {segmentnr}
              </Typography>
            </div>
            <Chip
              label={language}
              variant="filled"
              sx={{
                bgcolor: sourceLangColors[language as SourceLanguage],
                color: "white",
                fontWeight: 500,
              }}
              size="small"
            />
          </Box>

          <Typography sx={{ flexGrow: 1, overflowWrap: "anywhere" }}>
            {text}
          </Typography>
        </Box>

        <ResultItemTranslation translation={translation} />
      </Box>
    </Grid>
  )
}
