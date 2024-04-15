import React from "react"
import { Box, RadioGroup } from "@mui/material"
import Typography from "@mui/material/Typography"

const boxSx = {
  "@keyframes shimmer": {
    xs: {
      to: {
        backgroundPositionX: "0%",
      },
    },
  },
  height: "2rem",
  background: {
    xs: "linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%)",
    md: "linear-gradient(-45deg, #f6f6f6 40%, #fafafa 50%, #f6f6f6 60%)",
  },
  backgroundSize: { xs: "300%" },
  backgroundPositionX: { xs: "100%" },
  animation: { xs: "shimmer 1s infinite linear" },
  borderRadius: "0.5rem",
  p: 1,

  alignItems: "center",
}

export default function OptionsLoading() {
  return (
    <RadioGroup
      aria-label="loading"
      value="option"
      sx={{
        color: "transparent",
        gap: 3,
      }}
      row
    >
      {[1, 2].map((index) => (
        <Box
          key={`target-option-loading-${index}`}
          sx={{ display: "flex", ...boxSx }}
        >
          <Typography component="div" variant="body1">
            Option
          </Typography>
        </Box>
      ))}
      {[1, 2].map((index) => (
        <Box
          key={`target-option-loading-lg-${index}`}
          sx={{
            display: { xs: "none", sm: "flex", md: "none", lg: "flex" },
            ...boxSx,
          }}
        >
          <Typography component="div" variant="body1">
            Option
          </Typography>
        </Box>
      ))}
    </RadioGroup>
  )
}
