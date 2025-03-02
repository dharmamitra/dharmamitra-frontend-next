import React from "react"
import { Box, SxProps } from "@mui/material"

import customTheming from "@/utils/theme/config"

type TranslatorLayoutProps = {
  inputControls: React.ReactNode
  outputContoles: React.ReactNode
  inputBlock: React.ReactNode | null
  outputBlock: React.ReactNode | null
}

function TranslatorLayout({
  inputControls,
  outputContoles,
  inputBlock,
  outputBlock,
}: TranslatorLayoutProps) {
  return (
    <LayoutFrame>
      <LayoutFrame.PanelBox type="controles" placement="start">
        {inputControls}
      </LayoutFrame.PanelBox>

      <LayoutFrame.PanelBox type="controles" placement="end">
        {outputContoles}
      </LayoutFrame.PanelBox>

      <LayoutFrame.PanelBox
        type="text"
        placement="start"
        sx={{
          py: 1,
        }}
      >
        {inputBlock}
      </LayoutFrame.PanelBox>

      <LayoutFrame.PanelBox
        type="text"
        placement="end"
        sx={{
          py: 1,
        }}
      >
        {outputBlock}
      </LayoutFrame.PanelBox>
    </LayoutFrame>
  )
}

export default TranslatorLayout

type LayoutFrameProps = {
  children: React.ReactNode
}

export function LayoutFrame({ children }: LayoutFrameProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "min-content min-content auto auto",
        "@media (min-width: 760px)": {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto 1fr",
        },
        height: "min-content",
        minHeight: { xs: "26rem", md: "32rem" },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: customTheming.shape.inputRadius,
      }}
    >
      {children}
    </Box>
  )
}

LayoutFrame.PanelBox = PanelBox

type PanelBoxProps = {
  type: "controles" | "text"
  children: React.ReactNode
  placement: "start" | "end"
  sx?: SxProps
}

function PanelBox({ type, children, placement, sx }: PanelBoxProps) {
  return (
    <Box
      sx={{
        display: "grid",
        px: 1.5,
        ...(type === "controles" && {
          bgcolor: "grey.200",
          borderBottom: "1px solid",
          ...(placement === "start"
            ? {
                borderTopLeftRadius: customTheming.shape.inputRadius,
                borderTopRightRadius: customTheming.shape.inputRadius,
                "@media (min-width: 760px)": {
                  borderTopRightRadius: 0,
                },
                borderRight: "1px solid",
              }
            : {
                borderTopRightRadius: 0,
                "@media (min-width: 760px)": {
                  borderTopRightRadius: customTheming.shape.inputRadius,
                },
              }),
        }),
        ...(type === "text" && {
          ...(placement === "start"
            ? {
                borderRight: "none",
                "@media (min-width: 760px)": {
                  borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                },
              }
            : {
                backgroundColor: "grey.50",
                borderBottomLeftRadius: customTheming.shape.inputRadius,
                "@media (min-width: 760px)": {
                  borderBottomLeftRadius: 0,
                },
                borderBottomRightRadius: customTheming.shape.inputRadius,
              }),
        }),
        borderColor: "divider",
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
