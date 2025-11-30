import React from "react"
import Box from "@mui/material/Box"

import { View } from "@/utils/api/global/types"

interface TabPanelProps {
  children: React.ReactNode
  view: View
  currentView: View
}

export default function FeatureTabPanel(props: TabPanelProps) {
  const { children, currentView, view, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={currentView !== view}
      id={`feature-selector-tabpanel-${view}`}
      aria-labelledby={`feature-selector-tab-${view}`}
      style={{ height: "100%" }}
      {...other}
    >
      {currentView === view ? (
        <Box sx={{ width: "100%", height: "100%", py: 3 }}>{children}</Box>
      ) : null}
    </div>
  )
}
