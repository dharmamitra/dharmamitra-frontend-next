"use client"

import { ReactNode } from "react"
import Box from "@mui/material/Box"

import ExtensionBanner from "./AppBar/ExtensionBanner"
import AppBar from "./AppBar"
import Sidebar, {
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
  SidebarProvider,
  useSidebarState,
} from "./Sidebar"

type Props = {
  children: ReactNode
  showExtensionBanner?: boolean
  initialSidebarExpanded?: boolean
}

export default function AppLayout({
  children,
  showExtensionBanner = true,
  initialSidebarExpanded = true,
}: Props) {
  return (
    <SidebarProvider
      initialExpanded={initialSidebarExpanded}
      initialBannerVisible={showExtensionBanner}
    >
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  )
}

function AppLayoutContent({ children }: { children: ReactNode }) {
  const { isExpanded, isBannerVisible, dismissBanner } = useSidebarState()
  const sidebarWidth = isExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: `width ${SIDEBAR_TRANSITION_DURATION}ms ease`,
        }}
      >
        <Box>
          <ExtensionBanner isRendered={isBannerVisible} onDismiss={dismissBanner} />
          <AppBar />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
