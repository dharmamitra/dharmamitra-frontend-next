import { Stack, type SxProps } from "@mui/material"

type TimelineDotProps = {
  sx?: SxProps
}

export default function TimelineDot({ sx }: TimelineDotProps) {
  return (
    <Stack
      className="timeline-dot"
      sx={{
        position: "absolute",
        "&::before, &::after, .inner-ring": {
          content: '""',
          position: "absolute",
          left: { xs: 60, md: 160 },
          transform: "translateX(-50%)",
          borderRadius: "50%",
        },
        // Main dot
        "&::before": {
          top: "12px",
          width: 12,
          height: 12,
          bgcolor: "grey.300",
          zIndex: 2,
          transform: "translate(-50%, 0)",
        },
        // Inner ring
        ".inner-ring": {
          top: "12px",
          width: 22,
          height: 22,
          border: "2px solid",
          borderColor: "grey.300",
          opacity: 0.7,
          transform: "translate(-50%, -5px)",
        },
        // Outer ring
        "&::after": {
          top: "12px",
          width: 32,
          height: 32,
          border: "2px solid",
          borderColor: "grey.300",
          opacity: 0.45,
          transform: "translate(-50%, -10px)",
        },
        ...sx,
      }}
    >
      <span className="inner-ring" />
    </Stack>
  )
}
