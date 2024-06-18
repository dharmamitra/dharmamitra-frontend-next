import React from "react"
import { Box } from "@mui/material"
import styled from "@mui/material/styles/styled"

const BorderedBox = styled(Box)(({ theme }) => ({
  "@keyframes boarderTrace": {
    "0%": {
      borderImage: `linear-gradient(to right, ${theme.palette.grey[200]} 0%, ${theme.palette.divider} 100%) 1`,
    },
    "25%": {
      borderImage: `linear-gradient(to bottom, ${theme.palette.grey[200]} 0%, ${theme.palette.divider} 100%) 1`,
    },
    "50%": {
      borderImage: `linear-gradient(to left, ${theme.palette.grey[200]} 0%, ${theme.palette.divider} 100%) 1`,
    },
    "75%": {
      borderImage: `linear-gradient(to top, ${theme.palette.grey[200]} 0%, ${theme.palette.divider} 100%) 1`,
    },
    "100%": {
      borderImage: `linear-gradient(to right, ${theme.palette.grey[200]} 0%, ${theme.palette.divider} 100%) 1`,
    },
  },
  width: "100%",
  maxWidth: "960px",
  height: "4rem",
  border: `1px solid`,
  borderColor: theme.palette.secondary.main,
  borderRadius: "12px",
  animation: "boarderTrace 1s linear infinite",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const LoadingBox = () => {
  return <BorderedBox />
}

export default LoadingBox
