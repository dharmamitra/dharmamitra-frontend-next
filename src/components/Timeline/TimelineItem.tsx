import { Stack, Typography } from "@mui/material"

import { NewsPost } from "@/content/schemas"
import { formatDate } from "@/utils"

import TimelineDot from "./TimelineDot"
import TimelineTitle from "./TimelineTitle"

export default function TimelineItem({
  title,
  date,
  type,
  location,
  slug,
  content,
  locale,
}: NewsPost) {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        position: "relative",
      }}
    >
      <TimelineDot />

      <Stack
        spacing={1}
        sx={{
          flex: 1,
          maxWidth: "calc(100% - 100px)",
          pl: 2,
        }}
      >
        <TimelineTitle title={title} slug={slug} content={content} />
        <Typography variant="body2" color="text.secondary">
          {formatDate({ date, locale })}
          {`, ${type}`}
          {location && `, ${location}`}.
        </Typography>
      </Stack>
    </Stack>
  )
}
