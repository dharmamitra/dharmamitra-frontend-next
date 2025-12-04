"use client"

import Drawer from "@mui/material/Drawer"

import {
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from "./constants"
import { useSidebarState } from "./SidebarContext"
import SidebarFooter from "./SidebarFooter"
import SidebarNav from "./SidebarNav"
import SidebarToggle from "./SidebarToggle"

import customTheming from "@/utils/theme/config"

export default function Sidebar() {
  const { isExpanded, toggle } = useSidebarState()
  const currentWidth = isExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: `width ${SIDEBAR_TRANSITION_DURATION}ms ease`,
        "& .MuiDrawer-paper": {
          position: "sticky",
          top: 0,
          height: "100vh",
          width: currentWidth,
          boxSizing: "border-box",
          transition: `width ${SIDEBAR_TRANSITION_DURATION}ms ease`,
          overflowX: "hidden",
          overflowY: "auto",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: customTheming.palette.soft,
        },
      }}
    >
      <SidebarToggle isExpanded={isExpanded} onToggle={toggle} />

      <SidebarNav isExpanded={isExpanded} />

      <SidebarFooter isRendered={isExpanded} />
    </Drawer>
  )
}
