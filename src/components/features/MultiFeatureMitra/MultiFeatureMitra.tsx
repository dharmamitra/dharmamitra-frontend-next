"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { useTranslations } from "next-intl"
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined"
import FormatShapesIcon from "@mui/icons-material/FormatShapes"
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined"
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import MitraOCR from "@/components/features/MitraOCR"
import MitraSearch from "@/components/features/MitraSearch"
import MitraTranslator from "@/components/features/MitraTranslator"
import { tabsStyles } from "@/components/styled-ssr-safe"
import { useViewTabParamWithLocalStorage } from "@/hooks/params"
import { ViewIndex } from "@/utils/api/global/validators"

import FeatureTabPanel from "./FeatureTabPanel"
import ScrollToTopButton from "./ScrollToTopButton"

export const minToolBoxHeight = "70vh"

export function a11yProps(index: number) {
  return {
    id: `feature-selector-tab-${index}`,
    "aria-controls": `feature-selector-tabpanel-${index}`,
  }
}

export default function MultiFeatureMitra() {
  const t = useTranslations()

  const [viewTabIndex, setViewTabIndex] = useViewTabParamWithLocalStorage()

  const [isSearchControlsOpen, setIsSearchControlsOpen] = React.useState(true)

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: ViewIndex) => {
      setViewTabIndex(newValue)
    },
    [setViewTabIndex],
  )

  const { ref: scrollMarkerRef, inView: scrollMarkerInView } = useInView({
    rootMargin: viewTabIndex === 0 ? "200px 0px" : "400px 0px",
    initialInView: true,
  })

  return (
    <>
      <Box>
        <Tabs
          value={viewTabIndex}
          aria-label="navigation tabs"
          centered
          onChange={handleTabChange}
          TabIndicatorProps={{
            sx: {
              display: "none",
            },
          }}
          sx={tabsStyles}
        >
          <Tab
            icon={<ScreenSearchDesktopOutlinedIcon />}
            iconPosition="start"
            label={t("search.search")}
            {...a11yProps(0)}
          />

          <Tab
            icon={<TranslateOutlinedIcon />}
            iconPosition="start"
            label={t("translation.translate")}
            {...a11yProps(1)}
          />
          <Tab
            icon={<DocumentScannerOutlinedIcon />}
            iconPosition="start"
            label="OCR"
            {...a11yProps(2)}
          />
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
        <div
          style={{ height: "1px", width: "1px" }}
          ref={scrollMarkerRef}
        ></div>

        <Box sx={{ height: "100%" }}>
          <FeatureTabPanel value={viewTabIndex} index={0}>
            <Box
              id="search-feature-wrapper"
              sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}
            >
              <MitraSearch
                isSearchControlsOpen={isSearchControlsOpen}
                setIsSearchControlsOpen={setIsSearchControlsOpen}
              />
            </Box>
          </FeatureTabPanel>

          <FeatureTabPanel value={viewTabIndex} index={1}>
            <Box id="translator-feature-wrapper" sx={{ mt: 6 }}>
              <MitraTranslator />
            </Box>
          </FeatureTabPanel>

          <FeatureTabPanel value={viewTabIndex} index={2}>
            <Box
              id="ocr-feature-wrapper"
              sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 } }}
            >
              <MitraOCR />
            </Box>
          </FeatureTabPanel>
        </Box>
      </Box>

      <ScrollToTopButton scrollMarkerInView={scrollMarkerInView} />
    </>
  )
}
