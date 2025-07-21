import React from "react"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"
import { SxProps } from "@mui/material/styles"

type ResultItemExplanationProps = {
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => void
  children?: React.ReactNode
  isParallel?: boolean
  sx?: SxProps
}

export default function ResultItemExplanationFrame({
  children,
  sx,
  setIsExpanded,
  handleSubmit,
}: ResultItemExplanationProps) {
  const t = useTranslations("search")
  const hasExpanded = React.useRef(false)

  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => !prev)
    if (hasExpanded.current) return
    handleSubmit()
    hasExpanded.current = true
  }, [setIsExpanded, handleSubmit, hasExpanded])

  return (
    <Box component="details" mb={2} sx={sx} onToggle={handleExpand}>
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
