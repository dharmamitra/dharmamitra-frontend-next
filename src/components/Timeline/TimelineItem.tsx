import { Stack, Typography } from "@mui/material"

import TimelineDate from "./TimelineDate"
import TimelineDot from "./TimelineDot"
import TimelineTitle from "./TimelineTitle"

type TimelineItemProps = {
  title: string
  date: string
  description: string
  slug?: string
  content?: React.ReactNode | null
  locale: string
}

export default function TimelineItem({
  title,
  date,
  description,
  slug,
  content,
  locale,
}: TimelineItemProps) {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        position: "relative",
        pt: 0.5,
      }}
    >
      <TimelineDot />
      <TimelineDate date={date} locale={locale} />

      {/* Content */}
      <Stack
        spacing={1}
        sx={{
          flex: 1,
          maxWidth: "calc(100% - 100px)",
          pl: { xs: 4, md: 6 },
        }}
      >
        <TimelineTitle title={title} slug={slug} content={content} />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Stack>
  )
}
