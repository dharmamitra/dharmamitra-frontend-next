import React from "react"
import { Divider } from "@mui/material"
import Box from "@mui/material/Box"

import EnRobotTranslation from "@/components/EnRobotTranslation"
import { cssRenderProps } from "@/components/features/search/SearchResults/ParallelQueryResults/ShowEngishSwitch"

type ResultItemTranslationProps = {
  translation?: string
  isRendered: boolean
}

export default function ResultItemTranslation({
  translation,
  isRendered,
}: ResultItemTranslationProps) {
  if (!isRendered || !translation) return null

  return (
    <Box
      className={cssRenderProps.target}
      style={{
        display: `var(${cssRenderProps.displayVar})`,
      }}
      pb={2}
    >
      <Divider />
      <EnRobotTranslation translation={translation} />
    </Box>
  )
}
