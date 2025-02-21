import { Stack } from "@mui/material"

import TimelineItem from "./TimelineItem"
import TimelineLine from "./TimelineLine"

type TimelineProps = {
  items: React.ComponentProps<typeof TimelineItem>[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <Stack
      spacing={6}
      sx={{
        position: "relative",
        maxWidth: "720px",
        mx: "auto",
      }}
    >
      <TimelineLine />
      {items.map((item) => (
        <TimelineItem key={item.slug ?? item.title} {...item} />
      ))}
    </Stack>
  )
}

export type { TimelineProps }
