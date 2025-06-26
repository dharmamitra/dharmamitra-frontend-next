import { Box, styled } from "@mui/material"

export const InputOutlineBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[400]}`,
  minHeight: "4rem",
  padding: theme.spacing(1),
}))

export const MultiSelectionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}))

const unforwardedSelectionChipsBoxProps = ["isExpanded", "maxRows"]
export const SelectionChipsBox = styled(Box, {
  shouldForwardProp: (prop) => !unforwardedSelectionChipsBoxProps.includes(String(prop)),
})<{ isExpanded: boolean; maxRows: number }>(({ theme, isExpanded, maxRows }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  maxHeight: isExpanded ? "none" : `calc(${maxRows} * 2.3rem)`,
  overflow: "clip",
}))

export const SelectionHeadBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})
