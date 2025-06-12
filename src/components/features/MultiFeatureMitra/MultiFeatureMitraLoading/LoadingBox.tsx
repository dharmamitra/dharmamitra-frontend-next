import React from "react"
import { Box } from "@mui/material"

import { minToolBoxHeight } from "../MultiFeatureMitra"

const LoadingBox = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: minToolBoxHeight,
        py: 11,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "3px dashed",
          borderColor: "divider",
          borderRadius: 3,
          p: 4,
          pb: 6,
          transition: "border-color 0.2s ease",
          maxWidth: "960px",
          mx: "auto",
          minHeight: "345px",
        }}
      ></Box>
    </Box>
  )
}

export default LoadingBox
