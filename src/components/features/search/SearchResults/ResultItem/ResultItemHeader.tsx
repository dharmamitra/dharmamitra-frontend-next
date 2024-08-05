import React from "react"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"

import { SourceLanguage } from "@/utils/api/search/types"
import { sourceLangColors } from "@/utils/constants"

type ResultItemHeaderProps = {
  language: string
  segmentnr: string
  title: string
  link: string
}

export default function ResultItemHeader({
  language,
  title,
  link,
  segmentnr,
}: ResultItemHeaderProps) {
  return (
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
          p="0"
          color="grey.800"
          sx={{
            overflowWrap: "anywhere",
            lineHeight: "1.25",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
          title={title.length > 115 ? title : undefined}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="grey.900"
          component="a"
          href={link}
          target="_blank"
          rel="noreferrer"
          sx={{
            fontSize: "0.875rem !important",
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
  )
}
