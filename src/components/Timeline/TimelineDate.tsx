import { Stack, Typography } from "@mui/material"

import { formatDate } from "@/utils"

type TimelineDateProps = {
  date: string
  locale: string
}

export default function TimelineDate({ date, locale }: TimelineDateProps) {
  return (
    <Stack
      sx={{
        width: { xs: 32, md: 100 },
        alignItems: "flex-end",
        pr: { md: 2 },
        mt: { xs: "-1.75rem !important", md: "0.35rem !important" },
        display: "block",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          whiteSpace: "nowrap",
          lineHeight: 1.5,
        }}
      >
        {formatDate({ date, locale })}
      </Typography>
    </Stack>
  )
}
