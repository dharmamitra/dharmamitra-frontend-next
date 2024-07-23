import React from "react"
import { useTranslations } from "next-intl"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import SummaryStream from "./SummaryStream"

type ResultItemSummaryProps = {
  isRendered?: boolean
  segmentnr: string
  query?: string
  summary?: string
}

export default function ResultItemSummary({
  isRendered,
  segmentnr,
  query,
  summary,
}: ResultItemSummaryProps) {
  const t = useTranslations("search")
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (!isRendered || !summary || !query) return null

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="text"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={"summary-content" + segmentnr}
          sx={{
            color: "grey.600",
            p: 0,
            "&:hover": { color: "grey.800", bgcolor: "transparent" },
          }}
          endIcon={
            isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          {t("summary")}
        </Button>
      </Box>

      <Box id={"summary-content" + segmentnr} py={1}>
        <SummaryStream isExpanded={isExpanded} request={{ query, summary }} />
      </Box>
    </Box>
  )
}
