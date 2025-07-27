"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import { SvgIconProps } from "@mui/material"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import useMediaQuery from "@mui/material/useMediaQuery"

import MitraOCR from "@/components/features/MitraOCR"
import MitraSearch from "@/components/features/MitraSearch"
import MitraTranslator from "@/components/features/MitraTranslator"
import { tabsStyles } from "@/components/styled-ssr-safe"
import { useViewParamWithLocalStorage } from "@/hooks/params/useViewParamWithLocalStorage"
import { views } from "@/utils/api/global/params"
import { View } from "@/utils/api/global/types"
import { localStorageKeys } from "@/utils/constants"

import FeatureTabPanel from "./FeatureTabPanel"
import ScrollToTopButton from "./ScrollToTopButton"

export const minToolBoxHeight = "70vh"

export function a11yProps(view: View) {
  return {
    id: `feature-selector-tab-${view}`,
    "aria-controls": `feature-selector-tabpanel-${view}`,
  }
}

const TabIcons: Record<View, React.ComponentType<SvgIconProps>> = {
  search: ScreenSearchDesktopOutlinedIcon,
  translation: TranslateOutlinedIcon,
  ocr: DocumentScannerOutlinedIcon,
}

export default function MultiFeatureMitra() {
  const t = useTranslations()

  const isXsScreen = useMediaQuery("(max-width:480px)")

  const [currentView, setView] = useViewParamWithLocalStorage(views)

  const [isSearchControlsOpen, setIsSearchControlsOpen] = React.useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(localStorageKeys.showSearchControls) === "true"
  })

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newView: View) => {
      setView(newView)
    },
    [setView],
  )

  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: currentView === "search" ? "200px 0px" : "400px 0px",
    initialInView: true,
  })

  return (
    <>
      <Box>
        <Tabs
          value={currentView}
          aria-label="navigation tabs"
          centered
          onChange={handleTabChange}
          slotProps={{
            indicator: {
              sx: {
                display: "none",
              },
            },
          }}
          sx={tabsStyles}
        >
          {views.map((view) => {
            const Icon = TabIcons[view]
            return (
              <Tab
                key={view}
                value={view}
                icon={isXsScreen ? undefined : <Icon />}
                iconPosition="start"
                label={t(`generic.${view}`)}
                {...a11yProps(view)}
              />
            )
          })}
        </Tabs>
      </Box>

      <Box
        id="features-box"
        sx={{
          width: "100%",
          minHeight: minToolBoxHeight,
          py: { md: 2 },
          position: "relative",
        }}
      >
        <div style={{ height: "1px", width: "1px" }} ref={scrollMarkerRef}></div>

        <Box sx={{ height: "100%" }}>
          <FeatureTabPanel currentView={currentView} view="translation">
            <Box id="translator-feature-wrapper">
              <MitraTranslator />
            </Box>
          </FeatureTabPanel>

          <FeatureTabPanel currentView={currentView} view="search">
            <Box id="search-feature-wrapper" sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}>
              <MitraSearch
                isSearchControlsOpen={isSearchControlsOpen}
                setIsSearchControlsOpen={setIsSearchControlsOpen}
              />
            </Box>
          </FeatureTabPanel>

          <FeatureTabPanel currentView={currentView} view="ocr">
            <Box id="ocr-feature-wrapper" sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}>
              <MitraOCR />
            </Box>
          </FeatureTabPanel>
        </Box>
      </Box>

      <ScrollToTopButton scrollMarkerInView={scrollMarkerInView} />
    </>
  )
}
