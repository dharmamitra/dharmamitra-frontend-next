import React from "react"
import Typography from "@mui/material/Typography"

import LoadingDots from "@/components/LoadingDots"

type SummaryStreamProps = {
  stream?: boolean
}

export default function SummaryStream({ stream }: SummaryStreamProps) {
  if (!stream)
    return (
      <Typography variant="body2" color="grey.900" py={1}>
        <LoadingDots />
      </Typography>
    )

  return (
    <Typography variant="body2" color="grey.900" py={1}>
      {`[streamed summary]`}
    </Typography>
  )
}
