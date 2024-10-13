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

      <LayoutFrame.PanelBox type="text" placement="start">
        {inputBlock}
      </LayoutFrame.PanelBox>

      <LayoutFrame.PanelBox type="text" placement="end">
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
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto 1fr",
        width: "100%",
        height: "100%",
        minHeight: "58dvh",
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
        ...(type === "text" && {
          ...(placement === "start"
            ? {
                // borderTopLeftRadius: customTheming.shape.inputRadius,
                borderRight: "1px solid",
              }
            : {
                backgroundColor: "grey.50",
                borderBottomLeftRadius: {
                  xs: customTheming.shape.inputRadius,
                  md: 0,
                },
                borderBottomRightRadius: customTheming.shape.inputRadius,
              }),
        }),
        ...(type === "controles" && {
          bgcolor: "grey.200",
          borderBottom: "1px solid",
          ...(placement === "start"
            ? {
                borderTopLeftRadius: customTheming.shape.inputRadius,
                borderRight: "1px solid",
              }
            : {
                borderTopRightRadius: customTheming.shape.inputRadius,
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
