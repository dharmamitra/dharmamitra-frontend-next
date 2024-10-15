import React from "react"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"

export type ResultsListCopyType = "full" | "refs"

export default function ResultsListCopyIcon({
  type,
}: {
  type: ResultsListCopyType
}) {
  if (type === "full") {
    return <FeedOutlinedIcon color="action" fontSize="small" />
  }

  return <SummarizeOutlinedIcon color="action" fontSize="small" />
}
