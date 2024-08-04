import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import { SxProps } from "@mui/material/styles"

import { SearchApiTypes } from "@/api"

import ParallelExplanation from "./ParallelExplanation"
import PrimaryExplanation from "./PrimaryExplanation"

type ExplanationFrameProps = {
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
  isParallel?: boolean
  sx?: SxProps
}

function ExplanationFrame({
  children,
  sx,
  setIsExpanded,
}: ExplanationFrameProps) {
  const t = useTranslations("search")

  return (
    <Box
      component="details"
      mb={2}
      sx={sx}
      onToggle={() => setIsExpanded((prev) => !prev)}
    >
      <Box
        component="summary"
        sx={{
          color: "grey.600",
          cursor: "pointer",
          textTransform: "uppercase",
          p: 0,
          mb: 0.75,
          "&:hover": { color: "grey.800", bgcolor: "transparent" },
        }}
      >
        {t("explanation")}
      </Box>
      {children}
    </Box>
  )
}

export type ResultItemExplanationProps = {
  primaryRequest?: SearchApiTypes.RequestBody<"/explanation/">
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
}

export default function ResultItemExplanation({
  primaryRequest,
  parallelRequest,
}: ResultItemExplanationProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (primaryRequest) {
    return (
      <ExplanationFrame setIsExpanded={setIsExpanded} sx={{ pb: 1 }}>
        <PrimaryExplanation isExpanded={isExpanded} request={primaryRequest} />
      </ExplanationFrame>
    )
  }

  if (parallelRequest) {
    return (
      <ExplanationFrame setIsExpanded={setIsExpanded}>
        <ParallelExplanation
          isExpanded={isExpanded}
          request={parallelRequest}
        />
      </ExplanationFrame>
    )
  }

  return null
}
