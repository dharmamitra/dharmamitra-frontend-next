import { Stack } from "@mui/material"

export default function TimelineLine() {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: { xs: 60, md: 160 },
        width: 2,
        bgcolor: "grey.300",
        transform: "translateY(5%)",
      }}
    />
  )
}
