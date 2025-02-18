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
          transform: "translateX(-50%)",
          borderRadius: "50%",
        },
        // Main dot
        "&::before": {
          top: "0.5rem",
          width: 12,
          height: 12,
          bgcolor: "grey.300",
          zIndex: 2,
          transform: "translate(-50%, 0)",
        },
        // Inner ring
        ".inner-ring": {
          top: "0.5rem",
          width: 22,
          height: 22,
          border: "2px solid",
          borderColor: "grey.300",
          opacity: 0.7,
          transform: "translate(-50%, -5px)",
        },
        // Outer ring
        "&::after": {
          top: "0.5rem",
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
