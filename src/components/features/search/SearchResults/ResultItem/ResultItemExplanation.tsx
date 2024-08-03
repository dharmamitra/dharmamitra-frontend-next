import React from "react"
import { useTranslations } from "next-intl"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { SearchApiTypes } from "@/api"

import ParallelExplanation from "./ParallelExplanation"
import PrimaryExplanation from "./PrimaryExplanation"

type ExplanationFrameProps = {
  segmentnr: string
  expandedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  children?: React.ReactNode
  isParallel?: boolean
}

function ExplanationFrame({
  segmentnr,
  expandedState,
  children,
  isParallel,
}: ExplanationFrameProps) {
  const t = useTranslations("search")
  const [isExpanded, setIsExpanded] = expandedState

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        pb: isParallel ? 0 : 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="text"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={"explanation-content" + segmentnr}
          sx={{
            color: "grey.600",
            p: 0,
            "&:hover": { color: "grey.800", bgcolor: "transparent" },
          }}
          endIcon={
            isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
        >
          {t("explanation")}
        </Button>
      </Box>

      <Box id={"explanation-content" + segmentnr} py={1}>
        {children}
      </Box>
    </Box>
  )
}

export type ResultItemExplanationProps = {
  primaryRequest?: SearchApiTypes.RequestBody<"/explanation/">
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
  segmentnr: string
}

export default function ResultItemExplanation({
  primaryRequest,
  parallelRequest,
  segmentnr,
}: ResultItemExplanationProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  if (primaryRequest) {
    return (
      <ExplanationFrame
        expandedState={[isExpanded, setIsExpanded]}
        segmentnr={segmentnr}
      >
        <PrimaryExplanation isExpanded={isExpanded} request={primaryRequest} />
      </ExplanationFrame>
    )
  }

  if (parallelRequest) {
    return (
      <ExplanationFrame
        expandedState={[isExpanded, setIsExpanded]}
        segmentnr={segmentnr}
        isParallel
      >
        <ParallelExplanation
          isExpanded={isExpanded}
          request={parallelRequest}
        />
      </ExplanationFrame>
    )
  }

  return null
}
